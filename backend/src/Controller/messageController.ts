import { Request, Response } from "express";
import Message from "../model/Message";
import User from "../model/User";
import Group from "../model/Group";
import {
  ChatResponse,
  GroupType,
  UserType,
} from "../utils/ChatType/ChatType";

export async function sendMessage(req: Request, res: Response) {

  const { selectedChat, currentUser, content } = req.body;

  try{
  const senderUser = await User.findById(currentUser._id);

  if(!senderUser){
    throw Error("Invalid user");
  }

  if (selectedChat.chatType === "Group"){
    const message = await Message.create({groupId: selectedChat.selected._id, messageType: "group", senderName: senderUser.fullName, senderEmail: senderUser.email, content});
    return res.status(200).json(message)
  }
  else if (selectedChat.chatType === "Personal"){

    const message = await Message.create({senderName: senderUser?.fullName, senderEmail: currentUser.email, receiverEmail: selectedChat.selected.email, receiverName: selectedChat.selected.fullName,  messageType: "personal", content});
    return res.status(200).json(message);

  }
  else {
    throw Error("Invalid message type");
  }
  }catch(error){
    
    //@ts-ignore
    return res.status(400).json({errorMessage: error.message})
  }
}

export async function getChatsByEmail(req: Request, res: Response) {
  const { email } = req.params;
  try {
    const response = await Message.find({
      $or: [{ senderEmail: email }, { receiverEmail: email }],
    }).sort({ updatedAt: -1 });
    const groupMember = await Group.find({ "users.email": email });

    const chats: ChatResponse = { Personal: [], Group: [], User: {} };
    const personalChatSet = new Set();
    const groupChatSet = new Set();

    for (const message in response) {
      if (
        response[message]["messageType"] === "group" &&
        !groupChatSet.has(response[message]["groupId"])
      ) {
        groupChatSet.add(response[message]["groupId"]);
        const group: GroupType | null = await Group.findById(
          response[message]["groupId"]
        );

        if (group) {
          chats.Group.push(group);
        }
      } else if (response[message]["messageType"] === "personal") {
        if (
          email !== response[message]["receiverEmail"] &&
          !personalChatSet.has(response[message]["receiverEmail"])
        ) {
          personalChatSet.add(response[message]["receiverEmail"]);
          const userChatted: UserType | null = await User.findOne({
            email: response[message]["receiverEmail"],
          });
          if (userChatted) chats.Personal.push(userChatted);
        } else if (
          email !== response[message]["senderEmail"] &&
          !personalChatSet.has(response[message]["senderEmail"])
        ) {
          personalChatSet.add(response[message]["senderEmail"]);
          const userChatted: UserType | null = await User.findOne({
            email: response[message]["senderEmail"],
          });
          if (userChatted) chats.Personal.push(userChatted);
        }
      }
    }

    for(const group in groupMember) {
      console.log((groupMember[group]._id).toString())
      if(!groupChatSet.has(groupMember[group]._id.toString())){
        groupChatSet.add((groupMember[group]._id).toString());
        chats.Group.push(groupMember[group]);
      }

    }
    console.log(groupChatSet)



    const currentUser: UserType | null = await User.findOne({ email });
    if (currentUser) chats.User = currentUser;

    return res.status(200).json(chats);
  } catch (err) {
    //@ts-ignore
    return res.status(400).json({ message: err.message });
  }
}

export const getMessagesByEmails = async (req: Request, res: Response) => {
  const { senderEmail, receiverEmail } = req.params;

  try {
    const response = await Message.find({
      $or: [
        { senderEmail: senderEmail, receiverEmail: receiverEmail },
        { senderEmail: receiverEmail, receiverEmail: senderEmail },
      ],
    }).sort({ updatedAt: 1 });
    return res.status(200).json(response);
  } catch (error) {
    //@ts-ignore
    return res.status(400).json({ error: error.message });
  }
};

export async function getGroupMessage (req: Request, res: Response){

  const { email, _id} = req.params;

  try {
    const messagesResult = await Message.find({groupId: _id}).sort({updatedAt: 1});
    const group:GroupType | null = await Group.findById(_id);
    const messages = new Array();

    for(const message in messagesResult){
      messages.push(messagesResult[message]);
    }

    for( const user of group?.users!){
     if (user.email === email)
        return res.status(200).json(messages);
      
    }

    throw Error("Invalid group or user not a member of the group.")

  }catch(error){
    //@ts-ignore
    return res.status(400).json({error: error.message});
  }

}