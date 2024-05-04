const express = require('express');
const router = express.Router();
const conn = require('../db');
const { body, param, validationResult } = require('express-validator')


router.use(express.json());

// 채널 전체 조회, 채널 생성
router
    .route('/')
    .get(body('userId').notEmpty().isInt().withMessage('userId는 숫자로 입력하셔야합니다.')
        , (req, res) => {
            const err = validationResult(req);

            if (!err.isEmpty()) {
                return res.status(400).json(err.array());
            }

            let { userId } = req.body;
            
            let sql = `SELECT * FROM channel WHERE user_id = ?`
            conn.query(sql, userId,
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(400).end();
                    }

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
    .post(
        [
            body('userId').notEmpty().isInt().withMessage('userId는 숫자로 입력하셔야합니다.'),
            body('name').notEmpty().isString().withMessage('name은 문자로 입력하셔야합니다.')
        ]
        , (req, res) => {
            const err = validationResult(req);

            if (!err.isEmpty()) {
                return res.status(400).json(err.array());
            }

            const { name, userId} = req.body;
            
            
            const sql = 'INSERT INTO channel (name, user_id) VALUES (?, ?)';
            const values = [name, userId];
            conn.query(sql, values,
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(400).end()
                    }
                        
                    res.status(201).json(results);
                });
        })

// 채널 개별 조회, 채널 개별 수정, 채널 개별 삭제
router
    .route('/:id')
    .get(param('id').notEmpty().withMessage('채널 id 필요')
        , (req, res) => {

            const err = validationResult(req);

            if (!err.isEmpty()) {
                return res.status(400).json(err.array());
            }

            let { id } = req.params;
            id = parseInt(id);
            
            let sql = `SELECT * FROM channel WHERE id = ?`
            conn.query(sql, id,
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(400).end();
                    }

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
    .put([
        param('id').notEmpty().withMessage('채널 id 필요'),
        body('name').notEmpty().isString().withMessage('채널명 오류')
        ]
        , (req, res) => {
            const err = validationResult(req);

            if (!err.isEmpty()) {
                return res.status(400).json(err.array());
            }

            let { id } = req.params;
            id = parseInt(id);
            let { name } = req.body;

            let sql = `UPDATE channel SET name = ? WHERE id = ?`
            let values = [name, id];
            conn.query(sql, values,
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(400).end();
                    }

                    if (results.affectedRows == 0) {
                        return res.status(400).end();
                    }

                    res.status(200).json(results);    
                }
            )
        })
    .delete(
        param('id').notEmpty().withMessage('채널 id 필요')
        , (req, res) => {
            const err = validationResult(req);

            if (!err.isEmpty()) {
                return res.status(400).json(err.array());
            }

            let { id } = req.params;
            id = parseInt(id);
    
            const sql = 'DELETE FROM channel WHERE id = ?';
            conn.query(sql, id,
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(400).end();
                    }
                    if (results.affectedRows == 0) {
                        return res.status(400).end();
                    }

                    res.status(200).json(results);
                }
            );
        })

module.exports = router;
