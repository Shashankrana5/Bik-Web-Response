// import axios from "axios";
import { getSessionData } from "../utils/getSessionData";
const Home = () => {

    const handleClick = () => {
        getSessionData();
        // async function getSessionData() {
        //     axios
        //       .get(`http://localhost:1913/api/session`, {
        //         withCredentials: true,
        //       })
        //       .then((res) => console.log(res.data))
        //       .catch((error) => console.log(error.message));
        //     }
        // getSessionData();
    }

    return (
        <div>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default Home;