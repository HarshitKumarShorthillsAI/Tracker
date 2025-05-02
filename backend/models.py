from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)
    role = Column(String)  # user, team_lead, admin

    timesheets = relationship("TimeSheet", back_populates="user")

class TimeSheet(Base):
    __tablename__ = "timesheets"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(Date)
    hours = Column(Time)
    description = Column(String)

    user = relationship("User", back_populates="timesheets")

class TeamMembership(Base):
    __tablename__ = "team_memberships"
    id = Column(Integer, primary_key=True, index=True)
    team_lead_id = Column(Integer, ForeignKey("users.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
