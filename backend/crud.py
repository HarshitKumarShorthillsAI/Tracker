from sqlalchemy.orm import Session
from . import models
from .auth import hash_password

def create_user(db: Session, username: str, password: str, role: str):
    user = models.User(username=username, password=hash_password(password), role=role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def add_timesheet(db: Session, user_id: int, date, hours, description):
    t = models.TimeSheet(user_id=user_id, date=date, hours=hours, description=description)
    db.add(t)
    db.commit()
    return t

def get_timesheets_by_user(db: Session, user_id: int):
    return db.query(models.TimeSheet).filter(models.TimeSheet.user_id == user_id).all()

def assign_to_team(db: Session, team_lead_id: int, user_id: int):
    team = models.TeamMembership(team_lead_id=team_lead_id, user_id=user_id)
    db.add(team)
    db.commit()
    return team

def get_team_members(db: Session, team_lead_id: int):
    return db.query(models.TeamMembership).filter_by(team_lead_id=team_lead_id).all()

def get_team_timesheets(db: Session, team_lead_id: int):
    members = get_team_members(db, team_lead_id)
    user_ids = [m.user_id for m in members]
    return db.query(models.TimeSheet).filter(models.TimeSheet.user_id.in_(user_ids)).all()
