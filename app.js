const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/index');
// const sendMail = require('./services/mailer');
const connectQueue = require('./services/queue');

dotenv.config();

const app = express();

app.use(router);

connectQueue();
// sendMail();

app.listen(process.env.PORT);
