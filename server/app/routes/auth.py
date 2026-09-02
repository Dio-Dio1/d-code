from pydantic import BaseModel, EmailStr
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.db.models import User
from app.middleware.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    token: str
    user: dict


def user_to_dict(user: User) -> dict:
    return {
        "id": str(user.id),
        "username": user.username,
        "email": user.email,
        "name": user.name,
        "avatar": user.avatar,
        "rating": user.rating,
        "rank": user.rank,
        "wins": user.wins,
        "losses": user.losses,
        "solved": user.solved,
        "languages": user.languages or [],
        "joined": user.created_at.strftime("%b %Y") if user.created_at else None,
    }


@router.post("/signup", response_model=AuthResponse)
async def signup(req: SignupRequest, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(
        select(User).where((User.email == req.email) | (User.username == req.username))
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email or username already taken")

    initials = "".join(w[0].upper() for w in req.name.split()[:2])
    user = User(
        username=req.username,
        email=req.email,
        password_hash=hash_password(req.password),
        name=req.name,
        avatar=initials,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    token = create_access_token(data={"sub": str(user.id)})
    return AuthResponse(token=token, user=user_to_dict(user))


@router.post("/login", response_model=AuthResponse)
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(data={"sub": str(user.id)})
    return AuthResponse(token=token, user=user_to_dict(user))


@router.get("/me")
async def get_me(user: User = Depends(get_current_user)):
    return user_to_dict(user)
