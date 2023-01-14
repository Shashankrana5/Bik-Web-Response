const express = require("express")
const router = express.Router()
const { getMessagesByTicketNumber, sendMessage, getMessage, getMessagesByEmails, getChatsByEmail } = require("../controller/messageController")

router.post("/sendmessage", sendMessage);
router.post("/fromticketnumber", getMessagesByTicketNumber)
router.get("/getamessage", getMessage)
router.post("/messagesbyemail", getMessagesByEmails)
router.post("/chatsemail", getChatsByEmail)

module.exports = router;