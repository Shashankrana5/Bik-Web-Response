const express = require("express");
const { getUser, createUser, getAllUsers, signupUser, loginUser, getUserFromParams, getIdFromEmail } = require("../controller/userController");
const { SearchUsers, genericUserSearch } = require("../controller/SearchUserController");
const router = express.Router();


router.get("/getall", getAllUsers)
router.post("/getuser", getUserFromParams)
router.post("/search", SearchUsers)
router.get("/searchquery/:searchparam", genericUserSearch)
router.get("/fetchid/:email", getIdFromEmail);
router.get("/:id", getUser)

router.post("/", createUser)

router.post("/login", loginUser);
router.post("/signup", signupUser)

module.exports = router;