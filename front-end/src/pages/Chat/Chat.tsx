import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChatManager from "./ChatManager";
import ChatWindow from "./ChatWindow";
import InputField from "./InputField";
import UserWindow from "./UserWindow";

export default function Chat() {
    const [isUserWindow, setIsUserWindow] = useState<boolean>(true);
    const chatManager = ChatManager();

    useEffect(() => {
        chatManager.findAllUsers().then(() => console.log("ok"));
    }, []);

    const onUserClick = async (partnerID: number) => {
        await chatManager.findPartner(partnerID);
    };

    return (
        <div className="chat">
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-start"
            >
                <Grid item>
                    <UserWindow
                        users={chatManager.allUsers}
                        onUserClick={onUserClick}
                    />
                </Grid>
                <Grid item>
                    <ChatWindow chatManager={chatManager} />
                    <InputField
                        newMessage={chatManager.newMessage}
                        user={chatManager.user}
                        partner={chatManager.partner}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
