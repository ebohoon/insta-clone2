const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostingsSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    text: {
      //빈문자열 허용하기
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    comment: {
      type: String,
    },
    like: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

PostingsSchema.virtual('postingId').get(function () {
  return this._id.toHexString();
});

PostingsSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Postings', PostingsSchema);