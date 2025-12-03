# Todo App — Server

Simple Express + TypeScript in-memory server for the Todo app.

Prerequisites
- Node.js (v18+) and npm

Install

```bash
cd server
npm install
```

Run (development)

```bash
npm run dev
```

Build

```bash
npm run build
npm start
```

API endpoints
- GET /health — health check
- GET /api/todos — list todos
- POST /api/todos — create todo (body: title, description?, dueDate?, categoryId?)
- PUT /api/todos/:id — update
- PATCH /api/todos/:id/toggle — toggle completed
- DELETE /api/todos/:id — delete
- GET /api/categories, POST /api/categories, PUT /api/categories/:id, DELETE /api/categories/:id

Testing
- You can import the included Postman collection: `server/todo.postman_collection.json`.
- Example curl flow:

```bash
# list
curl -i http://localhost:4000/api/todos

# create
curl -i -X POST http://localhost:4000/api/todos -H "Content-Type: application/json" -d '{"title":"Test todo","description":"temp","dueDate":null,"categoryId":null}'

# delete (replace <id> with returned id)
curl -i -X DELETE http://localhost:4000/api/todos/<id>
```

Notes
- The server stores state in-memory — restarting the server will clear data.
