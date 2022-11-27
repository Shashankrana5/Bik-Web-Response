const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  const { senderId, receiverId, groupId, content } = req.body;

  if (groupId) {
    const response = await Message.create({ senderId, receiverId, content });
    return res.status(200).json(response);
  } else if (receiverId) {
    const response = await Message.create({ senderId, receiverId, content });
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ error: "Input provided are invalid" });
  }
};

const getMessage = async (req, res) => {
  const { messageId } = req.body;

  try {
    const response = await Message.findById(messageId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  sendMessage,
  getMessage,
};
