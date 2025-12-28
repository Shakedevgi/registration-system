import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# Load Config
MONGO_URL = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB", "registration_system")
COLLECTION_NAME = os.getenv("MONGODB_USERS_COLLECTION", "users")

# Create Client
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]
users_collection = db[COLLECTION_NAME]

async def create_indexes():
    """Ensures email is unique at the database level"""
    await users_collection.create_index("email", unique=True)