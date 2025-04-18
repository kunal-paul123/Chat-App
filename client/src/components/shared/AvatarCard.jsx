import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/feature";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <Box sx={{ position: "relative", width: "3.5rem", height: "3.5rem" }}>
        {avatar.slice(0, max).map((i, index) => (
          <Avatar
            key={index}
            src={transformImage(i)}
            alt={`Avatar ${index}`}
            sx={{
              width: "2.8rem",
              height: "2.8rem",
              position: "absolute",
              left: `${index * 1.4}rem`,
              border: "2px solid white",
              boxShadow: "0 0 6px rgba(0,0,0,0.3)",
              zIndex: avatar.length - index,
            }}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default AvatarCard;
