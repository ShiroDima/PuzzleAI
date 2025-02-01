from typing import Optional

from pydantic import BaseModel, Field


class Options(BaseModel):
    A: Optional[str] = Field(
        description="First option for a question. Could also be populated as the answer to the question. When populating as an answer, leave as None if this is not going to be the answer",
        default=None,
    )
    B: Optional[str] = Field(
        description="Second option for a question. Could also be populated as the answer to the question. When populating as an answer, leave as None if this is not going to be the answer",
        default=None,
    )
    C: Optional[str] = Field(
        description="Third option for a question. Could also be populated as the answer to the question. When populating as an answer, leave as None if this is not going to be the answer",
        default=None,
    )
    D: Optional[str] = Field(
        description="Fourth option for a question. Could also be populated as the answer to the question. When populating as an answer, leave as None if this is not going to be the answer",
        default=None,
    )


class Question(BaseModel):
    num: str = Field(
        description="What number this question is in the list of questions"
    )
    question: str = Field(
        description="""
                    The question. Each question is a fill in the gap type question, which each part before and after the gap to be filled is separated by an `____`.

                    E.G: We ____ to wear sunscreen at the beach.
                    """
    )
    options: Options
    answer: Options


class Color(BaseModel):
    start: str = Field(
        description="Starting part of the color gradient. THe value is in hexadecimal, and should be a color matching the card heading."
    )
    end: str = Field(
        description="Ending part of the color gradient. THe value is in hexadecimal, and should be a color matching the card heading."
    )


class CardInfo(BaseModel):
    heading: str = Field(description="A Title. It must be the name of a color.")
    questions: list[Question] = Field(
        description="List of 2 questions generated for a user to attempt."
    )
    color: Color = Field(
        description="Color gradient based on the heading color that is assigned. Must be in hexadecimal value"
    )


class FillInQuestion(BaseModel):
    card_infos: list[CardInfo] = Field(
        description="List of 10 elements. The number of each question must continue from where the last one stopped."
    )


class Puzzle(BaseModel):
    grid: list[list[str]] = Field(
        description="""
                    The 2-D list that represents the puzzle grid. The words that make up the grid are to be varied across the horizontal, vertical, and diagonal directions.
                    Therefore, some words should be horizontal, some vertical, some diagonally arranged. This sis create a well balanced puzzle.
                    """
    )


class Game(BaseModel):
    card_info: FillInQuestion
    puzzle_info: Puzzle
