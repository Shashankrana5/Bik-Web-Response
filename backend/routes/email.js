const express = require("express");
const router = express.Router();
const { getAllEmails, createEmail, getEmailFromTicketNumber } = require("../controller/emailController")


router.get("/getall", getAllEmails)
router.post("/", createEmail)


router.get("/:ticketNumber", getEmailFromTicketNumber)
module.exports = router