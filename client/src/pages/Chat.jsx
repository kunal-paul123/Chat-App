import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { greyColor, orange } from "../constants/color";
import { InputBox } from "../components/styles/StyledComponents";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useChatDetailsQuery } from "../redux/api/api";
import { useSocketEvents } from "../hooks/hook";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);

  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const members = chatDetails?.data?.chat?.members;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    //Emmiting message to server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessagesHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandler = { [NEW_MESSAGE]: newMessagesHandler };

  useSocketEvents(socket, eventHandler);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={greyColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {messages.map((i) => {
          return <MessageComponent key={i._id} message={i} user={user} />;
        })}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#424A76",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "#26263B",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
};

const ChatWithLayout = AppLayout()(Chat);
export default ChatWithLayout;
