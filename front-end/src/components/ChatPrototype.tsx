import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useAuth } from "../hooks/use-auth";
import InputField from "../pages/Chat/InputField";
import Message from "../pages/Chat/Message";
import ChatInputField from "./ChatInputField";
import { Scrollbars } from 'react-custom-scrollbars';


export default function ChatPrototype() {
    const user = useAuth().user;

    

    return (
        <div>
        <h1>Dis the chat!</h1>
        <p>{user.email ? user.email : 'no email'}</p>
        
        <Container maxWidth="xs">
            <Paper>
                <Scrollbars
                    renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{display:"none"}}/>}
                    renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{display:"none"}}/>}
                    style={{height: "500px", width: "100%"}}>
                    <Grid
                        container
                        // spacing={1}
                        style={{
                            margin: 0,
                            width: "100%",
                        }}
                    >
                        <Message {...{content: "This is a test messageThis is a test messageThis is a test message", reciever: false}}/>
                        <Message {...{content: "This is a test message", reciever: false}}/>
                        <Message {...{content: "This is a test message", reciever: true}}/>
                        <Message {...{content: "This is a test message", reciever: true}}/>
                        <Message {...{content: "This is a test message", reciever: true}}/>
                        <Message {...{content: "This is a test message", reciever: true}}/>
                        <Message {...{content: "This is a test message", reciever: false}}/>
                        <Message {...{content: "This is a test message", reciever: true}}/>
                        <Message {...{content: "This is a test message", reciever: true}}/>
                    </Grid>
                </Scrollbars>
                <Divider />
                <InputField />
            </Paper>
        </Container>
        <p>{user.email}</p>
        <ChatInputField />

        </div>
        
    );
}