let carArray = [];
let nextId = 1;

function addOne(model, color, age) {
    // Check if any parameter is empty or undefined
    if (!model || !color || !age) {
        return false;
    }

    const newCar = {
        id: nextId++,  // Assigns a unique id and increments it
        model,
        color,
        age
    };

    carArray.push(newCar); // Adds the new car to the array
    return newCar; // Returns the added car object
}

    function getAll() {
        return carArray;
    }

function findById(id) {
    const numericId = Number(id); // Converts the ID to a number
    const car = carArray.find(item => item.id === numericId); // Finds the car with the matching ID
    return car || false; // Returns the car or false if not found
}

function updateOneById(id, updatedData) {
    const car = findById(id);
    if (car) {
        // Update properties only if they are provided in updatedData
        if (updatedData.model) car.model = updatedData.model;
        if (updatedData.color) car.color = updatedData.color;
        if (updatedData.age) car.age = updatedData.age;
        return car; // Returns the updated car object
    }
    return false; // Returns false if the car with the provided ID is not found
}

function deleteOneById(id) {
    const car = findById(id);
    if (car) {
        const initialLength = carArray.length;
        carArray = carArray.filter(car => car.id !== Number(id)); // Filters out the car with the matching ID
        return carArray.length < initialLength; // Returns true if the array length decreased, indicating successful deletion
    }
    return false; // Returns false if the car was not found
}

// Reset function for testing purposes
function reset() {
    carArray = [];
    nextId = 1;
}

export { addOne, getAll, findById, updateOneById, deleteOneById, reset };