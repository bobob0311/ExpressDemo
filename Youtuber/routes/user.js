const express = require('express');
const router = express.Router();

const db = new Map();
let id = 1;

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
        loginUser.userPwd === userPwd ? console.log("패스워드도 같다.") : console.log("패스워드 틀림 ㅉㅉ")
    } else {
        console.log("입력하신 아이디는 없는 아이디 입니다.")
    }

})

// 회원 가입
router.post('/join', (req, res) => {
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

router
    .route('/users/:id')
    .get( (req,res) => {
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
    .delete((req,res) => {
        let { id } = req.params;
        id = parseInt(id);
        const user = db.get(id);
        if (user) {
            db.delete(id)
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