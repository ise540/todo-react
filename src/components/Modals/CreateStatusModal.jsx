import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from "@mui/material";
import Modal from "../Modal/Modal";
import { addToDoStatus } from "../../store/statusReducer";
import { v4 as uuidv4 } from "uuid";

export default function CreateStatusModal({ isOpen, setIsOpen, ...props }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState();

    function addStatus() {
        dispatch(addToDoStatus({
            id: uuidv4(),
            status
        }
        ))
    }

    return (
        <Modal isVisible={isOpen} setVisible={setIsOpen}>
            <div>
                <input onChange={(e) => setStatus(e.target.value)}></input>
                <Button onClick={addStatus}>Добавить</Button>

            </div>
        </Modal>
    );
}
