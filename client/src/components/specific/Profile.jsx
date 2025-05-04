import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import FaceIcon from "@mui/icons-material/Face";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={user?.avatar?.url}
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard heading={"Username"} text={user?.username} />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"joined"}
        text={moment(user?.createdAt).fromNow()}
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
