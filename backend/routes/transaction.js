const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

function generateReturnCode() {
  return "BOOK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

router.post("/buy/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(404).json({
        message: "Book not found",
      });

    if (book.status !== "available") {
      return res.status(400).json({
        message: "Book is not available",
      });
    }

    book.status = "sold";
    book.owner = req.user.id;
    book.action = "buy";

    await book.save();

    const returnCode = generateReturnCode();

    await Transaction.create({
      user: req.user.id,
      book: book._id,
      type: "buy",
      amount: book.buyPrice,
      returnCode,
    });

    res.json({
      message: "Book purchased successfully",
      returnCode,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/rent/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(404).json({
        message: "Book not found",
      });

    if (book.status !== "available") {
      return res.status(400).json({
        message: "Book is not available",
      });
    }

    const due = new Date();
    due.setDate(due.getDate() + 7);

    book.status = "rented";
    book.owner = req.user.id;
    book.action = "rent";

    await book.save();

    const returnCode = generateReturnCode();

    await Transaction.create({
      user: req.user.id,
      book: book._id,
      type: "rent",
      amount: book.rentPrice,
      borrowDate: new Date(),
      dueDate: due,
      returnCode,
    });

    res.json({
      message: "Book rented successfully",
      returnCode,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/borrow/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(404).json({
        message: "Book not found",
      });

    if (book.status !== "available") {
      return res.status(400).json({
        message: "Book is not available",
      });
    }

    const due = new Date();
    due.setDate(due.getDate() + 15);

    book.status = "borrowed";
    book.owner = req.user.id;
    book.action = "borrow";

    await book.save();

    const returnCode = generateReturnCode();

    await Transaction.create({
      user: req.user.id,
      book: book._id,
      type: "borrow",
      borrowDate: new Date(),
      dueDate: due,
      returnCode,
    });

    res.json({
      message: "Book borrowed successfully",
      returnCode,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/mybooks", authMiddleware, async (req, res) => {
  try {
    const books = await Transaction.find({
      user: req.user.id,
      returned: false,
    })
      .populate("book")
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
  try {

    const history = await Transaction.find({
      user: req.user.id,
    })
      .populate("book")
      .sort({ createdAt: -1 });

    res.json(history);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});

router.post("/return/:id", authMiddleware, async (req, res) => {
  try {
    const { code } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const transaction = await Transaction.findOne({
      book: book._id,
      user: req.user.id,
      returned: false,
      returnCode: code,
    });

    if (!transaction) {
      return res.status(400).json({
        message: "Invalid Return Code",
      });
    }

    transaction.returned = true;
    await transaction.save();

    book.status = "available";
    book.owner = null;
    book.action = null;

    await book.save();

    res.json({
      message: "Book Returned Successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
