import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { greyColor } from "../../constants/color";

export const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  border: 0,
  whiteSpace: "nowrap",
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 140%;
  padding: 0 3rem;
  background-color: ${greyColor};
  border: none;
  border-radius: 1.5rem;
`;
