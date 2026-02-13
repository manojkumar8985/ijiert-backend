const express = require("express");
const router = express.Router();
const Paper = require("../models/paper");

// Add Paper
router.post("/", async (req, res) => {
  try {
    const paper = new Paper(req.body);
    await paper.save();
    res.status(201).json(paper);
  } catch (error) {
    res.status(500).json({ error: "Failed to save paper" });
  }
});

// Get All Papers
router.get("/", async (req, res) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch papers" });
  }
});

module.exports = router;
