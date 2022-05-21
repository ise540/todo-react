import React from "react";

import cls from "./ToDoCard.module.css";

export default function ToDoCard({ title, status, id, onClick, ...props }) {
  return (
    <div key={id} className={cls.card} draggable={true} id={id} onClick = {onClick}>
      <h2>{title}</h2>
      <div>{status}</div>
    </div>
  );
}
