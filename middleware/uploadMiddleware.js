const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "research_papers",
    resource_type: "raw", // the only type that works consistently across free Cloudinary accounts for un-transformed storage
    public_id: (req, file) => {
      const sanitized = file.originalname.split(".")[0].replace(/[^a-zA-Z0-9]/g, "_");
      return `${Date.now()}-${sanitized}.pdf`;
    },
  },
});

const upload = multer({ storage });

module.exports = upload;
