from fastapi import FastAPI
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.middleware import LoggingMiddleware
from backend.schema import Game, FillInQuestion, Puzzle
from backend.game import new_game


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(LoggingMiddleware)


@app.get("/")
def index() -> RedirectResponse:
    return RedirectResponse("/docs")


@app.get("/game")
async def get_new_game() -> Game:
    response = await new_game()

    # print(response)

    return response
