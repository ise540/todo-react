import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Modal from "../Modal/Modal";
import { IconButton, TextField, MenuItem, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeToDoAction, updateToDoAction } from "../../store/todoReducer";

export default function ToDoModal({ todo, isOpen, setIsOpen, ...props }) {
  const dispatch = useDispatch();

  const statusList = useSelector((state) => state.statusReducer.statusList);
  const todoList = useSelector((state) => state.todoReducer.todoList);

  function removeToDo() {
    dispatch(removeToDoAction(todo.id));
  }

  function updateToDo(todo) {
    dispatch(updateToDoAction({
      id: todo.id,
      title: titleInput,
      description: descriptionInput,
      status: statusInput
    }))
  }

  const [editing, setEditing] = useState(false);

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  useEffect(() => {
    setTitleInput(todo.titleInput);
    setDescriptionInput(todo.descriptionInput);
    setStatusInput(todo.statusInput);
  }, [todo]);

  const handleChange = (event) => {
    setStatusInput(event.target.value);
  };

  return (
    <Modal isVisible={isOpen} setVisible={setIsOpen}>
      <h5>id: {todo.id}</h5>
      <TextField
        label="Заголовок"
        variant="standard"
        color="warning"
        value={titleInput}
        inputProps={{ readOnly: !editing }}
        onChange={(e) => setTitleInput(e.target.value)}
      />

      <TextField
        label="Описание"
        variant="standard"
        color="secondary"
        focused
        multiline
        maxRows={4}
        value={descriptionInput}
        inputProps={{ readOnly: !editing }}
        onChange={(e) => setDescriptionInput(e.target.value)}
      />
      <TextField
        id="standard-select-currency"
        select
        label="Статус"
        value={statusInput}
        onChange={handleChange}
        variant="standard"
        inputProps={{ readOnly: !editing }}
      >
        {statusList.map((status) => (
          <MenuItem key={status.id} value={status.status}>
            {status.status}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="outlined"
        onClick={() => {
          removeToDo();
          setIsOpen(false);
        }}
      >
        <DeleteIcon />
      </Button>
      {!editing ? <Button
        variant="outlined"
        color="primary"
        component="span"
        onClick={() => setEditing(!editing)}
      >
        <ModeEditIcon />
      </Button>
        :
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={() => {
            setEditing(!editing);
            updateToDo(todo);
            setIsOpen(false);
          }}
        >
          Сохранить
        </Button>}


    </Modal>
  );
}
