import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Modal from "../Modal/Modal";
import { Select, TextField, MenuItem, Button, InputLabel, FormControl  } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeToDoAction, updateToDoAction } from "../../store/todoReducer";

export default function ToDoModal({ todo, isOpen, setIsOpen, ...props }) {
  const dispatch = useDispatch();

  const statusList = useSelector((state) => state.statusReducer.statusList);

  const [editing, setEditing] = useState(false);

  const [titleInput, setTitleInput] = useState(todo.title);
  const [descriptionInput, setDescriptionInput] = useState(todo.description);
  const [statusInput, setStatusInput] = useState(todo.status);

  useEffect(() => {
    setTitleInput(todo.title);
    setDescriptionInput(todo.description);
    setStatusInput(todo.status);
  }, [todo]);

  const handleChange = (event) => {
    setStatusInput(event.target.value);
  };

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

  return (
    <Modal isVisible={isOpen} setVisible={setIsOpen}>
      <h5>id: {todo.id}</h5>
      <TextField sx={{ marginBottom: '5px' }}
        label="Заголовок"
        variant="standard"
        
        value={titleInput}
        inputProps={{ readOnly: !editing }}
        onChange={(e) => setTitleInput(e.target.value)}
      />

      <TextField sx={{ marginBottom: '5px' }}
        label="Описание"
        variant="standard"
        multiline
        maxRows={4}
        value={descriptionInput}
        inputProps={{ readOnly: !editing }}
        onChange={(e) => setDescriptionInput(e.target.value)}
      />
      <FormControl>
      <InputLabel variant="standard" sx={{fontSize:'1rem'}}>
          Статус
        </InputLabel>
      <Select sx={{ marginBottom: '10px' }}
        label="Статус"
        value={statusInput ?? ""}
        onChange={handleChange}
        variant="standard"
        inputProps={{ readOnly: !editing }}
      >
        {statusList.map((status) => (
          <MenuItem key={status.id} value={status.status}>
            {status.status}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <div style={{
        display:'flex',
        justifyContent:'space-between'
      }}>
        {!editing ? <Button sx={{ marginBottom: '5px' }}
          variant="outlined"
          color="primary"
          component="span"
          onClick={() => setEditing(!editing)}
        >
          <ModeEditIcon />
        </Button>
          :
          <Button sx={{ marginBottom: '5px' }}
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
        <Button sx={{ marginBottom: '5px' }}
          variant="outlined"
          color='error'
          onClick={() => {
            removeToDo();
            setIsOpen(false);
          }}
        >
          <DeleteIcon />
        </Button>

      </div>

    </Modal>
  );
}
