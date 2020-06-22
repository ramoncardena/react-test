import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
    },
    content: {
        flexGrow: 1,
        height: "100%",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        justifyContent: "flex-end"
    }
}));