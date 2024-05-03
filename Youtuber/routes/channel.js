const express = require('express');
const router = express.Router();
const conn = require('../db');


router.use(express.json());

// 채널 전체 조회, 채널 생성
router
    .route('/')
    .get((req, res) => {
        let { userId } = req.body;
        
        let sql = `SELECT * FROM channel WHERE user_id = ?`
        userId ? conn.query(sql, userId,
            function (err, results) {
                if (results.length) {
                    res.status(200).json(results);    
                } else {
                    res.status(404).json({
                        message : "채널 정보를 찾을 수 없습니다."
                    })
                }
            }
        )
        :
        res.status(400).end();
    })
    .post((req, res) => {
        let channel = req.body;
        if (channel.channelTitle && channel.userId) {
            db.set(id++, channel);
            res.json({message : `${db.get(id-1).channelTitle}채널을 응원합니다.`});    
        } else {
            console.log(req.body)
            res.status(400).json({
                message : "요청 값을 제대로 보내주세요."
            })
        }
    })

// 채널 개별 조회, 채널 개별 수정, 채널 개별 삭제
router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params;
        id = parseInt(id);
        
        let sql = `SELECT * FROM channel WHERE id = ?`
        conn.query(sql, id,
            function (err, results) {
                if (results.length) {
                    res.status(200).json(results);    
                } else {
                    res.status(404).json({
                        message : "채널 정보를 찾을 수 없습니다."
                    })
                }
            }
        )
    })
    .put((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        let channel = db.get(id);
        let oldTitle = channel.channelTitle;

        if (channel) {
            let newTitle = req.body.channelTitle;
            channel.channelTitle = newTitle;
            db.set(id, channel);
            res.json({
                message : `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle}에서 수정 ${newTitle}`
            })
        } else {
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다."
            })
        }
    })
    .delete((req, res) => {
        let { id } = req.params;
        id = parseInt(id);
        
        const channelData = db.get(id);
        if (channelData) {
            db.delete(id);
            res.json({message : `${channelData.channelTitle} 채널이 정상적으로 삭제되었습니다.`})
        } else {
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    })

module.exports = router;
