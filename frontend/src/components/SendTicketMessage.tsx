import axios from "axios";
import { useCurrentUserContext } from "../hooks/useCurrentUserContext";
import { useParams } from "react-router-dom";
import { useTicketContentContext } from "../hooks/useTicketContentContext";
import { Socket } from "socket.io-client";
import { Editor } from "@tinymce/tinymce-react";
import "../css/editor.css";
import { useState } from "react";

interface SendTicketMessageProps {
  ticketSocket: Socket | null;
}

export const SendTicketMessage = (props: SendTicketMessageProps) => {
  const { ticketSocket } = props;
  const { currentUser } = useCurrentUserContext();
  const { ticketNumber } = useParams();
  const { ticketContentDispatch } = useTicketContentContext();
  const [rawHtml, setRawHtml] = useState<string>("");
  const [currentEditor, setCurrentEditor] = useState<any>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:1913/api/ticket/createticketmessage",
      {
        currentUser,
        ticketNumber,
        content: rawHtml,
        //@ts-ignore
        invisible: e.target.sendTicketMessageCheckbox.checked,
      },
    );
    if (response && ticketSocket) {
      ticketContentDispatch({
        type: "CREATE_TICKET_CONTENT",
        payload: response.data,
      });
      ticketSocket.emit("send-ticket-message", response.data);
    }
    if (currentEditor) {
      currentEditor.setContent("");
      setRawHtml("");
    }
  };

  return (
    <form
      id="submit-ticket-message-main"
      onSubmit={handleSubmit}
      className="p-4 pr-10"
    >
      <Editor
        id="tiny-editor"
        apiKey="7rr86g3nuclc0x1y5gvq47ysqdt7gp8j2onq8aygur66m5yj"
        // eslint-disable-next-line
        value={rawHtml}
        onInit={(event, editor) => {
          setCurrentEditor(editor);
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(newValue, editor) => {
          setRawHtml(newValue);
        }}
      ></Editor>
      <div
        id="sendTicketMessageSender"
        className="flex flex-row-reverse gap-2 p-2 items-center"
      >
        <button
          id="sendTicketMessageSubmitButtom"
          type="submit"
          className="inline-block rounded bg-orange-400 hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
        >
          Send
        </button>
        <div
          id="sendTicketMessageInvisibleNote"
          className="flex gap-2 items-center justify-center"
        >
          <label htmlFor="sendTicketMessageCheckbox">Make invisible</label>
          <input id="sendTicketMessageCheckbox" type="checkbox" />
        </div>
      </div>
    </form>
  );
};
