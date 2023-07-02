import axios from "axios";


export async function getSessionData() {

    try{
        await axios.get("http://localhost:1913/api/session", {withCredentials: true});
            
    }catch(error){
        //@ts-ignore
        if(error.response.status === 403) {
            window.location.href = "/login"
        }
        console.log({errorMessage: error});
    }
        
}