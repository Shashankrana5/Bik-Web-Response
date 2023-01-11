import { useEffect } from "react";

const Ticket = () => {

    useEffect(() => {
        console.log(encodeURI("abc%20xyz 123"))
    }, [])
    return (
        <div className="ticket-page">
            <h2>Ticket navigation</h2>
            <h4></h4>
        </div>
    )
}

export default Ticket;