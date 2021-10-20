const mongoose = require("mongoose");

const { Schema } = mongoose;
const commentsSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  text: {
    type: String,       
    required: true,
  },

  createdAt: {
    type: String,       
    required: true,   
  },
});

module.exports = mongoose.model("comments", commentsSchema);