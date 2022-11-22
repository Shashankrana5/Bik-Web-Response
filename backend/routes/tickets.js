const express = require("express");
const router = express.Router();
const { getTicket } = require("../controller/ticketController")

// router.get("/", (req, res) => {
//     res.json({mesg: "Get ticket"});
// }) instead of this, we can also do:

router.get('/', getTicket);

router.post("/", (req, res) => {

    // console.log(req.body)
    if (!req.body){
        res.status(400)
        throw new Error("Please add a text field");
    }
    
    res.json({mesg: "Adding ticket"});
})

router.put("/:id", (req, res) => {
    res.json({mesg: `Update ticket ${req.params.id}`});
})

router.delete("/", (req, res) => {
    res.json({mesg: `Delete ticket ${req.params.id}`});
}) 

module.exports = router;
