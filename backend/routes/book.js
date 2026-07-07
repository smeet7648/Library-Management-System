const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    // Only admin can add books
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const book = await Book.create(req.body);

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({
      createdAt: -1,
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(book);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.json({
      message: "Book Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;