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
    """
    Start and end colors for a two color gradient.
    The value is in tailwindCSS format E.G cyan-500, blue-400

    Make sure to pick colors that make beautiful gradients
    """

    start: str = Field(
        description="Starting part of the color gradient. The value is in tailwindCSS format E.G cyan-500, blue-400, and should be a color matching the card heading."
    )
    end: str = Field(
        description="Ending part of the color gradient. The value is in tailwindCSS format E.G cyan-500, blue-400, and should be a color matching the card heading."
    )


class CardInfo(BaseModel):
    """
    Questions should be 2 in number E.G Question 1, Question 2
    Colors should be in tailwindCSS format E.G cyan-500, blue-400.
    Title must be one of the following: Red, Blue, Green, Red, Yellow
    """

    heading: str = Field(
        description="Title. Must be one of the following: Red, Blue, Green, Red, Yellow"
    )
    questions: list[Question] = Field(
        description="List of 2 questions generated for a user to attempt. This MUST contain 2 and only 2 questions. Nothing more, nothing less"
    )
    color: Color = Field(
        description="""
                    Color gradient based on the heading color that is assigned. Must be in tailwind CSS format for colors. E.G cyan-500, blue-400.

                    DO NOT GIVE HEXADECIMAL VALUES FOR THE COLOR.

                    The color passed here MUST depend on the color that is chosen for the title field. Do NOT pass a color here if it does not match the title.
                    E.G title = 'Blue' color = 'blue-500'

                    Make sure to pick colors that make beautiful gradients
                    """
    )


class FillInQuestion(BaseModel):
    """
    A list of 5 elements because each element contains 2 questions
    """

    card_infos: list[CardInfo] = Field(
        description="List of 5 elements. The number of each question must continue from where the last one stopped."
    )


class Verbs(BaseModel):
    verbs: list[str] = Field(description="List of 10 verbs that will be generated")


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
