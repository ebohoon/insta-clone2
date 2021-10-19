const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostingSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
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
    like: {
        type: String,
        required: true,
      },
    comment: {
      type: String,
      required: true,
    },
  },
);

PostingSchema.virtual('postingId').get(function () {
    return this._id.toHexString();
});  // make front-end refer this value

PostingSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("postings", PostingSchema);
