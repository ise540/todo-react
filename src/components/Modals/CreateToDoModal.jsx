import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { addToDoAction } from "../../store/todoReducer";
import { v4 as uuidv4 } from "uuid";

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
      <div>
        <input onChange={(event) => setTitle(event.target.value)}></input>
        <input onChange={(event) => setDescription(event.target.value)}></input>
        <button onClick={addToDo}>Добавить</button>

      </div>
    </Modal>
  );
}
