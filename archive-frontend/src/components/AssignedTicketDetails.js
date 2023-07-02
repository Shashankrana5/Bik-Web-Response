const AssignedTicketDetails  = ({ticket}) => {

    return (
        <div className="ticket-details">
            {console.log(ticket)}
            <span>{ticket.clientName}</span>
        </div>
    )
}

export default AssignedTicketDetails;