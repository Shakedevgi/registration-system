from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(
    title="Registration System API",
    description="Backend service for user registration",
    version="1.0.0"
)

# CORS Configuration
# Allows the React frontend (running on localhost:3000) to communicate with this backend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Registration System API is running"}