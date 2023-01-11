const Ticket = require("../models/Ticket")


const getTicket = (req, res) => {

    const {id} = req.params;
    const ticket = Ticket.findById(id)
        .then((e) => {
            return res.status(200).json(e);
        })
        .catch(error => {
            return res.status(400).json({error: error.message});
        })
}

const getAllTickets = async (req, res) => {

    try{

    const tickets = await Ticket.find({}).sort({createAt: -1})

    return res.status(200).json(tickets);
    }
    catch(error){
    return res.status(400).json({error: error.message})
    }

}

const createTicket = async (req, res) => {

    const {clientName, email, subject, category, body, resolved, assignedTo} = req.body;
    
    const ticketNumber = "TKN" + (new Date()).getTime();
    try{
        const ticket = await Ticket.create({ticketNumber, clientName, email, subject, category, body, resolved, assignedTo})
        res.status(200).json(ticket);
    }
    catch(error){

        res.status(400).json({error: error.message});
    }
}

const deleteTicket = async (req, res) => {
    const { id } = req.params;

    console.log(id)
    try{
    const ticket = await Ticket.findOneAndDelete({_id: id})
        res.status(200).json(ticket)
    }
    catch(error) { 
        res.status(400).json({message: error.message})
    }

}

const updateTicket = async(req, res) => {

    const {id} = req.params;
    console.log(req.params);
    try{
    const ticket = await Ticket.findOneAndUpdate({_id: id}, {...req.body})
    res.status(200).json(ticket)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}


module.exports = {
    getTicket, 
    createTicket,
    getAllTickets,
    deleteTicket,
    updateTicket
}