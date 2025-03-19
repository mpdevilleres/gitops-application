from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(
    title="TODO List API",
    description="A simple TODO list API built with FastAPI",
    version="0.1.0",
    root_path="/api"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# In-memory data store
todos = {}

# Helper function to find a todo by ID
def get_todo_by_id(todo_id: str):
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todos[todo_id]

# Routes
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the TODO List API"}

@app.get("/todos", response_model=List[Todo], tags=["Todos"])
async def get_todos():
    """
    Get all todos
    """
    return list(todos.values())

@app.post("/todos", response_model=Todo, status_code=status.HTTP_201_CREATED, tags=["Todos"])
async def create_todo(todo: TodoCreate):
    """
    Create a new todo
    """
    todo_id = str(uuid.uuid4())
    current_time = datetime.now()
    
    new_todo = {
        **todo.model_dump(),
        "id": todo_id,
        "created_at": current_time,
        "updated_at": current_time,
    }
    
    todos[todo_id] = new_todo
    return new_todo

@app.get("/todos/{todo_id}", response_model=Todo, tags=["Todos"])
async def get_todo(todo_id: str):
    """
    Get a specific todo by ID
    """
    return get_todo_by_id(todo_id)

@app.patch("/todos/{todo_id}", response_model=Todo, tags=["Todos"])
async def update_todo(todo_id: str, todo_update: TodoBase):
    """
    Update a todo by ID
    """
    todo = get_todo_by_id(todo_id)
    update_data = todo_update.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        todo[key] = value
    
    todo["updated_at"] = datetime.now()
    return todo

@app.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Todos"])
async def delete_todo(todo_id: str):
    """
    Delete a todo by ID
    """
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    del todos[todo_id]
    return None

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
