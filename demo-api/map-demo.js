const express = require('express');
const app = express();
app.listen(1234);

app.get('/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);

    if (db.get(id) == undefined) {
        res.json({message: "없는 상품입니다."})
    } else {
        product = db.get(id);
        product.id = id;
        res.json(product);    
    }
})

let db = new Map();

const noteBook = {
    productName: "NoteBook",
    price: 200000,
}

const cup = {
    productName: "cup",
    price: 3000,
}

const chair = {
    productName: "chair",
    price: 12000,
}

db.set(1, noteBook); // 키로 벨류를 찾을 수 있는 한 쌍을 저장
db.set(2, cup);
db.set(3, chair);