import React, { useState } from "react";
import { useSelector } from "react-redux";
import ToDoCard from "../ToDoCard/ToDoCard";
import cls from "./ToDoDashbord.module.css";
import { Button } from "@mui/material";
import CreateToDoModal from "../Modals/CreateToDoModal";
import ToDoModal from "../Modals/ToDoModal";

export default function ToDoDashbord() {
  const todoList = useSelector((state) => state.todoReducer.todoList);
  console.log(todoList);

  const [currentToDo, setCurrentToDo] = useState({});

  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleToDoModal, setVisibleToDoModal] = useState(false);

  const columns = ["Не выполнено", "В процессе", "Выполнено"];

  return (
    <div className={cls.dashbord}>
      <CreateToDoModal
        isOpen={visibleCreateModal}
        setIsOpen={setVisibleCreateModal}
      />

      <ToDoModal
        isOpen={visibleToDoModal}
        setIsOpen={setVisibleToDoModal}
        todo={currentToDo}
      />

      <Button variant="contained" onClick={() => setVisibleCreateModal(true)}>
        Добавить задачу
      </Button>
      <div className={cls.columns}>
        {columns.map((column) => {
          return <div className={cls.column}>{todoList.length < 1 ? (
            <div>Пусто</div>
          ) : (
            <div>
              {todoList.map((item) => {
                if (item.status===column) {
                return (
                  <ToDoCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    status={item.status}
                    onClick={(event) => {
                      setCurrentToDo(item);
                      setVisibleToDoModal(true);
                    }}
                  />
                );}
              })}
            </div>
          )}{column}</div>;
        })}
      </div>
      
    </div>
  );
}
