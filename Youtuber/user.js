const express = require('express');
const app = express();
app.listen(1111);

const db = new Map();
let id = 1;

app.use(express.json());

// 로그인
app.post('/login', (req, res) => {
    
})

// 회원 가입
app.post('/join', (req, res) => {
    const userData = req.body;
    if (userData.userId && userData.userPwd && userData.userName) {
        db.set(id++, userData);
        res.status(201).json({
            message: `${userData.userName}님 환영합니다.`
        })
    } else {
        res.status(400).json({
            message : "입력 값을 다시 확인해 주세요."
        })
    }
})

// 회원 개별 조회
app.get('/users/:id', (req,res) => {
    let { id } = req.params;
    id = parseInt(id);
    
    const user = db.get(id);
    if (user) {
        res.status(200).json({
            userId: user.userId,
            name: user.userName,
        });    
    } else {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    }
    
})

// 회원 개별 탈퇴
app.delete('/users/:id', (req,res) => {
    
})