import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography, useTheme } from "@mui/material";
import { greyColor } from "../constants/color";

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={greyColor}
      height={"100%"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      px={2}
      textAlign="center"
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        color={theme.palette.primary.main}
      >
        Welcome to Chat App 👋
      </Typography>

      <Typography variant="body1" color="text.secondary" maxWidth="400px">
        Start chatting by selecting a friend from the list! Enjoy real-time
        messaging, group conversations, and more.
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
