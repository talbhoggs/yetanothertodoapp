const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    targetDate: {
      type: Date,
      // required: true,
    },
    status: {
      type: String,
      default: 'open', // other values are inprogress, done, skipped
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
