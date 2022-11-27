const express = require("express")
const router = express.Router()
const { sendMessage, getMessage } = require("../controller/messageController")

router.post("/sendmessage", sendMessage);
router.get("/getamessage", getMessage)

module.exports = router;