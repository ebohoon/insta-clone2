const express = require('express');
const router = express.Router();

const {
    getAllPostings,
    postPostings,
} = require('./controller/main.js');

const {
    authMiddleware
} = require('../middlewares/authMiddleware.js');
const {
    uploadImage
} = require('../middlewares/imageUploadMiddleware.js');


router
    .route("/view")
    .get(getAllPostings)


router
    .route("/post")
    .post(authMiddleware, uploadImage, postPostings);






module.exports = router;
