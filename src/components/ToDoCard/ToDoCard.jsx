import React from "react";

import cls from "./ToDoCard.module.css";

export default function ToDoCard({ todo, onClick, ...props }) {
  return (
    <div className={cls.card} draggable={true} id={todo.id} onClick = {onClick} {...props}>
      <h2>{todo.title}</h2>
      <div>{todo.status.status}</div>
    </div>
  );
}
