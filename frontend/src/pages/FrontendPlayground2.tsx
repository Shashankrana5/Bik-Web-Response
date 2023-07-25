import axios from "axios";
import { useState } from "react";
import { Buffer } from "buffer";

export const FrontendPlayground2 = () => {
  const [imm, setImm] = useState<any>(null);

  const fetchPicture = async () => {
    const response = await axios.get(
      "http://localhost:1913/api/image/getbyfilename/1690317183891_cat.jpeg",
      {
        responseType: "arraybuffer",
      },
    );
    let base64ImageString = Buffer.from(response.data, "binary").toString(
      "base64",
    );

    setImm(base64ImageString);
  };
  fetchPicture();
  return <>{imm ? <img src={`data:image/jpeg;base64,${imm}`} /> : null}</>;
};
