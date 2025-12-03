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

Postman collection and demo image
- Postman collection: `server/todo.postman_collection.json` — import it to run the health/list/create/delete requests. The collection saves created todo ids to the `lastTodoId` collection variable.
- Demo screenshot: /Users/mahmoodfamily/todoapp/client/demo.png

Example curl session
--------------------
Below is an example interactive session (commands and server responses) that demonstrates listing todos, creating a todo, listing again, deleting it, and confirming deletion:

```bash
# list
curl -i http://localhost:4000/api/todos

# create
curl -i -X POST http://localhost:4000/api/todos -H "Content-Type: application/json" -d '{"title":"Test todo","description":"temp","dueDate":null,"categoryId":null}'

# list (returns the created todo)
curl -i http://localhost:4000/api/todos

# delete (replace <id> with returned id)
curl -i -X DELETE http://localhost:4000/api/todos/<id>

# list (after delete)
curl -i http://localhost:4000/api/todos
```

Example output (from a sample run):

```txt
HTTP/1.1 200 OK
[]

HTTP/1.1 201 Created
{"id":"fpgqw7g","title":"Test todo","description":"temp","dueDate":null,"categoryId":null,"completed":false,...}

HTTP/1.1 200 OK
[{"id":"fpgqw7g","title":"Test todo",...}]

HTTP/1.1 204 No Content

HTTP/1.1 200 OK
[]
```

