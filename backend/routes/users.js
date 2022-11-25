const express = require("express");
const { getUser, createUser, getAllUsers, signupUser, loginUser } = require("../controller/userController");
const router = express.Router();

router.get("/getall", getAllUsers)
router.get("/:id", getUser)
router.post("/", createUser)

router.post("/login", loginUser);
router.post("/signup", signupUser)

module.exports = router;