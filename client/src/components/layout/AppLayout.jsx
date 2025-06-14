import { useDispatch } from "react-redux";
import React, { useCallback } from "react";
import Header from "./Header";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useSelector } from "react-redux";
import { setIsMobileMenu } from "../../redux/reducers/misc";
import { useErros, useSocketEvents } from "../../hooks/hook";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../constants/events";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId; // Extract chatId from URL parameters

    const dispatch = useDispatch();

    const socket = getSocket();

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);

    const { isLoading, isError, data, error, refetch } = useMyChatsQuery("");

    useErros([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat:", _id, groupChat);
    };

    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    const newMessageAlertHandler = useCallback(() => {}, []);
    
    const newMessageHandler = useCallback(() => {}, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newMessageHandler,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"} columns={12}>
          <Grid
            size={4} // 4 out of 12 columns
            sx={{
              display: { xs: "none", sm: "block" }, // Hide on small screens
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>

          {/* Main Content Grid */}
          <Grid
            size={5} // 8 out of 12 columns
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          {/* Third Grid (Sidebar) */}
          <Grid
            size={3} // 4 out of 12 columns
            // md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" }, // Hide on small screens
            }}
            bgcolor={"rgba(0,0,0,0.85)"}
            height={"100%"}
            padding="2rem"
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
