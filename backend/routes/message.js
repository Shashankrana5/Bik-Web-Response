const express = require("express")
const router = express.Router()
const { sendMessage, getMessage, getMessagesByEmails } = require("../controller/messageController")

router.post("/sendmessage", sendMessage);
router.get("/getamessage", getMessage)
router.get("/messagesbyemail", getMessagesByEmails)

module.exports = router;