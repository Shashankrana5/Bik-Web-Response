import axios from "axios";
import { useEffect } from "react";
import { host_ip } from "..";

const Demo = () => {
  const logDemo = async () => {
    try {
      const response = await axios.post(
        `http://${host_ip}:1913/api/session`,
        { email: "demo@bik-web-response.com", password: "DemoUserPW" },
        { withCredentials: true },
      );
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log({ errorMessage: error });
    }
  };

  useEffect(() => {
    logDemo();
  }, []);

  return <></>;
};
export default Demo;
