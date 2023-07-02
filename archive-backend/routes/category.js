"use strict";
const express = require("express");
const router = express.Router();
const { getCategories, addCategory } = require("../controller/categoryController");
router.get("/getall", getCategories);
router.post("/craetecategory", addCategory);
module.exports = router;
