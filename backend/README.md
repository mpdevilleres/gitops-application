# TODO List API

A simple REST API for managing todo items built with FastAPI.

## Features

- Create, read, update, and delete todo items
- In-memory storage (data is lost when the server restarts)
- OpenAPI documentation

## Requirements

- Python 3.12+
- FastAPI
- Uvicorn (ASGI server)

## Installation

1. Make sure you have Python 3.12+ installed
2. Install dependencies using UV:

```bash
uv pip install -e .
```

## Running the Application

Run the following command to start the server:

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload
```

The API will be available at: http://localhost:8000

## API Documentation

Interactive API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | / | Welcome message |
| GET | /todos | List all todos |
| POST | /todos | Create a new todo |
| GET | /todos/{id} | Get a specific todo |
| PATCH | /todos/{id} | Update a todo |
| DELETE | /todos/{id} | Delete a todo |

## Example Usage

### Create a TODO item

```bash
curl -X 'POST' \
  'http://localhost:8000/todos' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}'
```

### List all TODO items

```bash
curl -X 'GET' 'http://localhost:8000/todos'