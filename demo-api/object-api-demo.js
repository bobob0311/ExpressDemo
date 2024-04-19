const express = require('express');
const app = express();

app.listen(1234);

let youtuber1 = {
    channelTitle: "십오야",
    subscriber: 5930000,
    videoNum: 993,
}

let youtuber2 = {
    channelTitle: "침착맨",
    subscriber: 2270000,
    videoNum: 6600,
}

let youtuber3 = {
    channelTitle: "테오",
    subscriber: 548000,
    videoNum: 762,
}

app.get('/:nickname', function (req, res) {
    const {nickname} = req.params;
    if (nickname == 1) {
        res.json(youtuber1);
    } else if (nickname == 2) {
        res.json(youtuber2);
    } else if (nickname == 3) {
        res.json(youtuber3);
    } else {
        res.status(404).send('없어요~')
    }
    res.json({
        channel: nickname
    })
})
