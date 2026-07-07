const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    type: {
      type: String,
      enum: ["buy", "rent", "borrow"],
      required: true,
    },

    amount: {
      type: Number,
      default: 0,
    },

    borrowDate: Date,

    dueDate: Date,

    returned: {
      type: Boolean,
      default: false,
    },

    returnCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);