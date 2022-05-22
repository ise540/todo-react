import React from 'react'
import { useDispatch } from 'react-redux';
import cls from './ToDoColumn.module.css';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/Button";
import { removeToDoStatus } from "../../store/statusReducer"

export default function ToDoColumn({ title, id, children, ...props }) {
    const dispatcher = useDispatch();

    function removeStatus(id) {
        dispatcher(removeToDoStatus(id))
    }

    return (
        <div className={cls.column}>
            <IconButton className={cls.button}
                sx={{
                    position: "absolute",
                    top: "10px",
                    right: "5px",
                }}
                onClick={() => {
                    removeStatus(id);
                }}
            >
                <CloseIcon />
            </IconButton>
            <h1>{title}</h1>
            {children}
        </div>
    )
}
