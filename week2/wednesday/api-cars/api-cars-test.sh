# Get all cars
curl http://127.0.0.1:4000/cars

# Create a dog
curl -X POST http://127.0.0.1:4000/cars \
  -H "Content-Type: application/json" \
  -d '{
  "model": "Toyota Camry",
  "color": "Blue",
  "age": 3
}'

# Get car by ID
curl http://127.0.0.1:4000/cars/1

# Update car
curl -X PUT http://127.0.0.1:4000/cars/1 \
  -H "Content-Type: application/json" \
  -d '{
  "color": "Red",
  "age": 4
}'

# Delete car
curl -X DELETE http://127.0.0.1:4000/cars/1
