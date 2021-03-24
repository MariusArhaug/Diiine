import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: 0,
        width: "70vw",
        backgroundColor: "red"
    },

    card: {},
});

export default function ChatWindow() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            
        </div>
    )
}