const express = require('express');
const app = express();
app.listen(1111);

// 로그인
app.post('/login', (req,res) => {
    
})

// 회원 가입
app.post('/join', (req,res) => {
    
})

// 회원 개별 조회
app.get('/users/:id', (req,res) => {
    
})

// 회원 개별 탈퇴
app.delete('/users/:id', (req,res) => {
    
})