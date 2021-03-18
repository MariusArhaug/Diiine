import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useAuth } from "../hooks/use-auth";
import InputField from "../pages/Chat/InputField";
import Message from "../pages/Chat/Message";
import ChatInputField from "./ChatInputField";
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { User, Chat } from "../types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
    }),
);


export default function ChatPrototype() {
    const user = useAuth().user;
    const classes = useStyles();

    const tempUser: User = {
        userId: 99,
        name: "Name Nameson",
        address: "Adress",
        email: "name.namesson@mail.com",
        isAdmin: false,
        allergies: ""
    }

    const tempMessage: Chat = {
        chat_to: user,
        chat_from: tempUser,
        message: "Test string",
        created_at: new Date(),
        updated_at: new Date()
    }

    return (
        <div className={classes.root}>
        {/* <p>{user.email ? user.email : 'no email'}</p> */}
        
        <Container maxWidth="xs">
            <Paper>
                <Scrollbars
                    autoHide
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
                        <Message {...{content: tempMessage, reciever: false}}/>
                        <Message {...{content: tempMessage, reciever: true}}/>
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