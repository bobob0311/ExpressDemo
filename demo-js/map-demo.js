const arr = [1, 2, 3, 4, 5];

const arrMap = arr.map((value, index) => {
    return value * 2;
})

const forEachMap = arr.forEach((value, index) => {
    return value * 2;
})

console.log(arrMap); // [2,4,6,8,10]
console.log(forEachMap); // undefined
