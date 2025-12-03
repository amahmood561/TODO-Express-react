# TODO Express + React

This repository contains a small Todo application with a TypeScript + Express server (in-memory) and a React + Vite TypeScript client.

Repository layout
- `server/` — Express + TypeScript API (runs on port 4000 by default)
- `client/` — React + Vite TypeScript frontend

Quick start

1. Start the server

```bash
cd server
npm install
npm run dev
# server listens on http://localhost:4000
```

2. Start the client (in a separate terminal)

```bash
cd client
npm install
npm run dev
# open the URL shown by Vite (usually http://localhost:5173)
```

API and testing
- The client expects the API base URL: `http://localhost:4000/api` (see `client/src/api/client.ts`).
- Postman: import `server/todo.postman_collection.json` for quick tests (collection variables: `baseUrl`, `lastTodoId`).

API endpoints (server)
- GET /health — health check
- GET /api/todos — list todos
- GET /api/todos/:id — get a single todo
- POST /api/todos — create todo
- PUT /api/todos/:id — update todo
- PATCH /api/todos/:id/toggle — toggle completed
- DELETE /api/todos/:id — delete todo
- GET /api/categories — list categories
- POST /api/categories — create category
- PUT /api/categories/:id — update category
- DELETE /api/categories/:id — delete category

Postman and demo image
- Postman collection: `server/todo.postman_collection.json` (import into Postman to run the demo flows).
- Demo screenshot: /Users/mahmoodfamily/todoapp/client/demo.png

Example curl flow

```bash
# list
curl -i http://localhost:4000/api/todos

# create
curl -i -X POST http://localhost:4000/api/todos -H "Content-Type: application/json" -d '{"title":"Test todo","description":"temp","dueDate":null,"categoryId":null}'

# delete (replace <id> with returned id)
curl -i -X DELETE http://localhost:4000/api/todos/<id>

# list (confirm)
curl -i http://localhost:4000/api/todos
```

Notes
- The server stores data in-memory; restarting the server clears all todos.
- The client includes a small UX change: after a successful delete the page reloads to refresh the list.

Troubleshooting
- If the client shows Vite overlay errors about unresolved imports or "does not provide an export named ...", stop and restart the dev server after edits (Vite can cache bundles). Removing `node_modules/.vite` and restarting can help.
- If fetches fail, ensure the server is running on port 4000 and CORS is allowed (server already sets CORS).

Files of interest
- `server/src/*` — server source
- `client/src/*` — client source
- `server/todo.postman_collection.json` — Postman collection to run create/list/delete sequence
