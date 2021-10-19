const mongoose = require('mongoose');
<<<<<<< HEAD
const {Schema} = mongoose;

const PostingsSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    min: 3,
  },
  text: {
    type: String,
    required: true,
    unique: true,
    
  },
  createdAt: {
    type: String,
    required: true,
    
  },
  image: {
    type: String,
    required: true,
    
  },
  comment: {
    type: String,
   
    
  },
  like: {
    type: String,
    
    
  },
});

PostingsSchema.virtual("postingId").get(function () {
    return this._id.toHexString()
  })
  PostingsSchema.set("toJSON", {
    virtuals: true,
  })

module.exports = mongoose.model('Postings',PostingsSchema);
=======
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
>>>>>>> 2daf4c5eb694f787275b07a55639c622fa8f8dad
