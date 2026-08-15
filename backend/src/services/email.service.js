const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS on 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendMail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    // Email failures should never crash the request that triggered them
    // (e.g. signup should still succeed even if the verification email
    // temporarily fails to send) - we log and let the caller decide.
    logger.error(`Failed to send email to ${to}: ${err.message}`);
    throw err;
  }
}

function sendVerificationEmail(to, rawToken) {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${rawToken}`;
  return sendMail({
    to,
    subject: 'Verify your CollabSphere email',
    html: `
      <p>Welcome to CollabSphere!</p>
      <p>Click the link below to verify your email address. This link expires in 24 hours.</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
    `,
  });
}

function sendPasswordResetEmail(to, rawToken) {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;
  return sendMail({
    to,
    subject: 'Reset your CollabSphere password',
    html: `
      <p>We received a request to reset your password.</p>
      <p>This link expires in 15 minutes. If you did not request this, ignore this email.</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
    `,
  });
}

module.exports = { sendMail, sendVerificationEmail, sendPasswordResetEmail };
