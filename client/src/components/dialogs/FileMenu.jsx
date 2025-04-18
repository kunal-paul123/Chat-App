import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        earum dolor ipsa dolores iure facere! Qui libero id animi ex commodi nam
        omnis ea, impedit ab aut, dolore a officia.
      </div>
    </Menu>
  );
};

export default FileMenu;
