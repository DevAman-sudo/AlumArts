require('dotenv').config();
const express = require("express");
const { appendFileSync } = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const router = express();
router.set("views", path.join(__dirname, "../../templates/views"));

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
});

// index route ...
router.get("/", (req, res) => {
  res.status(200).render("index");
});

// post request
router.post("/", async (req, res) => {
  let mailOptions = {
    from: "alumarts.work@gmail.com",
    to: "alumarts.work@gmail.com",
    subject: req.body.name,
    text: `${req.body.number} => ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.render('index', {message: "Something Went Wrong"});
    } else {
      res.render('index', {message: "Email sent successfully"});
    }
  });
});

module.exports = router;
