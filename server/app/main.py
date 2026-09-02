from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routes import auth, problems, execute

config = get_settings()

app = FastAPI(title="D:CODE API", version="1.0.0")

origins = [o.strip() for o in config.CORS_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(problems.router)
app.include_router(execute.router)


@app.get("/api/health")
async def health():
    return {"status": "ok"}
