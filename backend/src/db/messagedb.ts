import Message from "../models/Message";
import User from "../models/User";

export async function getPersonalChats(email: string) {
  try {
    const personalChatSet = new Set();

    const personalResponse = await Message.find({
      messageType: "personal",
      $or: [{ senderEmail: email }, { receiverEmail: email }],
    }).sort({ updatedAt: -1 });

    for (const personalMessage of personalResponse) {
      if (
        email !== personalMessage["receiverEmail"] &&
        !personalChatSet.has(personalMessage["receiverEmail"])
      ) {
        personalChatSet.add(personalMessage["receiverEmail"]);
      } else if (
        email !== personalMessage["senderEmail"] &&
        !personalChatSet.has(personalMessage["senderEmail"])
      ) {
        personalChatSet.add(personalMessage["senderEmail"]);
      }
    }

    return personalChatSet;
  } catch (error) {
    throw new Error("getPersonalChats caused an error " + error);
  }
}
