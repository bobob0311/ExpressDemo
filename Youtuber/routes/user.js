const express = require('express');
const router = express.Router();
const conn = require('../db');

router.use(express.json());



// 로그인
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM `users` WHERE email = ?';

    conn.query(sql, email,
        function (err, results) {
            const loginUser = results[0];
            
            if (loginUser && loginUser.password == password) {
                res.status(200).json({
                    message: `${loginUser.name}님 로그인 되었습니다.`
                })
            } else {
                res.status(404).json({
                    message : "이메일 또는 비밀번호가 틀렸습니다."
                })
            }
        }
    );    
})

// 회원 가입
router.post('/join', (req, res) => {
    if (req.body == {}) {
        res.status(400).json({
            message : '입력 값을 다시 확인해주세요'
        })
    } else {
        const { email, name, password, contact } = req.body;

        const sql = 'INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)';
        const values = [email, name, password, contact];
        conn.query(sql, values,
            function (err, results) {
                res.status(201).json(results);    
            }
        );
    }
               
})

// 회원 조회 , 회원 삭제 
router
    .route('/users')
    .get( (req,res) => {
        const { email } = req.body;
    
        const sql = 'SELECT * FROM `users` WHERE email = ?';
        conn.query(sql,email,
            function (err, results, fields) {
                if (results.length) {
                    res.status(200).json(results);    
                } else {
                    res.status(404).json({
                        message : "회원 정보가 없습니다."
                    })
                }
            }
        );
    })
    .delete((req,res) => {
        const { email } = req.body;
        
        const sql = 'DELETE FROM users WHERE email = ?';
        conn.query(sql, email,
            function (err, results, fields) {
                res.status(200).json(results);
            }
        );
    })


module.exports = router;