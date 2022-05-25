import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { addToDoAction } from "../../store/todoReducer";
import { v4 as uuidv4 } from "uuid";
import {TextField, Button} from '@mui/material';

export default function CreateToDoModal({ isOpen, setIsOpen, ...props }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const statusList = useSelector((state) => state.statusReducer.statusList);

  function addToDo() {
    dispatch(
      addToDoAction({
        id: uuidv4(),
        title,
        description,
        status: statusList[0].status,
      })
    );
  }

  return (
    <Modal isVisible={isOpen} setVisible={setIsOpen}>
        <h1>Создать задачу</h1>
        <TextField sx={{marginBottom:'5px'}} id="standard-basic" label="Заголовок" variant="standard" value={title} onChange={(event) => setTitle(event.target.value)} />
        <TextField sx={{marginBottom:'15px'}}
          id="filled-multiline-flexible"
          label="Описание"
          variant="standard"
          multiline
          maxRows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button variant="contained" onClick={addToDo}>Добавить</Button>
    </Modal>
  );
}
