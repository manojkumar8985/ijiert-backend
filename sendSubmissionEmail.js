const nodemailer = require("nodemailer");

const sendSubmissionEmail = async (data, filePath) => {
  if (!process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASS) {
    throw new Error("Mailtrap is not configured properly.");
  }

  const toEmail = (process.env.ADMIN_EMAIL || "").trim() || (data?.email || "").trim();
  if (!toEmail) {
    throw new Error(
      'No recipient defined. Set ADMIN_EMAIL in backend/.env (or provide a valid "email" in the form).'
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Research Portal" <no-reply@research.com>',
    to: toEmail,
    replyTo: (data?.email || "").trim() || undefined,
    subject: "New Research Paper Submission",
    html: `
      <h2>New Research Paper Submitted</h2>
      <p><strong>Author:</strong> ${data.authors}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Title:</strong> ${data.title}</p>
      <p><strong>Abstract:</strong> ${data.abstract}</p>
    `,
    attachments: [
      {
        filename: "paper.pdf",
        path: filePath,
      },
    ],
  });
};

module.exports = sendSubmissionEmail;
