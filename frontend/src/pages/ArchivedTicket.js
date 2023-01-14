import { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import AssignedTicketDetails from "../components/AssignedTicketDetails";
import useAssignedTicketsContext from "../hooks/useAssignedTicketsContext";
import { useParams } from "react-router-dom";
import useEmailContext from "../hooks/useEmailContext"
import SendEmail from "../components/SendEmail";
import { ClientDetails } from "../components/ClientDetails";

const Ticket = () => {

  const {ticketNumber}  = useParams();
  const {emails, dispatch } = useEmailContext();

  const loggedinUser = localStorage.getItem("user");
  const senderEmail = JSON.parse(loggedinUser).email;
  const [receiverEmail, setReceiverEmail ] = useState("")
  const [subject, setSubject] = useState("")

  useEffect(() => {
    const fetchEmail = async (ticketNumber) => {
    const response = await fetch("/api/ticketfromticketnumber", {
      method: "POST",
      body: JSON.stringify({ticketNumber}),
      headers: {
        "Content-Type": "Application/json"
      }
    })
    const json = await response.json();
    console.log(json)
    
    setReceiverEmail(json.email)
    setSubject(`RE: ${json.subject}`)
  }
  fetchEmail(ticketNumber)
 
  }, [])

  useEffect(() => {
  const getEmails = async(ticketNumber) => {

    const response = await fetch(`/api/email/${ticketNumber}`, {method: "GET"})
    const json = await response.json()

    if (response.ok)
      dispatch({type: "SET_EMAILS", payload: json});
    }

    getEmails(ticketNumber)
  }, [dispatch])


  return (
    <>
    <ClientDetails />
          {emails && emails.map(email => {

            return <div className="email-containers" key = {email._id}>
              <h2>{email.subject}</h2>
             <h3> From: <span> {email.senderEmail}</span>    To: <span>{email.receiverEmail}</span></h3>
             <h4>{email.body}</h4>
             <h6>{email.createdAt}</h6>
            </div>
          })}
          
      <SendEmail ticketNumber = {ticketNumber} senderEmail = {senderEmail} receiverEmail = {receiverEmail} subject ={subject}/>

    </>
  )
}
 

    // // <>
    // {/* {assignedTickets && assignedTickets.map((ticket) => 

    // (<AssignedTicketDetails key = {ticket._id} ticket = {ticket}/>)


    // )} */}
    
    // // {/* </> */}



    // <>
    // {
    //      assignedTickets && assignedTickets.map((ticket) => {

    //         return <div className="list-container" key = {ticket._id}>
    //              <p>{ticket.clientName}</p>
    //             </div>
               
    //       })
    // }
    // </>


export default Ticket;
