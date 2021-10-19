const express = require('express');
const app = express();
const userRouter = require('./routers/user');
<<<<<<< HEAD
const postingsRouter = require('./routers/main')
=======
const mainRouter = require('./routers/main');
>>>>>>> 2daf4c5eb694f787275b07a55639c622fa8f8dad
const cors = require('cors');
const connect = require('./schema');
connect();
require('dotenv').config(); //환경변수를 위해 사용 , 포트번호 시크릿키

// middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/user', userRouter);
<<<<<<< HEAD
app.use('/main', posingsRouter);
=======
app.use('/main', mainRouter);
>>>>>>> 2daf4c5eb694f787275b07a55639c622fa8f8dad

module.exports = app;
