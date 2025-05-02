from pydantic import BaseModel
from datetime import date, time

class UserCreate(BaseModel):
    username: str
    password: str
    role: str

class UserLogin(BaseModel):
    username: str
    password: str

class TimeSheetCreate(BaseModel):
    date: date
    hours: time
    description: str

class TeamMembershipCreate(BaseModel):
    team_lead_id: int
    user_id: int
