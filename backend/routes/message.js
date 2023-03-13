const express = require("express")
const router = express.Router()
const { getMessagesByTicketNumber, sendMessage, getMessage, getMessagesByEmails, getChatsByEmail, getMessagesByGroupId } = require("../controller/messageController")

router.post("/sendmessage", sendMessage);
router.post("/fromticketnumber", getMessagesByTicketNumber)
router.get("/getamessage", getMessage)
router.post("/messagesbyemail", getMessagesByEmails)
router.post("/chatsemail", getChatsByEmail)
router.get("/groupchat/:id", getMessagesByGroupId);

module.exports = router;