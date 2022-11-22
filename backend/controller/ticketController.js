const Ticket = require("../models/Ticket")


const getTicket = (req, res) => {
    res.status(200).json({message: "Get ticket"})
}

const createTicket = async (req, res) => {

    const {clientName, resolved} = req.body;
    
    
    try{
        const ticket = await Ticket.create({clientName, resolved} )
        res.status(200).json(ticket);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getTicket, 
    createTicket
}