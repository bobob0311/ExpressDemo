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
    const userData = req.body;

    if (userData.userId && userData.userPwd && userData.userName) {
        db.set(userData.userId,userData);
        res.status(201).json({
            message: `${userData.userName}님 환영합니다.`
        })
    } else {
        res.status(400).json({
            message : "입력 값을 다시 확인해 주세요."
        })
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
        let { userId } = req.body;

        const user = db.get(userId);
        if (user) {
            db.delete(userId)
            res.status(200).json({
                message: `${user.userName}님 다음에 또 뵙겠습니다.`
            });    
        } else {
            res.status(404).json({
                message : "회원 정보가 없습니다."
            })
        }
    })


module.exports = router;