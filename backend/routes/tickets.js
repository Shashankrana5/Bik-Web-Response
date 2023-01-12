const express = require("express");
const router = express.Router();
const { findEmailFromTicketNumber, getTicket, createTicket, getAllTickets, deleteTicket, updateTicket, getTicketByAssignedTo } = require("../controller/ticketController")



router.get("/getall", getAllTickets)
router.post('/getassigned', getTicketByAssignedTo)
router.post("/ticketfromticketnumber", findEmailFromTicketNumber)

router.get("/:id", getTicket);
router.post("/", createTicket)
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;