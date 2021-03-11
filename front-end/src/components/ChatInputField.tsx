import { TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function ChatInputField () {

    const [chat, setChat] = useState({
        from: '',
        to: '',
        message: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChat((chat) => ({
            ...chat,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <div>
            <TextField 
                id='chat-input' 
                label='Message'
                type='text'
                name='chat-input'
                value={chat.message}
                style={{width: '100%'}}
                onChange={handleInputChange}
            />
        </div>
    )
}