const express = require("express");
const router = express.Router();
const { getAllEmails, createEmail } = require("../controller/emailController")


router.get("/getall", getAllEmails)
router.post("/", createEmail)

module.exports = router