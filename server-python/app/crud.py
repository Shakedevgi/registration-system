from app.database import users_collection

async def get_user_by_email(email: str):
    """Retrieve a user document by email."""
    user = await users_collection.find_one({"email": email})
    return user

async def create_user(user_data: dict) -> dict:
    """Insert a new user into the database."""
    result = await users_collection.insert_one(user_data)
    # Return the inserted data (MongoDB adds _id to user_data in place)
    return user_data