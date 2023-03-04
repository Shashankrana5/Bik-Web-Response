const express = require("express");
const router = express.Router();
const { createGroup, getGroupById } = require("../controller/GroupController");

router.get("/get/:id", getGroupById)
router.post('/', createGroup)


module.exports = router