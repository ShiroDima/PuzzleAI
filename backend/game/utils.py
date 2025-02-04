from backend.storage import GameData

from random import choice
from typing import Self
import math


async def check_db_for_game(mode: str) -> GameData | None:
    try:
        data = await GameData.find(GameData.category == mode).to_list()
        return choice(data)
    except IndexError:
        return None


class SampleScheduler:
    _instance: "SampleScheduler" = None

    def __init__(self, max_entries: int = 10_000, decay_factor: float = 1.0):
        self.max_entries: int = max_entries
        self.decay_factor: int = decay_factor

    def __new__(cls: "SampleScheduler") -> Self:
        if cls._instance is None:
            cls._instance = super().__new__(cls)

        return cls._instance

    def calculate_ai_prob(self, num_db_entries: int) -> float:
        if num_db_entries <= 0:
            return 1.0
        if num_db_entries >= self.max_entries:
            return 0.0

        # Exponential decay formula: p = e^(-decay_factor * x/max_entries)
        x = num_db_entries / self.max_entries
        probability = math.exp(-self.decay_factor * x)

        return max(0.0, min(1.0, probability))

    async def should_use_ai(self, mode: str) -> bool:
        """
        Determine if AI should be used based on current DB entries.

        Args:
            mode: Difficulty

        Returns:
            Boolean indicating if AI should be used
        """
        import random

        db_entries = len(await GameData.find(GameData.category == mode).to_list())

        probability = self.calculate_ai_prob(db_entries)
        return random.random() < probability
