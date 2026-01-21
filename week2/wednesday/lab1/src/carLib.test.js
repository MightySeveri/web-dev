import { addOne, getAll, findById, updateOneById, deleteOneById, reset } from './carLib.js';

// Add cars
let result = addOne("Corolla", "Red", 3);
console.log("addOne result:", result);

result = addOne("Civic", "Blue", 2);
console.log("addOne result:", result);

console.log("\ngetAll called:", getAll());

console.log("\nfindById called:", findById(1));

console.log("\nupdateOneById called:", updateOneById(1, { age: 4, color: "Black" }));
console.log("findById called after item updated:", findById(1));

console.log("\ndeleteOneById called:", deleteOneById(1));
console.log("findById called after item deleted:", findById(1));