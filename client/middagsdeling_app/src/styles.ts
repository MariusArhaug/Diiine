
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
            height: "15em",
            backgroundColor: "#e9eef2",
            margin: "auto",
        },
    }),
);