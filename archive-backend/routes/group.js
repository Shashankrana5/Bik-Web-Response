const express = require("express");
const router = express.Router();
const { createGroup, getGroupById, findGroupchatFromEmail } = require("../controller/GroupController");

router.get("/get/:id", getGroupById)
router.get("/usergroup/:email", findGroupchatFromEmail)
router.post('/', createGroup)


module.exports = router