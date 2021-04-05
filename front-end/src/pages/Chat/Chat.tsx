import { createStyles, Grid, makeStyles, Paper, Theme, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import ChatManager from "./ChatManager";
import ChatWindow from "./ChatWindow";
import InputField from "./InputField";
import UserWindow from "./UserWindow";

const useStylesModified = makeStyles((theme: Theme) =>
    createStyles({
        chat: {
            margin: theme.spacing(3),
            backgroundColor: "#ffffff"
        },
    })
);

export default function Chat() {
    // const [isUserWindow, setIsUserWindow] = useState<boolean>(true);
    const chatManager = ChatManager();
    const classes = useStylesModified();

    const [renderValue, setRenderValue] = useState(0);

    useEffect(() => {
        chatManager.findAllUsers().then(() => console.log("ok"));
    }, []);

    const onUserClick = async (partnerID: number) => {
        await chatManager.findPartner(partnerID);
    };

    const onNewMessage = async (content: string) => {
        await chatManager.newMessage(content);
        setRenderValue(renderValue + 1);
    }

    return (
        <Paper className={classes.chat}>
            <Grid
                container
                direction="row"
                // justify="space-evenly"
                alignItems="flex-start"
            >
                <Grid item xs={3}>
                    <UserWindow
                        users={chatManager.allUsers}
                        onUserClick={onUserClick}
                    />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid container item xs direction="column" justify="space-between">
                    <Grid item xs>
                        <ChatWindow 
                            messages={chatManager.messages} 
                            user={chatManager.user}
                            partner={chatManager.partner}
                        />
                    </Grid>
                    <Divider/>
                    <Grid item>
                        <InputField
                            newMessage={onNewMessage}
                            user={chatManager.user}
                            partner={chatManager.partner}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
