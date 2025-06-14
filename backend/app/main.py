from fastapi import FastAPI, HTTPException, status, Header, Depend
from .db.db import db
from .auth.password_hash import hash_pass, check_pass
from .auth.auth import create_token, verify_token
# from .models.user import USerCreate, UserLogin, UserResponse
from .schemas.user import UserCreate, UserLogin

app = FastAPI()

# @app.post('/')
# def add_root():
#     return {"message": "Root added!"}

@app.post("/signup")
def signup(user: UserCreate):
    """
    Create a new user account.
    
    :param user: UserCreate schema containing email and password.
    :return: A message indicating successful account creation.
    """
    # Check if the user already exists
    existing_user = db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    
    # Hash the password
    hashed_password = hash_pass(user.password)
    
    # Insert the new user into the database
    db.users.insert_one({
        "email": user.email,
        "password": hashed_password
    })
    
    return {"message": "User created successfully!"}

@app.post("/login")
def login(user: UserLogin):
    """
    Authenticate a user and return a JWT token.
    
    :param user: UserLogin schema containing email and password.
    :return: A JWT token if authentication is successful.
    """
    # Find the user in the database
    db_user = db.users.find_one({"email": user.email})
    
    if not db_user or not check_pass(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create a token with the user's email
    token = create_token({"email": user.email})
    
    return {"token": token}

@app.get("/protected")
def protected_route(authorization: str = Header(...)):
    """
    A protected route that requires a valid JWT token.
    
    :param authorization: The Authorization header containing the JWT token.
    :return: A message indicating successful access to the protected route.
    """
    # Verify the token
    payload = verify_token(authorization)
    
    return {"message": f"Welcome {payload['email']}! You have accessed a protected route."}

