import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import { TypeMessage, User } from "../../types";
import Message from "./Message";

type ChatWindowScrollProps = {
    messages: TypeMessage[];
    partner: User;
    user: User;
    classes: ClassNameMap<"root">;
}

export default class ChatWindowScroll extends React.Component<ChatWindowScrollProps, {}> {
    scrollBar: any;

    constructor(props: ChatWindowScrollProps) {
        super(props);
    };

    componentDidMount(){
        this.scrollBar.scrollToBottom();
    }

    componentDidUpdate(){
        this.scrollBar.scrollToBottom();
    }

    render () {
        return (
            <Scrollbars
                ref={ e=> this.scrollBar = e }
                autoHide
                style={{ width: "100%", height: 600 }}
                renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}
            >
                <div className={this.props.classes.root}>
                    {this.props.partner.user_id == 0
                        ? ""
                        :
                        this.props.messages.map((message: TypeMessage) => {
                            return (
                                <Message
                                    key={message.chat_id}
                                    message={message}
                                    user={this.props.user}
                                    partner={this.props.partner}
                                />
                            );
                        })}
                </div>
            </Scrollbars>
        );
    }
};