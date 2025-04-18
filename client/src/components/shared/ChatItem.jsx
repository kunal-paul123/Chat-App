import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: 0, textDecoration: "none" }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 2,
          borderRadius: "1rem",
          background: sameSender
            ? "linear-gradient(135deg, #1e1e2f, #2a2a40)"
            : "linear-gradient(145deg, #f1f1f1, #ffffff)",
          color: sameSender ? "#fff" : "#111",
          boxShadow: sameSender
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 2px 6px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: sameSender
              ? "0 4px 20px rgba(0,0,0,0.3)"
              : "0 4px 12px rgba(0,0,0,0.1)",
            background: sameSender
              ? "linear-gradient(135deg, #1e1e2f, #2a2a40)"
              : "linear-gradient(145deg, #eaeaea, #ffffff)",
          },
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack spacing={0.5}>
          <Typography
            fontWeight={600}
            fontSize={{ xs: "0.9rem", sm: "1rem" }}
            noWrap
          >
            {name}
          </Typography>
          {newMessageAlert?.count > 0 && (
            <Typography
              variant="caption"
              color="error"
              fontWeight="bold"
              fontSize="0.75rem"
            >
              {newMessageAlert.count} New Message
            </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "12px",
              height: "12px",
              backgroundColor: "#4CAF50",
              border: "2px solid white",
              borderRadius: "50%",
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </Box>
    </Link>
  );
};

export default memo(ChatItem);
