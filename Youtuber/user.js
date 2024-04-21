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
    
})

// 회원 개별 탈퇴
app.delete('/users/:id', (req,res) => {
    
})