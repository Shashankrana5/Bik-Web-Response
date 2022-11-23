const express = require("express");
const router = express.Router();
const { getTicket, createTicket, getAllTickets, deleteTicket, updateTicket } = require("../controller/ticketController")



router.get("/getall", getAllTickets)
router.get("/:id", getTicket);

router.post("/", createTicket)
router.put("/:id", updateTicket);

// router.put("/:id", (req, res) => {
//     res.json({mesg: `Update ticket ${req.params.id}`});
// })

router.delete("/:id", deleteTicket);

// router.delete("/", (req, res) => {
//     res.json({mesg: `Delete ticket ${req.params.id}`});
// }) 

module.exports = router;
