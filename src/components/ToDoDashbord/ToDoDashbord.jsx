import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToDoCard from "../ToDoCard/ToDoCard";
import cls from "./ToDoDashbord.module.css";
import { Button } from "@mui/material";
import CreateToDoModal from "../Modals/CreateToDoModal";
import ToDoModal from "../Modals/ToDoModal";
import CreateStatusModal from "../Modals/CreateStatusModal";
import ToDoColumn from "../ToDoColumn/ToDoColumn";
import { updateToDoAction } from "../../store/todoReducer";

export default function ToDoDashbord() {
  const todoList = useSelector((state) => state.todoReducer.todoList);
  const statusList = useSelector((state) => state.statusReducer.statusList);
  const dispatch = useDispatch();

  const [currentToDo, setCurrentToDo] = useState({});

  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleToDoModal, setVisibleToDoModal] = useState(false);
  const [visibleStatusModal, setVisibleStatusModal] = useState(false);


  function updateStatus(todo, newStatus) {
    dispatch(updateToDoAction(
      ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: newStatus
      })
    ))
  }


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
      <header className={cls.header}>
      <h1>ToDo Dashbord</h1>
      <div >
      {statusList.length === 0 ? <h2 className={cls.message}>Добавьте статусы</h2> :
        <Button sx={{margin:'5px'}}
          variant="contained" onClick={() => setVisibleCreateModal(true)}>
          Добавить задачу
        </Button>
      }


      <Button variant="contained" onClick={() => setVisibleStatusModal(true)}>
        Добавить статус
      </Button>
      </div>
      </header>

      <div className={cls.columns}>
        {statusList.map((statusColumn) => {
          return <ToDoColumn key={statusColumn.id} column={statusColumn} onDrop={(e) => {
            let draggedTodo = JSON.parse(e.dataTransfer.getData('draggedTodo'));
            updateStatus(draggedTodo, statusColumn.status)
            setCurrentToDo({})
          }}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
          >{todoList.length < 1 ? (
            <div>Пусто</div>
          ) : (
            <div>
              {todoList.map((item) => {
                if (item.status === statusColumn.status) {
                  return (
                    <ToDoCard
                      todo={item}
                      key={item.id}
                      onDragStart={(e) => {

                        e.dataTransfer.setData('draggedTodo', JSON.stringify(item))
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => e.preventDefault()}
                      onDragLeave={(e) => e.preventDefault()}

                      onClick={() => {
                        setCurrentToDo(item);
                        setVisibleToDoModal(true);
                      }
                      }
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


