import axios from "axios";
import { host_ip } from "..";

export async function getSessionData() {
  try {
    const response = await axios.get(`http://${host_ip}:1913/api/session`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    //@ts-ignore
    if (error.response.status === 403) {
      window.location.href = "/login";
    }
    console.log({ errorMessage: error });
  }
}
