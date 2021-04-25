import { makeStyles } from '@material-ui/core/styles';

export const useNavStyles = makeStyles(
  (theme) => ({
    leftPortion: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        marginLeft: '1em',
      },
    },
    logoWrapper: {
      marginRight: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
    },
    logo: {
      fontFamily: 'Varela Round',
      textTransform: 'none',
      fontSize: '1.3em',
      padding: '0.1em',
      marginRight: '0.3em',
    },
    user: {
      marginRight: 10,
    },
    titleButton: {
      textTransform: 'none',
      fontSize: 20,
      marginRight: 12,
    },
    navButtons: {
      '&:hover': {
        backgroundColor: '#ffe5d8',
      },
    },
    search: {
      flexGrow: 0.75,
      [theme.breakpoints.down('sm')]: {
        flexGrow: 1,
        padding: '0 0.5em',
      },
    },
    searchBtn: {
      padding: '0.2em',
    },
  }),
  { index: 1 }
);