
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            height: "100vh",
            width: "100vw"
        },
        container: {
            backgroundColor: "#e9eef2",
            padding: "10px",
            textAlign: "left",
        },
        spacer: {
            padding: theme.spacing(3)
        },
        logo: {
            flex: "0 1 auto",
            alignSelf: "start",
            marginBottom: "auto",
            marginLeft: theme.spacing(3),
            marginTop: theme.spacing(3),
            height: "50px"
        },
        login: {
            flex: "0 1 auto",
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            width: "500px",
            padding: theme.spacing(3)
        },
        flexerVertical: {
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            "& >*": {
                margin: "10px",
            },
        },
        flexerHorizontal: {
            justifyContent: "space-between",
            display: "flex",
            padding: "10px 0",
            "& >*": {
                margin: "0 10px",
            },
        },
        icon: {
            alignSelf: "center"
        },
        input: {
            width: "100%"
        },
        textIcon: {
            display: "flex",
            alignItems: "center",
            "& > span": {
                margin: "0 10px",
            },
        },
        links: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
        },
        names: {
            display: "flex",
            justifyContent: "space-between",
            margin: 0,
        },
        nameInput: {
            width: "48%"
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        dinnerImage: {
            width: "100%",
            height: "15vh",
            backgroundColor: "#e9eef2",
            margin: "auto",
        },
        newDinner: {
            marginLeft: "auto",
        },
        avatarGroup: {
            paddingLeft: "30px",
            "& > *": {
                width: "30px",
                height: "30px",
                border: "1px solid gray"
            }
        },
    }),
);