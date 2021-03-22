import {
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgb(39, 36, 34)',
    minHeight: '100vh',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  aspect: {
    height: '100%',
    paddingBottom: '6em',
    maxWidth: '100%',
    [theme.breakpoints.up('xl')]: {
      aspectRatio: '16 / 9',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      overflowX: 'hidden',
    },
    [theme.breakpoints.down('xs')]: {
    },
  },
  link: {
    color: '#FFF',
    '&:hover': {
      color: '#FFF',
      textDecoration: 'underline #FFFFFF',
    },
  },
  radar: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '51.75vh',
    width: 'auto',
    marginTop: '1.5vh',
    [theme.breakpoints.down('sm')]: {
      height: '50vh',
      width: 'auto',
    },
  },
  pie: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '50vh',
    width: 'auto',
    marginTop: '1.5vh',
    [theme.breakpoints.down('sm')]: {
      height: '50vh',
      width: 'auto',
    },
  },
  line: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '50vh',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '50vh',
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      height: '70vh',
    },
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '0.25em',
    marginTop: '-.25em',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0.25vh',
      paddingBottom: '0vh',
    },
  },
  ratelimit: {
    color: 'white',
    textAlign: 'center',
    margin: '1em',
    marginTop: '30vh',
    marginBottom: '10vh',
  },
  radarcard: {
    background: 'rgb(49, 46, 44)',
    padding: '1em',
    paddingBottom: '5vh',
    margin: '2em',
    marginTop: '1em',
    marginRight: '1em',
    height: 'auto',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
      margin: '2em',
      marginTop: '1em',
      marginBottom: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0em',
      padding: '.75em',
      marginBottom: '1em',
    },
  },
  piecard: {
    background: 'rgb(49, 46, 44)',
    padding: '1em',
    paddingBottom: '6.65vh',
    margin: '2em',
    marginTop: '1em',
    marginLeft: '1em',
    height: 'auto',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
      margin: '2em',
      marginTop: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0em',
    },
  },
  linecard: {
    background: 'rgb(49, 46, 44)',
    padding: '2em',
    margin: '2em',
    marginTop: '0em',
    paddingTop: '1em',
    marginBottom: '1em',
    height: 'auto',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0em',
      padding: '.5em',
      marginBottom: '1em',
    },
  },
  grid: {
    background: 'rgb(39, 36, 34)',
    overflowY: 'auto',
    paddingBottom: '2em',
    [theme.breakpoints.down('lg')]: {
      height: '100%',
    },
  },
}));
