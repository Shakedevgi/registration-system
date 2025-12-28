# Registration System – Backend (Phase 3)

This is the backend service for the Registration System project.  
It is built using **FastAPI** and **Pydantic** to handle user registration requests.

---

## Features

- **POST /register** – Accepts user registration data and simulates user creation
- **Input Validation** – Uses Pydantic for server-side validation (email format, password length, required fields)
- **CORS Support** – Configured to allow requests from the local React frontend
- **No Database (Phase 3)** – Uses placeholder logic only, ready for DB integration in Phase 4

---

## Prerequisites

- Python 3.9+
- pip

---

## Installation

1. Navigate to the backend directory:
   ```bash
   cd server-python
2. install dependencies:
    pip install -r requirements.txt


## Running the server
    uvicorn app.main:app --reload
    The API will be available at: http://127.0.0.1:8000
    Swagger UI: http://127.0.0.1:8000/docs

