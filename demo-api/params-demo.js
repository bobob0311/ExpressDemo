const express = require('express');
const app = express();

app.listen(1234);

app.get('/products/:n', function (req, res) {
    // : => 나한테 URL로 매개변수를 전달해줄 건 가보다 
    // req.params
    // products/ __ 빈칸에 오는 값을 n이라는 변수에 담아줘
    res.json({
        num: parseInt(req.params.n),
    })
})
/*
app.get('/:nickname', function (req, res) {
    const param = req.params;
    
    res.json({
        channel: param.nickname
    })
})
*/

// (?) 쿼리스트링
// watch? 뒤에 글자를 가져오는데 
// =을 기준으로 앞에는 Key값 뒤에는 value로 가져와준다.
app.get('/watch', function (req, res) {
    // 객체의 비구조화
    // 객체의 변수이름을 맞춰서 가져와야한다.
    const {v,t} = req.query;
    
    res.json({
        video: v,
        timeLine: t
    });
})