import { createStyles, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import Scrollbars from "react-custom-scrollbars";
import { ChatManager, TypeMessage, User } from "../../types";
import ChatWindowScroll from "./ChatWindowScroll";
import Message from "./Message";

const useStylesModified = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(3),
            padding: 0,
        },
    })
);

type Props = {
    messages: TypeMessage[];
    partner: User;
    user: User;
};

export default function ChatWindow(props: Props) {
    const classes = useStylesModified();

    useEffect(() => {
        // scrollToBottom();
    }, [])

    return (
        <div>
            <Typography variant="h6" style={{margin: "1rem"}}>{props.partner.user_id == 0
                ? "Select user from list"
                : props.partner.name}
            </Typography>
            <Divider />
            <ChatWindowScroll {...{messages: props.messages, partner: props.partner, user: props.user, classes: classes}}/>
        </div>
    );
}
