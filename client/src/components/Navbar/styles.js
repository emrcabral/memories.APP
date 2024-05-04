import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(24,119,242, 1)',
    textDecoration: 'none',
    display: 'flex',         // Make the heading a flex container
    alignItems: 'center',    // Center items vertically
    justifyContent: 'center' // Center items horizontally (optional, depending on design)
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Adjust width as needed
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginRight: '10px',
  },
  logout: {
    '&&': {
      marginLeft: '10px', // Add margin between user name and logout button
    }
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    '&&': {
      marginRight: '10px',
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    }
  },
}));
