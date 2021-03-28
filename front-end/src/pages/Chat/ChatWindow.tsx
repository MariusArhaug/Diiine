import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { ChatManager, TypeMessage, User } from "../../types";
import Message from "./Message";

const useStyles = makeStyles({
    root: {
        display: "inline-block",
        margin: 0,
        padding: 0,
        width: "100%",
        border: "3px yellow solid",
    },

    card: {},
});

type Props = {
    chatManager: ChatManager;
};

export default function ChatWindow(props: Props) {
    const chatManager = props.chatManager;
    const classes = useStyles();

    useEffect(() => {
        
    }, [chatManager.messages])

    const chatWindow = () => {
        return;
    };

    return (
        <div className={classes.root}>
            {chatManager.partner.user_id == 0
                ? "Select a user, from the left"
                : chatManager.messages.map((message: TypeMessage) => {
                      return (
                          <Message
                              key={message.chat_id}
                              message={message}
                              user={chatManager.user}
                              partner={chatManager.partner}
                          />
                      );
                  })}
        </div>
    );
}
