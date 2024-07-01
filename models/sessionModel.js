const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  movie: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  soldTickets: {
    type: Number,
    default: 0,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = { Session, sessionSchema };
