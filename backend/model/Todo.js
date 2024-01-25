const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    descripton: {
      type: String,
      required: true,
    },
    targetDate: {
      type: String,
      required: true,
    },
    status: {
      type: [String],
      default: ['open'], // other values are inprogress, done, skipped
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamp: true,
  },
);

module.exports = mongoose.model('todo', TodoSchema);
