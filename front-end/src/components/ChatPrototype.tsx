import { useAuth } from "../hooks/use-auth";


export default function ChatPrototype() {
    const user = useAuth().user;

    return (
        <div>
        <h1>Dis the chat!</h1>
        <p>{user.email ? user.email : 'no email'}</p>
        </div>
        
    );
}