from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routes import router
from app.database import create_indexes
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure DB indexes exist
    await create_indexes()
    yield
    # Shutdown: Clean up if necessary (Motor handles connection pooling automatically)

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # TEMP: allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)