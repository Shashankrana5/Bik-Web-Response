/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDisplayMessageContext } from "../hooks/useDisplayMessageContext";
import { FaAngleLeft } from "react-icons/fa";
import { TERipple } from "tw-elements-react";
import { Buffer } from "buffer";

export const FrontendPlayground2 = () => {
  const currentUser = {
    _id: "63c2a594b1d5914df517bb42",
    fullName: "Shashank Rana",
    email: "shashank@xyz.com",
    password: "1234",
    role: "ADMIN",
  };
  const selectedChat = {
    chatType: "Personal",
    selected: {
      _id: "641404b9c942b8ca45034745",
      fullName: "Caro Romero",
      email: "caro@xyz.com",
      role: "ADMIN",
    },
  };
  const ticketContent = [
    {
      senderEmail: "shashank@xyz.com",
      avatarId: "64c416bb20be2bbe6ee34633",
    },
    {
      senderEmail: "caro@xyz.com",
      avatarId: "64c416bb20be2bbe6ee34633",
    },
    {
      senderEmail: "jayson@xyz.com",
      avatarId: "64c98f5f1bbaf1ca3e218a62",
    },
    {
      senderEmail: "shashank@xyz.com",
      avatarId: "64c416bb20be2bbe6ee34633",
    },
  ];

  const [avatarPictures, setAvatarPictures] = useState<{
    [key: string]: string;
  }>({});
  const imageFoundUserEmail = new Set<string>();

  useEffect(() => {
    console.log("eyJlcnJvciI6Ik5vdCBGb3VuZCJ9".length)
//     const fetchAvatars = async () => {
// //       if (ticketContent) {
//         let objToSet:any = {}
//         for (const indivisualTicket of ticketContent) {
//             if(!avatarPictures[indivisualTicket.senderEmail]){

//             const response = await axios.post(
//               "http://localhost:1913/api/image/getbyticketcontent/",
//               { responseType: "arraybuffer" },
//             );
//             let base64ImageString = Buffer.from(
//               response.data,
//               "binary",
//             ).toString("base64");
//             if(!Object.keys(avatarPictures).includes(indivisualTicket.senderEmail)){
//             let temp:any = {}
//             temp[indivisualTicket.senderEmail] = base64ImageString;
//             objToSet = {...objToSet, ...temp};
//             }
           
// //             if(!Object.keys(avatarPictures).includes(indivisualTicket.senderEmail)){
// //  let temp: any = {};
// //             temp[indivisualTicket.senderEmail] = base64ImageString;
// //             setAvatarPictures({ ...avatarPictures, ...temp });

// //             }

//           }
//         }
//         setAvatarPictures(objToSet);
//       }
//     };

    // fetchAvatars();
    const fetch = async() => {
      if(ticketContent){
        const response = await axios.post("http://localhost:1913/api/image/getbyticketcontent", {
          ticketContent: ticketContent,
        }, {responseType: "arraybuffer"})
        console.log(response)
      }
    }
    fetch()
    console.log(ticketContent)
  }, [ticketContent]);

  useEffect(() => {
    console.log(avatarPictures)
  }, [avatarPictures])
  return (
    <div>
      {ticketContent &&
        ticketContent.map((ticket: any) => {
          return <img
            src={`data:image/jpeg;base64,${
              avatarPictures[ticket.senderEmail]
            }`}
            className="avatar-sm"
            alt="user's avatar" />
        })}
    </div>
  );
};
