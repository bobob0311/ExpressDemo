const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.listen(process.env.PORT);

const userRouter = require('./routes/user');
const channelRouter = require('./routes/channel');

app.use("/", userRouter);
app.use("/channels", channelRouter);