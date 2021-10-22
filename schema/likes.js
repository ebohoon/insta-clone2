const mongoose = require('mongoose');

const { Schema } = mongoose;
const likesSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: Postings
    // required: true,
  },
  countNum: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    required: true,
  },
  checkLike: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('likes', likesSchema);
