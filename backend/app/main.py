from fastapi import FastAPI

app = FastAPI()

@app.post('/')
def add_root():
    return {"message": "Root added!"}

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
