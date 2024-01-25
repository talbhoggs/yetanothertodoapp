const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: [String],
      default: ['user'],
    },
    picturePath: {
      type: String,
      default: '',
    },
    todos: [
      {
        type: Schema.Types.ObjectId, ref: 'todo', require: true,
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.password;
      },
    },
    timestamp: true,
  },
);

module.exports = mongoose.model('user', UserSchema);
