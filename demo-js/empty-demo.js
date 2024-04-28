const obj1 = {};
const obj2 = { message: "not Empty" };

const str1 = "one";
const str2 = "";

// 비어있는걸 확인하는 방법
console.log(Object.keys(obj1).length === 0); // true
console.log(Object.keys(obj2).length === 0); // false

console.log(Object.keys(str1).length === 0); // false
console.log(Object.keys(str2).length === 0); // true
// 문자열도 객체에요~

