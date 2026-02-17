from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.db.models.user import User

router = APIRouter(prefix="/home", tags=["Home"])


@router.get("/")
def get_home_data(current_user: User = Depends(get_current_user)):

    return {
        "message": "Welcome to your dashboard",
        "user": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "email": current_user.email,
        }
    }
