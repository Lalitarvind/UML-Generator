# UML - generator

An updated version of [Auto-UML](https://github.com/Gryffindor-House/Auto-UML/tree/main), improving UML diagram generation with a modern full-stack approach.

---

##  Tech Stack

| Backend                                                                 | Frontend                                                                 | Database                                                                 | Tools & Utilities                                                              |
|-------------------------------------------------------------------------|--------------------------------------------------------------------------|--------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) | ![FastAPI](https://img.shields.io/badge/-FastAPI-009688?logo=fastapi&logoColor=white) |
|                                                                         | ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) |                                                                          | ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)   |


---

## ⚙️ Getting Started

### Backend

1. Navigate to the backend directory:

    ```powershell
    cd backend
    ```

2. Create and activate the virtual environment (PowerShell):

    ```powershell
    uv venv .venv
    .venv\Scripts\Activate.ps1
    ```
3. You can use the requirements.txt initially to make the toml and later discard requirements.txt

    ```powershell
    uv add -r requirements.txt 
    ```

4. To further add any other packages just use 

    ```powershell
    uv add <package>
    ```

5. Start the FastAPI server with hot reload:

    ```powershell
    uvicorn app.main:app --reload
    ```

The backend server will be running at: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
API docs available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Frontend

1. Navigate to the frontend directory:

    ```powershell
    cd frontend
    ```

2. Install dependencies (only needed once):

    ```powershell
    npm install
    ```

3. Start the development server:

    ```powershell
    npm run dev
    ```

The frontend app will be running at: [http://localhost:5173](http://localhost:5173)

---

## 🧹 Manual Lint & Format Checks

### Backend

Make sure your virtual environment is activated, then run:

```powershell
black app tests
isort app tests
flake8 app tests
mypy app tests
```

### Frontend

Run lint and format commands via npm:

```
npm run lint
npm run format
```


