import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true للـ 465 بس
  auth: {
    user: "k.abdalrhem@gmail.com",
    pass: "uszegoclukkhxdsx", // ⚠️ خليه في ENV عشان الأمان
  },
});
export { transporter };
