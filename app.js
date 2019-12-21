const express = require('express');
const dotenv = require('dotenv');
// const sendMail = require('./services/mailer');
const connectQueue = require('./services/queue');

dotenv.config();

const app = express();

connectQueue();
// sendMail();

app.listen(process.env.PORT);
