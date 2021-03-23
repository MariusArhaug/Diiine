import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import client from "../feathers-client";
import { useAuth } from "../hooks/use-auth";
import InputField from "../pages/Chat/InputField";
import Message from "../pages/Chat/Message";
import { Scrollbars } from "react-custom-scrollbars";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { User, TypeMessage } from "../types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
);

export default function ChatPrototype() {
    const classes = useStyles();

    const [messages, setMessages] = useState<TypeMessage[]>([]);

    useEffect(() => {
        client
            .service("chat")
            .find({
                query: {
                    $sort: { created_at: -1 },
                    $limit: 3,
                },
            })
            .then((res: any) => {
                setMessages(res.data.reverse());
            });
    }, []);

    client.service("chat").on("created", (chat: TypeMessage) => {
        setMessages([...messages, chat]);
    });

    return (
        <div className={classes.root}>
            <Container maxWidth="xs">
                <Paper>
                    <Scrollbars
                        autoHide
                        renderTrackHorizontal={(props) => (
                            <div
                                {...props}
                                className="track-horizontal"
                                style={{ display: "none" }}
                            />
                        )}
                        renderThumbHorizontal={(props) => (
                            <div
                                {...props}
                                className="thumb-horizontal"
                                style={{ display: "none" }}
                            />
                        )}
                        style={{ height: "500px", width: "100%" }}
                    >
                        <Grid
                            container
                            // spacing={1}
                            style={{
                                margin: 0,
                                width: "100%",
                            }}
                        >
                            {
                                messages.map((message: TypeMessage) => {
                                    return (
                                        <Message
                                            key={message.chat_id}
                                            {...{ content: message }}
                                        />
                                    );
                                })}
                        </Grid>
                    </Scrollbars>
                    <Divider />
                    <InputField />
                </Paper>
            </Container>
        </div>
    );
}
