import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import client from "../feathers-client";

export default function ChatInputField() {

    const [chat, setChat] = useState({
        chat_from: '82',
        chat_to: '58',
        message: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChat((chat) => ({
            ...chat,
            message: event.target.value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const result = await client.service('chat').create(chat);
        console.log(result);

    }

    return (
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <TextField
                    id='message'
                    label='Message'
                    type='text'
                    name='message'
                    value={chat.message}
                    style={{ width: '100%' }}
                    onChange={handleInputChange}
                />
                <Button type='submit' variant="contained" color="primary" style={{ width: "100%" }}>
                    Send...
            </Button>
            </form>
        </div>
    )
}