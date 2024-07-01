const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  session: {
    type: String,
    required: true,
  },
  seat: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket, ticketSchema };
