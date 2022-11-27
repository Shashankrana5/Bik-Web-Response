const express = require("express")
const router = express.Router()
const { sendMessage, getMessage, getMessagesByEmails, getChatsByEmail } = require("../controller/messageController")

router.post("/sendmessage", sendMessage);
router.get("/getamessage", getMessage)
router.get("/messagesbyemail", getMessagesByEmails)
router.get("/chatsemail", getChatsByEmail)

module.exports = router;