# Registration System – Internship Take-Home Test

This repository contains a full-stack registration system developed as part of an internship take-home assignment.

The project is built in **incremental phases**, focusing on correctness, structure, and clear reasoning rather than premature optimization.

---

## Project Structure

- `web/` – React JS web registration interface  
- `mobile/` – React Native mobile registration app (planned)  
- `server-python/` – FastAPI backend with MongoDB  
- `server-node/` – NodeJS server for OpenAI integration (planned)  
- `docs/` – Architecture notes, prompts, and documentation  

---

## Implemented Features (So Far)

### Backend (FastAPI + MongoDB)
- `POST /register` endpoint
- Server-side validation using Pydantic
- Password hashing with bcrypt
- Duplicate email protection (HTTP 409)
- MongoDB persistence (local)
- Proper error handling (422 / 409 / 201)
- CORS support for React frontend

### Web Frontend (React)
- Registration form with client-side validation
- Password complexity and age (18+) checks
- Integration with FastAPI backend
- End-to-end registration flow (React → FastAPI → MongoDB)

---

## Current Status

- Phase 1: Understanding & system design – ✅ Completed  
- Phase 2: Web (React JS) – ✅ Completed  
- Phase 3: Backend (FastAPI + MongoDB) – ✅ Completed  
- Phase 4: Mobile app (React Native) - ✅ Completed  
---

## Upcoming Phases

- phase 4b: azure
- Phase 5: OpenAI integration (NodeJS + Toast messages)
- Phase 6: Extended AI chatbot (Hebrew, external platform, logging)

---

## Notes

- The backend currently runs locally.
- Azure deployment will be handled after all core functionality is completed.
- Each phase is committed separately to maintain clarity and traceability.
#