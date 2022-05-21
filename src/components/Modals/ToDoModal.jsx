import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Modal from "../Modal/Modal";
import { IconButton, TextField, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeToDoAction } from "../../store/todoReducer";

export default function ToDoModal({ todo, isOpen, setIsOpen, ...props }) {
  const dispatch = useDispatch();

  function removeToDo() {
    dispatch(removeToDoAction(todo.id));
  }

  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setStatus(todo.status);
  }, [todo]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const statuses = [
    {
      value: "true",
      label: "true",
    },
    {
      value: "false",
      label: "false",
    },
  ];

  return (
    <Modal isVisible={isOpen} setVisible={setIsOpen}>
      <h5>id: {todo.id}</h5>
      <TextField
        label="Заголовок"
        variant="standard"
        color="warning"
        value={title}
        inputProps={{ readOnly: !editing }}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Описание"
        variant="standard"
        color="secondary"
        focused
        multiline
        maxRows={4}
        value={description}
        inputProps={{ readOnly: !editing }}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="standard-select-currency"
        select
        label="Статус"
        value={status}
        onChange={handleChange}
        variant="standard"
        inputProps={{ readOnly: !editing }}
      >
        {statuses.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <IconButton
        variant="contained"
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => setEditing(!editing)}
      >
        <ModeEditIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          removeToDo();
          setIsOpen(false);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Modal>
  );
}
