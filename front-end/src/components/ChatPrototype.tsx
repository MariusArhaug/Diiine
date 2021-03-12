import { useAuth } from "../hooks/use-auth";
import ChatInputField from "./ChatInputField";


export default function ChatPrototype() {
    const user = useAuth().user;

    

    return (
        <div>
        <h1>Dis the chat!</h1>
        <p>{user.email}</p>
        <ChatInputField />

        </div>
        
    );
}