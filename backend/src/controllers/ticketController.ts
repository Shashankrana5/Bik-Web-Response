import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import User from "../models/User";

export async function createTicket(req: Request, res: Response){

    const {clientName, email, subject, category, initialRequest, resolved, assignedTo} = req.body;
    const client = await User.findOne({email});
    
    const ticketNumber = "TKN-" + Math.random().toString(16).slice(2);
    
    try{
        // const ticket = await Ticket.create({ticketNumber, clientName, email, subject, category, initialRequest, resolved, assignedTo})
        const ticket = await Ticket.create({ticketNumber, clientName, client, email, subject, category, initialRequest, resolved, assignedTo});
        res.status(200).json(ticket);
    }
    catch(error){

        res.status(400).json({errorMessage: error});
    }
}

export const getTicketByTicketNumber = async(req: Request, res: Response) => {

    const {ticketNumber} = req.params;
    try{
        const ticket = await Ticket.find({ticketNumber});
        return res.status(200).json(ticket);
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