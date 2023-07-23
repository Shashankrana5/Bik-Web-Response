import { Request, Response } from "express";
import Message from "../models/Message";
import User from "../models/User";
import Group from "../models/Group";
import { ChatResponse, GroupType } from "../utils/ChatType/ChatType";

export async function sendMessage(req: Request, res: Response) {
  const { selectedChat, currentUser, content } = req.body;

  try {
    const senderUser = await User.findById(currentUser._id);

    if (!senderUser) {
      throw Error("Invalid user");
    }

    if (selectedChat.chatType === "Group") {
      const message = await Message.create({
        groupId: selectedChat.selected._id,
        messageType: "group",
        senderName: senderUser.fullName,
        senderEmail: senderUser.email,
        content,
      });

      await Group.findOneAndUpdate({ _id: selectedChat.selected._id },
        { $push: { messages: message } }
      )

      return res.status(200).json(message);
    } else if (selectedChat.chatType === "Personal") {
      const message = await Message.create({
        senderName: senderUser?.fullName,
        senderEmail: currentUser.email,
        receiverEmail: selectedChat.selected.email,
        receiverName: selectedChat.selected.fullName,
        messageType: "personal",
        content,
      });
      return res.status(200).json(message);
    } else {
      throw Error("Invalid message type");
    }
  } catch (error) {

    return res.status(400).json({ errorMessage: error });
  }
}

export async function getChatsByEmail(req: Request, res: Response) {
  const { email } = req.params;

  try {

    const personalChatSet = new Set();

    const personalResponse = await Message.find({
      messageType: "personal",
      $or: [{ senderEmail: email }, { receiverEmail: email }]
    }).sort({ updatedAt: -1 });
    const groupResponse = await Group.find({ "users.email": email }).sort({ updatedAt: -1 });
    const chats: ChatResponse = { Personal: [], Group: [], AllChats: [], User: {} };

    for (const personalMessage of personalResponse) {
      if (email !== personalMessage["receiverEmail"] && !personalChatSet.has(personalMessage["receiverEmail"])) {
        personalChatSet.add(personalMessage["receiverEmail"]);
        const user = await User.findOne({ email: personalMessage["receiverEmail"] });
        chats.Personal.push(user!);
      }
      else if (email !== personalMessage["senderEmail"] && !personalChatSet.has(personalMessage["senderEmail"])) {
        personalChatSet.add(personalMessage["senderEmail"]);
        const user = await User.findOne({ email: personalMessage["senderEmail"] });
        chats.Personal.push(user!);
      }

    }
    chats.Group = groupResponse;

    const currentUser = await User.findOne({ email });
    if (currentUser)
      chats.User = currentUser;

    let ptr1 = 0;
    let ptr2 = 0;
    let allChats = new Array();
    const allChatPersonal = new Set();

    while (ptr1 < personalResponse.length && ptr2 < groupResponse.length) {
      //@ts-ignore
      if (personalResponse[ptr1].updatedAt > groupResponse[ptr2].updatedAt) {

        if (email !== personalResponse[ptr1]["receiverEmail"] && !allChatPersonal.has(personalResponse[ptr1]["receiverEmail"])) {
          allChatPersonal.add(personalResponse[ptr1]["receiverEmail"]);
          const user = await User.findOne({ email: personalResponse[ptr1]["receiverEmail"] });
          allChats.push(user!);
        }
        else if (email !== personalResponse[ptr1]["senderEmail"] && !allChatPersonal.has(personalResponse[ptr1]["senderEmail"])) {
          allChatPersonal.add(personalResponse[ptr1]["senderEmail"]);
          const user = await User.findOne({ email: personalResponse[ptr1]["senderEmail"] });
          allChats.push(user!);
        }

        ptr1++;
      } else {
        allChats.push(groupResponse[ptr2])
        ptr2++;
      }
    }

    while (ptr1 < personalResponse.length) {
      if (email !== personalResponse[ptr1]["receiverEmail"] && !allChatPersonal.has(personalResponse[ptr1]["receiverEmail"])) {
        allChatPersonal.add(personalResponse[ptr1]["receiverEmail"]);
        const user = await User.findOne({ email: personalResponse[ptr1]["receiverEmail"] });
        allChats.push(user!);
      }
      else if (email !== personalResponse[ptr1]["senderEmail"] && !allChatPersonal.has(personalResponse[ptr1]["senderEmail"])) {
        allChatPersonal.add(personalResponse[ptr1]["senderEmail"]);
        const user = await User.findOne({ email: personalResponse[ptr1]["senderEmail"] });
        allChats.push(user!);
      }

      ptr1++;
    }

    while (ptr2 < groupResponse.length) {
      allChats.push(groupResponse[ptr2])
      ptr2++;
    }

    chats.AllChats = allChats

    return res.status(200).json(chats)
  } catch (error) {
    return res.status(400).json({ errroMessage: error });
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

    return res.status(400).json({ error: error });
  }
};

export async function getGroupMessage(req: Request, res: Response) {
  const { email, _id } = req.params;

  try {
    const messagesResult = await Message.find({ groupId: _id }).sort({
      updatedAt: 1,
    });
    const group: GroupType | null = await Group.findById(_id);
    const messages = new Array();

    for (const message in messagesResult) {
      messages.push(messagesResult[message]);
    }

    for (const user of group?.users!) {
      if (user.email === email) return res.status(200).json(messages);
    }

    throw Error("Invalid group or user not a member of the group.");
  } catch (error) {
    return res.status(400).json({ error: error });
  }
}

export const getMessageByTicketNumber = async(req: Request, res: Response) => {

    const { ticketNumber } = req.params;

    try {
      const response = await Message.find({ticketNumber}).sort({createdAt: 1});
      
      return res.status(200).json(response);
    }catch(error){
        return res.status(400).json({errorMessage: error});
    }
}