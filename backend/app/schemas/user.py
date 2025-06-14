#Pydentic scjemas for user-related data validation and serialization
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length = 8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str 