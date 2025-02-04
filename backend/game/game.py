from backend.ai import get_v1_chains, get_fiq_chain
from backend.schema import FillInQuestion, Puzzle, Game, Verbs
from backend.storage import GameData
from backend.game.utils import check_db_for_game, SampleScheduler
from .generate_grid import PuzzleGrid

from loguru import logger
from langchain_core.runnables import (
    RunnableLambda,
    RunnableSequence,
    RunnableParallel,
    RunnablePassthrough,
)

from random import choice, choices


async def new_game():
    agents = get_v1_chains()

    fill_in_questions: FillInQuestion = await agents["generate_fiq"].ainvoke({})

    print(
        [
            list(question.answer.model_dump(exclude_none=True).values())[-1]
            for infos in fill_in_questions.card_infos
            for question in infos.questions
        ]
    )

    puzzle: Puzzle = await agents["generate_puzzle"].ainvoke(
        {
            "search_words": [
                list(question.answer.model_dump(exclude_none=True).values())[-1]
                for infos in fill_in_questions.card_infos
                for question in infos.questions
            ]
        }
    )

    return Game(card_info=fill_in_questions, puzzle_info=puzzle)


async def gen_new_game(mode: str = "kindergaten") -> Game:

    if not await SampleScheduler(decay_factor=1e-2).should_use_ai(mode):
        game_data = await check_db_for_game(mode)

        if game_data:
            return game_data.game

    agents = get_fiq_chain()

    async def get_verbs(mode: str) -> list[str]:
        return (await agents["generate_verbs"].ainvoke({"class": mode})).verbs

    try:
        puzzle_grid = PuzzleGrid(grid_size=(10, 10), max_word_length=10)

        agent = RunnableLambda(get_verbs) | {
            "words": RunnablePassthrough(),
            "fiq": agents["generate_fiq"],
            "puzzle": RunnableLambda(puzzle_grid.place_words),
        }

        result = await agent.ainvoke(mode)

        # return Game(card_info=fill_in_questions, puzzle_info=puzzle)
        game = Game(card_info=result["fiq"], puzzle_info=result["puzzle"])

        game_data = GameData(game=game, category=mode)

        await game_data.insert()

        return game
    except AssertionError as error:
        logger.exception(
            {
                "Error": error.__class__.__name__,
                "message": "Search Words longer than 10 letters.",
            }
        )
