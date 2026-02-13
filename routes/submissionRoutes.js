const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const sendSubmissionEmail = require("../sendSubmissionEmail");

const router = express.Router();

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'PDF file is required (form field name must be "pdf")',
      });
    }

    const { authors, email, title, abstract } = req.body || {};
    if (!authors || !email || !title || !abstract) {
      return res.status(400).json({
        message: "authors, email, title, and abstract are required",
      });
    }

    await sendSubmissionEmail(req.body, req.file.path);

    res.status(200).json({ message: "Submission sent successfully" });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({
      message: error?.message || "Failed to send submission",
    });
  }
});

module.exports = router;
