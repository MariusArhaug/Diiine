
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
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            width: "500px",
            padding: "10px",
            "& >*": {
                margin: "10px",
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
        },
        nameInput: {
            width: "48%"
        }
    }),
);