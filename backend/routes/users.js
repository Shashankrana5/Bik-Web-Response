const express = require("express");
const { getUser, createUser, getAllUsers, signupUser, loginUser, getUserFromParams } = require("../controller/userController");
const { SearchUsers } = require("../controller/SearchUserController");
const router = express.Router();


router.get("/getall", getAllUsers)
router.post("/getuser", getUserFromParams)
router.post("/search", SearchUsers)
router.get("/:id", getUser)

router.post("/", createUser)

router.post("/login", loginUser);
router.post("/signup", signupUser)

module.exports = router;