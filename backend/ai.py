from typing import Any

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser, StrOutputParser
from langchain_core.runnables import RunnableSerializable

from backend.config import config
from backend.schema import Puzzle, FillInQuestion, Verbs

llm = ChatOpenAI(
    model=config.CHAT_MODEL_ID, api_key=config.OPENAI_API_KEY, temperature=0
)

base_fiq_prompt_v1 = """
                You are a very good and efficient games master.

                Your task is to generate fill in the gap type questions, and also a word search puzzle. The word answers of the word search puzzle should be the answers to the questions.

                Each question must be about choosing the right verb for a sentence.

                {format_instructions}
                """

base_puzzle_prompt_v1 = """
                    You are a very good and efficient games master.

                    Your task is to generate an 8 by 8 word search puzzle. The puzzle must contain the following words:
                    {search_words}.

                    When generating each word, vary how they are arranged: vertically, horizontally, diagonally. To create a well balanced puzzle and not have all the words be in one direction.

                    {format_instructions}
                    """


base_fiq_prompt_v2 = """
                    You are a very good and efficient games master.
                    
                    Your task is to generate fill in the gap type questions. The question should be about choosing the right verb to complete a question.

                    You will be provided with 10 words, and you're to create questions around those ones. One question per word.
                    The words: {words}

                    NOTE: the words MUST be part of the options and MUST be the correct option for that question

                    YOU MUST GENERATE 10 AND ONLY 10 QUESTIONS. NOTHING MORE, NOTHING LESS

                    {format_instructions}
                    """

base_initial_prompt = """
                    You are a good teacher.

                    Your task is to generate 10 verbs that are not more than 10 letters long.
                    The verbs should be something that someone in {class} class should know.


                    """


def get_v1_chains() -> dict[str, RunnableSerializable[dict, Any]]:
    fiq_parser = PydanticOutputParser(pydantic_object=FillInQuestion)
    fiq_prompt = ChatPromptTemplate.from_template(base_fiq_prompt_v1).partial(
        format_instructions=fiq_parser.get_format_instructions()
    )

    puz_parser = PydanticOutputParser(pydantic_object=Puzzle)
    puz_prompt = ChatPromptTemplate.from_template(base_puzzle_prompt_v1).partial(
        format_instructions=puz_parser.get_format_instructions()
    )

    return {
        "generate_fiq": fiq_prompt | llm | fiq_parser,
        "generate_puzzle": puz_prompt | llm | puz_parser,
    }


def get_fiq_chain() -> dict[str, RunnableSerializable[dict, Any]]:
    fiq_parser = PydanticOutputParser(pydantic_object=FillInQuestion)
    fiq_prompt = ChatPromptTemplate.from_template(base_fiq_prompt_v2).partial(
        format_instructions=fiq_parser.get_format_instructions()
    )

    init_prompt = ChatPromptTemplate.from_template(base_initial_prompt)

    return {
        "generate_fiq": fiq_prompt | llm | fiq_parser,
        "generate_verbs": init_prompt | llm.with_structured_output(Verbs),
    }
