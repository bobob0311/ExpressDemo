const express = require('express');
const app = express();

app.listen(9999);
app.use(express.json());

// id로 map에서 객체를 찾아서, 그 객체의 정보를 뿌려줌
app.get('/youtubers/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    const data = db.get(id);

    if (data == undefined) {
        res.json({ message: "유튜브 정보를 찾을 수 없습니다." });
    } else {
        res.json(data);  
    }
})

app.get('/youtubers', (req, res) => {
    let youtubers = {};
    db.forEach((value, key) => {
        youtubers[key] = value;
    });
    res.json(youtubers); 
})

// POST를 활용해서 유튜버를 추가 !!
app.post('/youtuber', (req, res) => {
    db.set(id++, req.body);
    console.log(id);
    res.json({message : `${req.body.channelTitle}님, 유튜버 생활을 응원합니다.`});
})


app.delete('/youtubers/:id', (req,res) => {
    let { id } = req.params;
    id = parseInt(id);

    let youtuber = db.get(id);

    if (youtuber == undefined) {
        res.json({
            message : `요청하신 ${id}번은 가입된 유튜버가 아닙니다.`
        })
    } else {
        const name = youtuber.channelTitle;
    
        db.delete(id);
        res.json({
            message: `${name}님 죄송하지만 삭제요`
        });    
    }
})

app.delete('/youtubers', (req, res) => {
    // db에 값이 1개 이상이면, 전체 삭제 
    // 값이 없으면 삭제할 유튜버가 없다.
    let msg = "";
    if (db.size >= 1) {
        db.clear();
        msg = "전체 유튜버가 삭제되었습니다."              
    } else {
        msg = "삭제할 유튜버가 없습니다.";
    }
    res.json({
        message: msg
    })
    
})

app.put('/youtubers/:id', (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let youtuber = db.get(id);
    
    if (youtuber == undefined) {
        res.json({
            message : `수정하시려고하는 ${id}번은 없는 유튜버입니다.`
        })
    } else {
        const oldTitle = youtuber.channelTitle;
        const newTitle = req.body.channelTitle;
        youtuber.channelTitle = newTitle;
        db.set(id, youtuber);
        res.json({
        message : `${oldTitle}님 채널명이 ${newTitle}로 변경되었습니다.`
    })
    }
    
})

const db = new Map();

let youtuber1 = {
    channelTitle: "십오야",
    subscriber: 5930000,
    videoNum: 993,
}

let youtuber2 = {
    channelTitle: "침착맨",
    subscriber: 2270000,
    videoNum: 6600,
}

let youtuber3 = {
    channelTitle: "테오",
    subscriber: 548000,
    videoNum: 762,
}

let id = 1;
db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);