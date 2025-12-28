from fastapi import APIRouter, HTTPException, status
from app.schemas import UserRegister, UserResponse
from app import crud, security
from datetime import datetime
router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserRegister):
    # 1. Check if email already exists
    existing_user = await crud.get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    # 2. Hash the password
    hashed_password = security.get_password_hash(user.password)

    # 3. Prepare user data (Exclude plain password, add hash)
    user_dict = user.model_dump()
    user_dict["password"] = hashed_password  # Overwrite plain password with hash

    # Convert dateOfBirth (date → datetime) for MongoDB
    user_dict["dateOfBirth"] = datetime.combine(
        user_dict["dateOfBirth"],
        datetime.min.time()
    )
    # 4. Insert into MongoDB
    new_user = await crud.create_user(user_dict)

    # 5. Return response (Schema filters out password automatically)
    return new_user