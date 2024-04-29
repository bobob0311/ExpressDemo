const express = require('express');
const router = express.Router();
const conn = require('../db');

router.use(express.json());



// 로그인
router.post('/login', (req, res) => {
    console.log(req.body);
    const { userId, userPwd } = req.body;
    let loginUser = {};

    db.forEach((user) => {
        if (user.userId === userId) {
            loginUser = user;
        }
    })

    if (Object.keys(loginUser).length) {
        loginUser.userPwd === userPwd ?
            res.status(200).json({
                message : `${loginUser.userName}님 로그인 되었습니다.`
            })
            :
            res.status(400).json({
                message: '비밀번호가 틀렸습니다.'
            })
    } else {
        res.status(404).json({
            message: '회원 정보가 없습니다.'
        })
    }

})

// 회원 가입
router.post('/join', (req, res) => {
    if (req.body == {}) {
        res.status(400).json({
            message : '입력 값을 다시 확인해주세요'
        })
    } else {
        const { email, name, password, contact } = req.body;
    
        conn.query('INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)', [email, name, password, contact],
            function (err, results, fields) {
                res.status(201).json(results);    
            }
        );
    }
               
})

router
    .route('/users')
    .get( (req,res) => {
        let { email } = req.body;
    
        conn.query('SELECT * FROM `users` WHERE email = ?',email,
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
        let { email } = req.body;
        
        conn.query('DELETE FROM users WHERE email = ?', email,
            function (err, results, fields) {
                res.status(200).json(results);
            }
        );
    })


module.exports = router;