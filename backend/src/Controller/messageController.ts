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
  const {
    senderEmail,
    receiverEmail,
    messageType,
    ticketNumber,
    groupId,
    content,
  } = req.body;

  if (groupId) {
    const senderUser = await User.findOne({ email: senderEmail });
    //@ts-ignore
    const response = await Message.create({senderName: senderUser.fullName,senderEmail,messageType: "group",groupId,content,
    });

    return res.status(200).json(response);
  } else if (ticketNumber) {
    const response = await Message.create({
      ticketNumber,
      senderEmail,
      content,
      messageType,
    });
    return res.status(200).json(response);
  } else if (messageType == "personal") {
    const senderUser = await User.findOne({ email: senderEmail });
    const receiverUser = await User.findOne({ email: receiverEmail });
    //@ts-ignore
    const response = await Message.create({receiverName: receiverUser.fullName,senderName: senderUser.fullName,senderEmail,receiverEmail,messageType,content,
    });

    return res.status(200).json(response);
  } else {
    return res.status(400).json({ errorMessage: "Input provided are invalid" });
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
    }).sort({ updatedAt: -1 });
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
    const group = await Group.findById(_id);
    const messages = new Array();

    for(const message in messagesResult){
      messages.push(messagesResult[message]);
    }

    for(const user in group?.users){
      if (group?.users[user].email === email)
        return res.status(200).json(messages);
    }
    throw Error("Invalid group or user not a member of the group.")

  }catch(error){
    //@ts-ignore
    return res.status(400).json({error: error.message});
  }

}