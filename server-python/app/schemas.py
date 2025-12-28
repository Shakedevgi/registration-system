from pydantic import BaseModel, EmailStr, Field
from datetime import date

class RegistrationRequest(BaseModel):
    """
    Schema for the registration request body.
    Includes validation rules for frontend data.
    """
    fullName: str = Field(..., min_length=2, description="Full name of the user")
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(..., min_length=6, description="Password with min 6 chars")
    dateOfBirth: date = Field(..., description="Date of birth (YYYY-MM-DD)")

    class Config:
        schema_extra = {
            "example": {
                "fullName": "John Doe",
                "email": "john@example.com",
                "password": "SecretPassword123!",
                "dateOfBirth": "2000-01-01"
            }
        }

class RegistrationResponse(BaseModel):
    """
    Schema for the successful registration response.
    """
    message: str
    user_email: str