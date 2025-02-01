from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    model_config = SettingsConfigDict(env_file="./.env")
    CHAT_MODEL_ID: str
    OPENAI_API_KEY: str


config = Config()
