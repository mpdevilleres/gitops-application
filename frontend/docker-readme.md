# Todo App Frontend Docker Image

This Docker image contains the frontend UI for the Todo application built with React, Vite, TypeScript, and shadcn/ui components.

## Usage

### Building the Image

```bash
docker build -t todo-frontend:latest .
```

### Running the Container

```bash
docker run -p 80:80 -e API_URL=/api todo-frontend:latest
```

## Environment Variables

- `API_URL`: The base URL for API requests (defaults to `/api` if not provided)

## Features

The frontend container includes:

- Production-optimized Nginx configuration for React SPA
- Runtime environment variable injection
- Proper caching headers for static assets
- Gzip compression for faster loading
- Client-side routing support

## Integration with Backend

This container is designed to work behind an ingress or proxy server that routes:
- Frontend requests to `/`
- Backend API requests to `/api`
