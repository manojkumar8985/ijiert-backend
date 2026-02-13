const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const transporter = require("./mail");

const paperRoutes = require("./routes/paperRoutes");
const submissionRoutes = require("./routes/submissionRoutes");




dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/papers", paperRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/submissions", submissionRoutes);

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
