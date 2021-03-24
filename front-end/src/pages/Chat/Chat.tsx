import { useEffect, useState } from "react";
import ChatManager from "./ChatManager";
import ChatWindow from "./ChatWindow";
import UserWindow from "./UserWindow";

export default function Chat() {
    const [isUserWindow, setIsUserWindow] = useState<boolean>(true);
    const chatManager = ChatManager();

    useEffect(() => {
        chatManager
            .findAllUsers()
            .then(() => console.log("ok"));
    }, []);

    const onUserClick = (userID: number) => {
        console.log("hello");
        
    }

    return (
        <div className="chat">
            <UserWindow users={chatManager.allUsers} onClick={onUserClick}/>
            <ChatWindow />
        </div>
    );
}
