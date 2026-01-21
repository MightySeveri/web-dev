# Get all things to do
curl http://127.0.0.1:4000/todos

# Create a thing to do
curl -X POST http://127.0.0.1:4000/todos \
  -H "Content-Type: application/json" \
  -d '{
  "task": "Buy groceries",
  "completed": false,
  "dueDate": "2023-12-31"
}'

# Get things to do by ID
curl http://127.0.0.1:4000/todos/1

# Update todo list
curl -X PUT http://127.0.0.1:4000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
  "task": "Buy groceries",
  "completed": true,
  "dueDate": "2023-12-31"
}'

# Delete a thing to do
curl -X DELETE http://127.0.0.1:4000/todos/1
