import { Box, Typography, Paper } from "@mui/material";
import React, { memo } from "react";
import moment from "moment";
import { fileFormat } from "../../lib/feature";
import RenderAttchment from "./RenderAttchment";
import { messageTextColor, senderNameColor } from "../../constants/color";

const MessageComponent = ({ message, user }) => {
  const { content, sender, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  const messageBg = sameSender ? "#e0f7fa" : "#f5f5f5";
  return (
    <Box
      display="flex"
      justifyContent={sameSender ? "flex-end" : "flex-start"}
      mb={1.5}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "0.75rem 1rem",
          maxWidth: "70%",
          borderRadius: "20px",
          borderTopRightRadius: sameSender ? "0px" : "20px",
          borderTopLeftRadius: sameSender ? "20px" : "0px",
          backgroundColor: messageBg,
          color: messageTextColor,
        }}
      >
        {!sameSender && (
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, color: senderNameColor }}
          >
            {sender.name}
          </Typography>
        )}

        {content && (
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {content}
          </Typography>
        )}

        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box key={index} mt={1}>
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: messageTextColor }}
                >
                  {RenderAttchment(file, url)}
                </a>
              </Box>
            );
          })}

        <Typography
          variant="caption"
          sx={{ display: "block", mt: 0.75, textAlign: "right", opacity: 0.6 }}
        >
          {timeAgo}
        </Typography>
      </Paper>
    </Box>
  );
};

export default memo(MessageComponent);
