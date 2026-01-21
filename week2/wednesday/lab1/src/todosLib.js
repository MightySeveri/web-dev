let todosArray = [];
let nextId = 1;

function addOne(task, completed, dueDate) {
    // Check if any parameter is empty or undefined
    if (!task || completed === undefined || !dueDate) {
        return false;
    }

    const newTodo = {
        id: nextId++,  // Assigns a unique id and increments it
        task,
        completed,
        dueDate
    };

    todosArray.push(newTodo); // Adds the new todo to the array
    return newTodo; // Returns the added todo object
}

    function getAll() {
        return todosArray;
    }

function findById(id) {
    const numericId = Number(id); // Converts the ID to a number
    const todo = todosArray.find(item => item.id === numericId); // Finds the todo with the matching ID
    return todo || false; // Returns the todo or false if not found
}

function updateOneById(id, updatedData) {
    const todo = findById(id);
    if (todo) {
        // Update properties only if they are provided in updatedData
        if (updatedData.task) todo.task = updatedData.task;
        if (updatedData.completed !== undefined) todo.completed = updatedData.completed;
        if (updatedData.dueDate) todo.dueDate = updatedData.dueDate;
        return todo; // Returns the updated todo object
    }
    return false; // Returns false if the todo with the provided ID is not found
}

function deleteOneById(id) {
    const todo = findById(id);
    if (todo) {
        const initialLength = todosArray.length;
        todosArray = todosArray.filter(todo => todo.id !== Number(id)); // Filters out the todo with the matching ID
        return todosArray.length < initialLength; // Returns true if the array length decreased, indicating successful deletion
    }
    return false; // Returns false if the todo was not found
}

// Reset function for testing purposes
function reset() {
    todosArray = [];
    nextId = 1;
}

export { addOne, getAll, findById, updateOneById, deleteOneById, reset };