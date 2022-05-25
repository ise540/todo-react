import React from "react";
import cls from "./Modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/Button";

export default function Modal({ children, isVisible, setVisible, ...props }) {
  return (
    <div
      className={isVisible ? cls.modal + " " + cls.modal_active : cls.modal}
      onClick={() => setVisible(false)}
    >
      <div className={cls.modal_content} onClick={(e) => e.stopPropagation()}>
        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: "5px",
            zIndex: '2'
          }}
          onClick={() => {
            setVisible(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className={cls.modal_content}>{children}</div>
      </div>
    </div>
  );
}
