const express = require('express');
const router = express.Router();

const db = new Map();
let id = 1;

router.use(express.json());

// 채널 전체 조회, 채널 생성
router
    .route('/')
    .get((req, res) => {
        if (db.size && userId) {
            let { userId } = req.body;
            let channels = [];
            db.forEach((value) => {
                value.userId === userId ? channels.push(value) : null;
            })
            channels.length ?
                res.json(channels) :
                res.status(404).json({
                    message : "조회할 채널이 없습니다."
                })        
            res.status(404).json({
                message : "로그인이 필요한 페이지 입니다."
            })
        } else {
            res.status(404).json({
                message : "조회할 채널이 없습니다."
            })            
        }
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
        
        const channelData = db.get(id);
        if (channelData) {
            res.json(channelData);

        } else {
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
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
