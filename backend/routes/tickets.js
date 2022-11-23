const express = require("express");
const router = express.Router();
const { getTicket, createTicket, getAllTickets, deleteTicket, updateTicket } = require("../controller/ticketController")



router.get("/getall", getAllTickets)
router.get("/:id", getTicket);
router.post("/", createTicket)
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;