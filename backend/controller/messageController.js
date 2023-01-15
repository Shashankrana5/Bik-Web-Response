const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  const { senderEmail, receiverEmail, messageType, ticketNumber, groupId, content } = req.body;

  
  if (groupId) {
    const response = await Message.create({ senderEmail, messageType, groupId, content });
    return res.status(200).json(response);
  } else if (ticketNumber) {
    const response = await Message.create({ ticketNumber, senderEmail, content, messageType});
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ error: "Input provided are invalid" });
    // return res.status(400).json({error: error.message})
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

const getMessagesByEmails = async (req, res) => {

    const { senderEmail, receiverEmail } = req.body;

    try{
      const response = await Message.find({$or:[{senderEmail: senderEmail, receiverEmail: receiverEmail}, {senderEmail: receiverEmail, receiverEmail: senderEmail}]}).sort({createdAt: -1});
      return res.status(200).json(response);
    } 
    catch(error){
      return res.status(400).json({error: error.message})
    }
}

const getChatsByEmail = async(req, res) =>{

    const { email } = req.body;
    try{
      const response = await Message.find({$or:[{senderEmail: email}, {receiverEmail: email}]})
      const users = new Set();
      const chats = new Object();
      for (const i in response){
        chats[response[i]["senderEmail"]] = email;
        chats[response[i]["receiverEmail"]] = email;

        // users.add(response[i]["senderEmail"])
        // users.add(response[i]["receiverEmail"])
      }
      
      return res.status(200).json({chats})
      // res.setHeader('Content-Type', 'application/json');
      // res.end(JSON.stringify(chats));
    }
    catch(err){
      return res.status(400).json({message: err.message})
    }
}
    const getMessagesByTicketNumber = async(req, res) => {

      const { ticketNumber } = req.body;

      try{
        const response = await Message.find({ticketNumber});
        return res.status(200).json(response);
        
      }catch(error){
        return res.status(400).json({message: error.message})
      }
    }
module.exports = {
  sendMessage,
  getMessage,
  getMessagesByEmails,
  getChatsByEmail,
  getMessagesByTicketNumber
};
