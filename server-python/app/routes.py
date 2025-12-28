from fastapi import APIRouter, HTTPException, status
from app.schemas import RegistrationRequest, RegistrationResponse

router = APIRouter()

# In-memory storage placeholder (Simulating a database)
fake_user_db = []

@router.post("/register", response_model=RegistrationResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: RegistrationRequest):
    """
    Endpoint to register a new user.
    
    - Validates input using Pydantic schema
    - Checks for existing user (mock logic)
    - Returns success message
    """
    
    # 1. Check if email already exists (Mock Logic)
    # In Phase 4, this will be replaced with a real DB query
    for existing_user in fake_user_db:
        if existing_user["email"] == user_data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

    # 2. Store user (Mock Logic)
    # In Phase 4, this will insert into a database (and hash the password)
    fake_user_db.append(user_data.dict())

    # 3. Return success response
    return {
        "message": "User registered successfully",
        "user_email": user_data.email
    }