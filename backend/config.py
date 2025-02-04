from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    model_config = SettingsConfigDict(env_file="./.env")
    CHAT_MODEL_ID: str
    OPENAI_API_KEY: str
    MONGO_DB_USER: str = "root"
    MONGO_DB_PORT: int = 27017
    MONGO_DB_PASS: str = "shiro"
    MONGO_DB_HOST: str = "localhost"

    @property
    def MONGO_URL(self):
        return f"mongodb://{self.MONGO_DB_USER}:{self.MONGO_DB_PASS}@{self.MONGO_DB_HOST}:{self.MONGO_DB_PORT}"


config = Config()
