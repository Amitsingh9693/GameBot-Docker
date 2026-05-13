const mongoose = require('mongoose');

const historySchema = mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    genres: {
      type: [Number],
      default: [],
    },
    platforms: {
      type: [Number],
      default: [],
    },
    tags: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('History', historySchema);
