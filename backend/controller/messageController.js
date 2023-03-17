const Message = require("../models/Message");
const Group = require("../models/Group")
const User = require("../models/User")


const sendMessage = async (req, res) => {
  const { senderEmail, receiverEmail, messageType, ticketNumber, groupId, content } = req.body;

  if (groupId) {

    const response = await Message.create({ senderEmail, messageType: "group", groupId, content });
    console.log(response)
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

const getMessagesByEmails = async (req, res) => {

    const { senderEmail, receiverEmail } = req.body;

    try{
      const response = await Message.find({$or:[{senderEmail: senderEmail, receiverEmail: receiverEmail}, {senderEmail: receiverEmail, receiverEmail: senderEmail}]}).sort({createdAt: 1});
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


      const chats = new Object();
      chats["group"] = new Object();
      chats["personal"] = new Set;

      for (const messages in response) {

        if (response[messages].messageType == "group" && !(response[messages].groupId in chats["group"])){
          
            const response_group = await Group.find({_id: response[messages].groupId});

            if (response[messages].groupId != undefined){
              chats["group"][response[messages].groupId] = {...response_group}}
            
        
        }
        else{
            if ( response[messages].receiverEmail != undefined){
              const response_user_sender = await User.find({email: response[messages].senderEmail})
              const response_user_receiver = await User.find({email: response[messages].receiverEmail})


            chats["personal"][response[messages].senderEmail] = response_user_sender[0].fullName
            chats["personal"][response[messages].receiverEmail] = response_user_receiver[0].fullName
          }
            
        }
      }
      // for (const messages in response){

      //   if (response[messages].messageType == "group"){
      //     if (!chats["group"].includes(response[messages].groupId))
      //        chats["group"].push(response[messages].groupId)
      //   }
      //   else{
      //     if (!chats["personal"].includes(response[messages].receiverEmail)){
      //     chats["personal"].push(response[messages].receiverEmail)
      //   }
      //   else if (!chats["personal"].includes(response[messages].senderEmail)){
      //     chats["personal"].push(response[messages].senderEmail)

      //   } 

      //   }
      // }
      // console.log(chats)
      return res.status(200).json(chats)
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

const getMessagesByGroupId = async (req, res) => {

  const { id } = req.params;

  try {
    const response = await Message.find({groupId: id});
    return res.status(200).json(response)
  }catch(error){
    return res.status(400).json({message: error.message})
  }
}


module.exports = {
  sendMessage,
  getMessage,
  getMessagesByEmails,
  getChatsByEmail,
  getMessagesByTicketNumber,
  getMessagesByGroupId
};
