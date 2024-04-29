import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '15px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(24,119,242,1)',
        display: 'flex',           // Make the heading a flex container
        justifyContent: 'center',  // Center the items horizontally
        alignItems: 'center',      // Center the items vertically
    },
    image: {
        marginLeft: '15px',
    },
}));