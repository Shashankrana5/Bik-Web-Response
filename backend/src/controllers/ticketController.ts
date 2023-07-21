import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import User from "../models/User";
import Message from "../models/Message";

export async function createTicket(req: Request, res: Response){

    const {clientName, email, subject, category, initialRequest, status, assignedTo} = req.body;
    const client = await User.findOne({email});
    
    const ticketNumber = "TKN-" + Math.random().toString(16).slice(2);
    
    try{ 
        const ticket = await Ticket.create({ticketNumber, clientName, client, email, subject, category, initialRequest, status, assignedTo});
        res.status(200).json(ticket);
    }
    catch(error){

        res.status(400).json({errorMessage: error});
    }
}

export const getTicketByTicketNumber = async(req: Request, res: Response) => {

    const {ticketnumber} = req.params;

    try{
        const ticket = await Ticket.findOne({ticketNumber: ticketnumber});
        const user = await User.findOne({_id: ticket?.client})

        return res.status(200).json({ticket, client: user});
    }
    catch(error){
        return res.status(500).json({errorMessage: error})
    }
}

export const getTicketByAssignedTo = async (req: Request, res: Response) => {

    const { assignedTo } = req.body;

    try{
        const tickets = await Ticket.find({assignedTo});
        return res.status(200).json(tickets);

    }catch(error){
        return res.status(400).json({errorMessage: error})
    }
}

export const createTicketMessage = async(req: Request, res: Response) => {

    const { currentUser, ticketNumber, invisible, content } = req.body;

    try{
        // const message = await Message.create({})
        return res.status(200).json({senderEmail: currentUser.email, senderName: currentUser.fullName,
            messageType: "ticket", ticketNumber, content, invisible
        })
    }catch(error){
        return res.status(400).json({errorMessage: error});
    }
}