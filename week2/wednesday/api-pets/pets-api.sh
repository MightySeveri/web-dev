# Get all pets
curl http://127.0.0.1:4000/pets

# Create a pet
curl -X POST http://127.0.0.1:4000/pets \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Buddy",
  "species": "Dog",
  "age": 1
}'

# Get pet by ID
curl http://127.0.0.1:4000/pets/1

# Update pet
curl -X PUT http://127.0.0.1:4000/pets/1 \
  -H "Content-Type: application/json" \
  -d '{
  "species": "Dog",
  "age": 2
}'

# Delete pet
curl -X DELETE http://127.0.0.1:4000/pets/1
