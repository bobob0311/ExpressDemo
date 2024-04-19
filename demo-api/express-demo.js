const express = require('express');
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234);

// API test
app.get('/', function (req, res) {
    res.send('Hello Node.js')
})

app.get('/hello', function (req, res) {
    res.json({
        say: '안녕하세요'
    })
})

app.get('/products/1', function (req, res) {
    res.json({
        title: 'Node.js에 대한 책',
        price: 20000,
        description: 'Node.js에 대해 배우고 싶다면 매우 좋은 책'
    })
})

const book = {
    title: 'Node.js에 대한 책',
    price: 20000,
    description: 'Node.js에 대해 배우고 싶다면 매우 좋은 책' 
};

app.get('/products/2', function (req, res) {
    res.json(book)
})



