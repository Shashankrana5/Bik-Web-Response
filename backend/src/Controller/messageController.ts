import { Request, Response } from "express";
const Message = require("../model/Message");
const User = require("../model/User");
const Group = require("../model/Group");

export async function sendMessage(req:Request, res:Response){
    const { senderEmail, receiverEmail, messageType, ticketNumber, groupId, content } = req.body;
  
    if (groupId) {
      const senderUser = await User.findOne({email: senderEmail});
      const response = await Message.create({ senderName: senderUser.fullName, senderEmail, messageType: "group", groupId, content });
  
      return res.status(200).json(response);
  
    } else if (ticketNumber) {
  
      const response = await Message.create({ ticketNumber, senderEmail, content, messageType});
      return res.status(200).json(response);
    } 
    else if (messageType == "personal"){
  
      const senderUser = await User.findOne({email: senderEmail});
      const receiverUser = await User.findOne({email: receiverEmail})
      const response = await Message.create({receiverName: receiverUser.fullName, senderName: senderUser.fullName, senderEmail, receiverEmail, messageType, content})
      
      return res.status(200).json(response);
    }
    else {
      return res.status(400).json({ errorMessage: "Input provided are invalid" });
    }
  };

export async function getChatsByEmail (req:Request, res:Response) {

    const { email } = req.params;
    try{
      const response = await Message.find({$or:[{senderEmail: email}, {receiverEmail: email}]})
      const groupMember = await Group.find({"users.email": email})

      const chats = new Object();
      //@ts-ignore
      chats["group"] = new Object();
      //@ts-ignore

      chats["personal"] = new Set;

      for (const messages in response) {
      //@ts-ignore

        if (response[messages].messageType == "group" && !(response[messages].groupId in chats["group"])){
          
            const response_group = await Group.find({_id: response[messages].groupId});

            if (response[messages].groupId != undefined){
      //@ts-ignore
      chats["group"][response[messages].groupId] = {...response_group}}
            
        }
        else{
            if ( response[messages].receiverEmail != undefined){
              const response_user_sender = await User.find({email: response[messages].senderEmail})
              const response_user_receiver = await User.find({email: response[messages].receiverEmail})


      //@ts-ignore
      chats["personal"][response[messages].senderEmail] = response_user_sender[0].fullName
      //@ts-ignore
      chats["personal"][response[messages].receiverEmail] = response_user_receiver[0].fullName
          }
            
        }
      }

      for (const groups in groupMember){
      //@ts-ignore

        if (!(groupMember[groups]._id in chats["group"])){
      //@ts-ignore
      chats["group"][groupMember[groups]._id] = {0: groupMember[groups]};
        }
      }
      return res.status(200).json(chats)
      
    }
    catch(err){
      //@ts-ignore
      return res.status(400).json({message: err.message})
    }
}


export const getMessagesByEmails = async (req:Request, res:Response) => {

  const { senderEmail, receiverEmail } = req.body;

  try{
    const response = await Message.find({$or:[{senderEmail: senderEmail, receiverEmail: receiverEmail}, {senderEmail: receiverEmail, receiverEmail: senderEmail}]}).sort({createdAt: 1});
    return res.status(200).json(response);
  } 
  catch(error){
    //@ts-ignore
    return res.status(400).json({error: error.message})
  }
}