import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import client from "../feathers-client";
import { useAuth } from "../hooks/use-auth";
import InputField from "../pages/Chat/InputField";
import Message from "../pages/Chat/Message";
import { TypeMessage } from "../types";
import ChatInputField from "./ChatInputField";


export default function ChatPrototype() {
    const auth = useAuth();
    const user = auth.user;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(false);

    useEffect(() => {

        client.service('chat')
            .find({
                query: {
                    $sort: { created_at: -1 },
                    $limit: 5,
                }
            })
            .then((res: any) => {
                setMessages(res.data);
            })

            console.log(messages);
            
    }, [newMessage]);

    useEffect(() => {
        client.service('chat').on('created', () => {
            
        })
        
    }, [messages])


    return (
        <div>
            <h1>Dis the chat!</h1>
            <Container maxWidth="xs">
                <Paper>
                    <Grid container spacing={3}>
                        {messages.length && messages!.map((message: TypeMessage) => {
                            return (
                            <Message {...{ content: message.message, reciever: false }} />
                            )
                        })}
        
                    </Grid>
                    <Divider />
                    <InputField />
                </Paper>
            </Container>
            <ChatInputField />

        </div>

    );
}