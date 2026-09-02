import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base


def utcnow():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(30), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    avatar = Column(String(10), default="")
    rating = Column(Integer, default=1000)
    rank = Column(Integer, default=999)
    wins = Column(Integer, default=0)
    losses = Column(Integer, default=0)
    solved = Column(Integer, default=0)
    languages = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), default=utcnow)


class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    difficulty = Column(String(10), nullable=False)
    topics = Column(JSON, nullable=False, default=list)
    acceptance = Column(Float, default=0.0)
    description = Column(Text, nullable=False)
    input_format = Column(Text, default="")
    output_format = Column(Text, default="")
    constraints = Column(JSON, default=list)
    examples = Column(JSON, default=list)
    starter_code = Column(Text, default="")
    test_cases = Column(JSON, default=list)
    is_daily = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)
