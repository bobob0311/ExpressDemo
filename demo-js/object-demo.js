let book = {
    title: "Node.js를 공부해보자",
    price: 20000,
    description : "이 책이 좋습니다."
}

console.log(book);

function print(o) {
    console.log(o.title);
    console.log(o.price);
    console.log(o.description);
}

print(book);