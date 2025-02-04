from beanie import Document
from pydantic import BaseModel
from backend.schema import Game


class GameData(Document):
    game: Game
    category: str
