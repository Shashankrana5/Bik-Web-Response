const express = require("express");
const { getUser, createUser, getAllUsers } = require("../controller/userController");
const router = express.Router();


router.get("/getall", getAllUsers)
router.get("/:id", getUser)
router.post("/", createUser)

module.exports = router;