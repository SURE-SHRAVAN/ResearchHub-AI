from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "postgresql://postgres:myserver18@localhost:5432/researchhub"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# ✅ THIS IS WHAT YOU ARE MISSING
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
