# Get all users
curl http://127.0.0.1:4000/users

# Create a user
curl -X POST http://127.0.0.1:4000/users \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Matti Seppänen",
  "password": "M@45mtg$",
  "username": "mattis",
  "address": "New Address, 00100 Helsinki",
  "age": 24
}'

# Get user by ID
curl http://127.0.0.1:4000/users/1

# Update user
curl -X PUT http://127.0.0.1:4000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
  "color": "Red",
  "age": 4
}'

# Delete user
curl -X DELETE http://127.0.0.1:4000/users/1