import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { getSessionData } from "../utils/getSessionData";
import axios from "axios";
import { host_ip } from "..";

export const Profile = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [uploadedFile, setUploadedFile] = useState<FileList | null>(null);

  useEffect(() => {
    const sessionCheck = async () => {
      const response = await getSessionData();
      setCurrentUser(response?.data.user);
    };
    sessionCheck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = async () => {
    if (uploadedFile) {
      const files = uploadedFile;
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("clientId", currentUser!._id);
      await axios.post(
        `http://${host_ip}:1913/api/image/uploadavatar`,
        formData,
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
          <div className="text-lg text-gray-800 dark:text-gray-400">
            {" "}
            {uploadedFile && uploadedFile[0].name}
          </div>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            setUploadedFile(e.target.files!);
          }}
        />
      </label>
      <button onClick={handleUpload}>Submit</button>
    </div>
  );
};

/**
  const [imm, setImm] = useState<any>(null);
     * 
    const fetchPicture = async () => {
    const response = await axios.get(
      "http://localhost:1913/api/image/getbyfilename/1690339449210_1.png",
      {
        responseType: "arraybuffer",
      },
    );
    let base64ImageString = Buffer.from(response.data, "binary").toString(
      "base64",
    );

    setImm(base64ImageString);
  };
  // fetchPicture();
  // return <>{imm ? <img src={`data:image/jpeg;base64,${imm}`} /> : null}</>;

     */
