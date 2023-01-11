const nodemailer = require("nodemailer")
const Email = require("../models/Email");

const getAllEmails = async(req, res) => {

    try{
        const emails = await Email.find({}).sort({createAt:-1})
        return res.status(200).json(emails)
    }
    catch(error){
        return res.status(400).json({error: error.messages})
    }
}

// const 

const createEmail = async(req, res) => {

    const {senderEmail, receiverEmail, ticketNumber, subject, body} = req.body

    try{
        const email = await Email.create({senderEmail, receiverEmail, ticketNumber, subject, body})
        try{
            const sentEmail = await sendEmail(receiverEmail, subject, body);
        }catch(error){
            return res.status(500).json({error: error.messages});
        }
        return res.status(200).json(email)
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

// const createEmail = async(senderEmail, receiverEmail, ticketNumber, subject, body)=> {

//     try{
//         const email = await Email.create({senderEmail, receiverEmail, ticketNumber, subject, body});
//         return json(email)
//     }catch(error){
//         return {error: error.message}
//     }
// }

async function sendEmail(receiverEmail, subject, body){
    const email = process.env.EMAIL;
    const passwrd = process.env.PASS;


    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: passwrd
            }
        })
        const mail_configs= {
            from: email,
            to: receiverEmail,
            subject: subject,
            text: body
        }
        transporter.sendMail(mail_configs, function(error, info){
            if (error){
                return reject({message: `An error has occured!!`})
            }
            return resolve({message: "email sent successfully"})
        });
    })
}


module.exports = {
    getAllEmails,
    createEmail

}