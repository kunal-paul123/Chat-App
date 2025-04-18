import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"daefwed ewdvawv ewfwe"} />
      <ProfileCard heading={"Username"} text={"@kunalpaul"} />
      <ProfileCard heading={"Name"} text={"Kunal Paul"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"joined"}
        text={moment("2025-03-30T00:00:00.000Z").fromNow()}
        Icon={<CalendarMonthIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ heading, text, Icon }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      textAlign="left"
      sx={{ width: "fit-content", color: "#fff" }}
    >
      {Icon && <span style={{ color: "#fff" }}>{Icon}</span>}

      <Stack spacing={0.3}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {text}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#aaa" }}
          textAlign={"center"}
        >
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
