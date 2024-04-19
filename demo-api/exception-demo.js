const express = require('express');
const app = express();
app.listen(1234);

const fruits = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'orange' },
    { id: 3, name: 'strawberry' },
    { id: 4, name: 'blueberry' },
];

// 과일 전체 조회
app.get('/fruits', (req,res) => {
    res.json(fruits); // json array
})

// 과일 개별 조회
app.get('/fruits/:id', (req,res) => {
    let { id } = req.params;
    let fruit = fruits[id - 1];
    // let fruit = fruits.find(f => (f.id == id));
    // fruits 배열 안에 있는 것 중에 id 값이 동일한 객체 찾아냄.

    if (fruit) {
        res.json(fruit);    
    } else {
        res.status(404).json({
            message: "전달해준 id로 저장된 과일이 없습니다."
        })
    }
})