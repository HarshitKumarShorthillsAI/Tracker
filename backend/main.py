from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

from . import database, models, schemas, crud, auth
from .database import get_db
from .models import User

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== AUTHENTICATION ==========

@app.post("/register")
def register(data: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, data.username, data.password, data.role)

@app.post("/login")
def login(data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, data.username)
    if not user or not auth.verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access_token": auth.create_token(user), "token_type": "bearer"}

# ========== TIMESHEET ==========

@app.post("/timesheet")
def add_timesheet(t: schemas.TimeSheetCreate, db: Session = Depends(get_db), user=Depends(auth.get_current_user)):
    return crud.add_timesheet(db, user.id, t.date, t.hours, t.description)

@app.get("/my-timesheets")
def get_my_timesheets(db: Session = Depends(get_db), user=Depends(auth.get_current_user)):
    return crud.get_timesheets_by_user(db, user.id)

# ========== TEAM MANAGEMENT ==========



@app.post("/assign")
def assign(data: schemas.TeamMembershipCreate, db: Session = Depends(database.get_db), user=Depends(auth.get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admin can assign users")
    return crud.assign_to_team(db, data.team_lead_id, data.user_id)

@app.get("/team-timesheets")
def get_team_timesheets(db: Session = Depends(database.get_db), user=Depends(auth.get_current_user)):
    if user.role != "team_lead":
        raise HTTPException(status_code=403, detail="Only team_leads can access")
    return crud.get_team_timesheets(db, user.id)
