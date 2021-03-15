import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useAuth } from "../hooks/use-auth";
import InputField from "../pages/Chat/InputField";
import Message from "../pages/Chat/Message";
import ChatInputField from "./ChatInputField";


export default function ChatPrototype() {
    const user = useAuth().user;

    

    return (
        <div>
        <h1>Dis the chat!</h1>
        
        <Container maxWidth="xs">
            <Paper>
                <Grid container spacing={3}>
                    <Message {...{content: "This is a test messageThis is a test messageThis is a test message :)", reciever: false}}/>
                    <Message {...{content: "This is a test message", reciever: false}}/>
                    <Message {...{content: "This is a test message", reciever: true}}/>
                </Grid>
                <Divider />
                <InputField />
            </Paper>
        </Container>
        <p>{user.email}</p>
        <ChatInputField />

        </div>
        
    );
}