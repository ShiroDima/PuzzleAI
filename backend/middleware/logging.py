from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from typing import Callable
from loguru import logger
import time


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable):
        req_start_time = time.time()

        try:
            response: Response = await call_next(request)

            logger.info(
                {
                    "Client": request.client.host,
                    "Request": f"{request.method} {request.url}",
                    "Process Time": f"{time.time() - req_start_time:.2f} seconds",
                }
            )

            return response
        except Exception as error:
            logger.exception(
                {
                    "Client": request.client.host,
                    "Event": "Error",
                    "Type": error.__class__.__name__,
                }
            )

            return JSONResponse(
                content={"detail": "Internal Server Error"}, status_code=500
            )
