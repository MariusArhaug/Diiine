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
import { Scrollbars } from 'react-custom-scrollbars';


export default function ChatPrototype() {

    const [messages, setMessages] = useState<TypeMessage[]>([]);

    useEffect(() => {

        client.service('chat')
            .find({
                query: {
                    $sort: { created_at: 1 },
                    $limit: 25,
                }
            })
            .then((res: any) => {
                console.log(res.data);

                setMessages(res.data);
            })

        console.log(messages);

    }, []);
    
    client.service('chat').on('created', (chat: TypeMessage) => {
        setMessages([...messages, chat]);
    });

    return (
        <div>
            <h1>Dis the chat!</h1>
            <Container maxWidth="xs">
                <Paper>
                    <Grid container spacing={3}>
                        <Container maxWidth="xs">
                            <Paper>
                                <Scrollbars
                                    renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{ display: "none" }} />}
                                    renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{ display: "none" }} />}
                                    style={{ height: "500px", width: "100%" }}>
                                    <Grid
                                        container
                                        // spacing={1}
                                        style={{
                                            margin: 0,
                                            width: "100%",
                                        }}
                                    >
                                        {messages.length && messages!.map((message: TypeMessage) => {
                                            return (
                                                <Message key={message.chat_id} {...{ content: message.message, reciever: false }} />
                                            )
                                        })}
                                    </Grid>
                                </Scrollbars>
                                <Divider />
                                <InputField />
                            </Paper>
                        </Container>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}