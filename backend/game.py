from backend.ai import get_chains
from backend.schema import FillInQuestion, Puzzle, Game


async def new_game():
    agents = get_chains()

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
