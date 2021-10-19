const mongoose = require('mongoose');
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