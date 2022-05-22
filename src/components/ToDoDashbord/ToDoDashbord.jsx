import React, { useState } from "react";
import { useSelector } from "react-redux";
import ToDoCard from "../ToDoCard/ToDoCard";
import cls from "./ToDoDashbord.module.css";
import { Button } from "@mui/material";
import CreateToDoModal from "../Modals/CreateToDoModal";
import ToDoModal from "../Modals/ToDoModal";
import CreateStatusModal from "../Modals/CreateStatusModal";
import ToDoColumn from "../ToDoColumn/ToDoColumn";

export default function ToDoDashbord() {
  const todoList = useSelector((state) => state.todoReducer.todoList);
  const statusList = useSelector((state) => state.statusReducer.statusList);

  const [currentToDo, setCurrentToDo] = useState({});

  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleToDoModal, setVisibleToDoModal] = useState(false);
  const [visibleStatusModal, setVisibleStatusModal] = useState(false);


  return (
    <div className={cls.dashbord}>
      <CreateToDoModal
        isOpen={visibleCreateModal}
        setIsOpen={setVisibleCreateModal}
      />

      <CreateStatusModal
        isOpen={visibleStatusModal}
        setIsOpen={setVisibleStatusModal}
      />

      <ToDoModal
        isOpen={visibleToDoModal}
        setIsOpen={setVisibleToDoModal}
        todo={currentToDo}
      />

      <Button variant="contained" onClick={() => setVisibleCreateModal(true)}>
        Добавить задачу
      </Button>

      <Button variant="contained" onClick={() => setVisibleStatusModal(true)}>
        Добавить статус
      </Button>

      <div className={cls.columns}>
        {statusList.map((column) => {
          return <ToDoColumn title={column.status} id={column.id}>{todoList.length < 1 ? (
            <div>Пусто</div>
          ) : (
            <div>
              {todoList.map((item) => {
                if (item.status === column.status) {
                  return (
                    <ToDoCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      status={item.status}
                      onClick={() => {
                        setCurrentToDo(item);
                        setVisibleToDoModal(true);
                      }}
                    />
                  );
                }
              })}
            </div>
          )}</ToDoColumn>;
        })}
      </div>

    </div>
  );
}


