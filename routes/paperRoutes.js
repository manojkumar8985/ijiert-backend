const express = require("express");
const router = express.Router();
const Paper = require("../models/paper");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add Paper with PDF upload
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const { title, authors, area, paperId, pages, abstract, journalName, volume, issue, publicationDate } = req.body;
    const pdfUrl = req.file ? req.file.path : "";
    
    const paper = new Paper({
      title,
      authors,
      area,
      paperId,
      pages,
      abstract,
      journalName,
      volume,
      issue,
      publicationDate,
      pdf: pdfUrl,
    });
    
    await paper.save();
    res.status(201).json(paper);
  } catch (error) {
    console.error("Error saving paper:", error);
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

// Get Single Paper by ID
router.get("/:id", async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ error: "Paper not found" });
    }
    res.json(paper);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch paper" });
  }
});

// Delete Paper
router.delete("/:id", async (req, res) => {
  try {
    const paper = await Paper.findByIdAndDelete(req.params.id);
    if (!paper) {
      return res.status(404).json({ error: "Paper not found" });
    }
    res.json({ message: "Paper deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete paper" });
  }
});

module.exports = router;
