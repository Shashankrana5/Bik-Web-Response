import { useEffect } from "react";
import io from "socket.io-client"
const TestingChat = () => {

    const socket = io.connect("http://localhost:9000/games", {
          query: `name=${JSON.parse(localStorage.getItem("user")).email}`,
          // query: `type=personal `

    });
    
    useEffect(() => {
        socket.on("welcome", message => {
            console.log(message);
        })
    }, [])
    return (
        <h1>from testing chat</h1>
    )
}
export default TestingChat;