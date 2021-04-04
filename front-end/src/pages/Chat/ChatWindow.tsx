import { createStyles, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import Scrollbars from "react-custom-scrollbars";
import { ChatManager, TypeMessage, User } from "../../types";
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
            <ScrollToBottom>
                <Scrollbars
                    autoHide
                    style={{ width: "100%", height: 600 }}
                    renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}
                >
                    <div className={classes.root}>
                        {props.partner.user_id == 0
                            ? ""
                            :
                            props.messages.map((message: TypeMessage) => {
                                return (
                                    <Message
                                        key={message.chat_id}
                                        message={message}
                                        user={props.user}
                                        partner={props.partner}
                                    />
                                );
                            })}
                    </div>
                </Scrollbars>
            </ScrollToBottom>
        </div>
    );
}
