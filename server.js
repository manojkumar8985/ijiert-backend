const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const transporter = require("./mail");

const paperRoutes = require("./routes/paperRoutes");
const submissionRoutes = require("./routes/submissionRoutes");




// dotenv.config(); // Moved to top
connectDB();

const app = express();

app.use(cors({
  origin: ["https://ijiert.com", "https://www.ijiert.com", "http://localhost:5000", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/api/papers", paperRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/submissions", submissionRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get("/send", async (req, res) => {
  try {
    await transporter.sendMail({
      from: '"Manoj App" <test@example.com>',
      to: "your_email@gmail.com",
      subject: "Test Email",
      text: "Hello Manoj! Your email is working 🚀"
    });

    res.send("Email sent successfully!");
  } catch (error) {
    console.log(error);
    res.send("Error sending email");
  }
});
