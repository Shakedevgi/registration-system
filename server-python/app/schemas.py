from pydantic import BaseModel, EmailStr, Field, BeforeValidator
from typing import Optional, Annotated
from datetime import date

# Helper for MongoDB ObjectId
PyObjectId = Annotated[str, BeforeValidator(str)]

# 1. Schema for receiving data (Registration)
class UserRegister(BaseModel):
    fullName: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=8)
    dateOfBirth: date

# 2. Schema for returning data (Response)
class UserResponse(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: EmailStr
    fullName: str
    dateOfBirth: date

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "id": "651a2b...",
                "fullName": "John Doe",
                "email": "user@example.com",
                "dateOfBirth": "1999-05-12"
            }
        }
    }
