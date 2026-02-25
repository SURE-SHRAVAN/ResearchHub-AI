from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.db.models.user import User

router = APIRouter()

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email
    }
