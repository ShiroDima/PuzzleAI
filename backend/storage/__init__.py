from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from backend.config import config
from backend.storage.models import GameData


async def init():
    print("Initiating client")
    client = AsyncIOMotorClient(config.MONGO_URL)

    await init_beanie(
        database=client.db_name, document_models=["backend.storage.models.GameData"]
    )
