import axios from "axios";
import { host_ip } from "..";

export async function getSessionData() {
  try {
    const response = await axios.get(`${host_ip}/api/session`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    //@ts-ignore
    if (error.response.status === 403) {
      window.location.href = "/login";
    }
    console.log({ errorMessage: error });
  }
}
