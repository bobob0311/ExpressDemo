const obj1 = {};

const obj2 = { message: "not Empty" };

// 비어있는걸 확인하는 방법
console.log(Object.keys(obj1).length === 0); // true
console.log(Object.keys(obj2).length === 0); // false