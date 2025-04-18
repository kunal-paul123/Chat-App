import React from "react";
import Header from "./Header";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId; // Extract chatId from URL parameters

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat:", _id, groupChat);
    };
    return (
      <>
        <Header />

        <Grid container height={"calc(100vh - 4rem)"} columns={12}>
          <Grid
            size={4} // 4 out of 12 columns
            sx={{
              display: { xs: "none", sm: "block" }, // Hide on small screens
            }}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>

          {/* Main Content Grid */}
          <Grid
            size={4} // 8 out of 12 columns
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
          >
            <WrappedComponent {...props} />
          </Grid>

          {/* Third Grid (Sidebar) */}
          <Grid
            size={4} // 4 out of 12 columns
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" }, // Hide on small screens
            }}
            bgcolor={"rgba(0,0,0,0.85)"}
            height={"100%"}
            padding="2rem"
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
