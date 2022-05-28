import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField } from "@mui/material";
import Modal from "../Modal/Modal";
import { addToDoStatus } from "../../store/statusReducer";
import { v4 as uuidv4 } from "uuid";

export default function CreateStatusModal({ isOpen, setIsOpen, ...props }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');
    console.log(status)

    function addStatus() {
        dispatch(addToDoStatus({
            id: uuidv4(),
            status
        }
        ))
    }

    useEffect(()=>setStatus(''),[isOpen])

    return (
        <Modal isVisible={isOpen} setVisible={setIsOpen}>
            <h1>Добавить статус</h1>
            <TextField sx={{ marginBottom: '15px' }} label="Статус" variant="standard" value={status} onChange={(e) => setStatus(e.target.value)} />
            <Button variant="contained" onClick={() => {
                addStatus();
                setIsOpen(false);
            }}>Добавить</Button>
        </Modal >
    );
}
