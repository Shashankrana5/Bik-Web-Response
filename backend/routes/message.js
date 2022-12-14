const express = require("express")
const router = express.Router()
const { sendMessage, getMessage, getMessagesByEmails, getChatsByEmail } = require("../controller/messageController")

router.post("/sendmessage", sendMessage);
router.get("/getamessage", getMessage)
router.post("/messagesbyemail", getMessagesByEmails)
router.post("/chatsemail", getChatsByEmail)

module.exports = router;