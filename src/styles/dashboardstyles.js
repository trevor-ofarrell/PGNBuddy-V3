import {
  makeStyles,
} from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'hidden',
    height: '100vh',
    width: '100vw',
    background: 'rgb(39, 36, 34)',
  },
  accordian: {
    height: '100%',
    maxHeight: '95vh',
    overflowY: 'auto',
    width: '100%',
  },
  dash: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
      maxHeight: '94vh',
      marginTop: '6vh',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    marginTop: '4.545em',
    width: drawerWidth,
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: '10',
    marginBottom: 'auto',
    [theme.breakpoints.down('md')]: {
      marginTop: '0vh',
      backgroundColor: 'rgba(12, 12, 12, 0.875)',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '4.545em',
    },
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  sidedrawer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '0.65vh',
    },
    [theme.breakpoints.up('xl')]: {
      paddingTop: '-3.5vh',
    },
  },
  sideDrawerButton: {
    width: '100%',
    height: 'auto',
    padding: '1.5em',
    paddingLeft: 'auto',
    paddingRight: 'auto',
    color: 'white',
    marginBottom: '0.5em',
    background: 'rgb(59, 56, 54)',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
    [theme.breakpoints.down('md')]: {
      background: 'rgb(39, 36, 34)',
      marginBottom: '0.6em',
    },
  },
  menuicon: {
    paddingTop: '45vh',
    paddingBottom: '45vh',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-2.5vw',
      marginRight: '-3vw',
    },
  },
  pgns: {
    width: '100%',
  },
  text: {
    color: 'white',
    wordWrap: 'break-all',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px',
    },
  },
  foldertext: {
    color: 'white',
    width: '89%',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px',
      width: '91.5%',
    },
  },
  pgntext: {
    color: 'white',
    width: '92%',
    maxWidth: '75vw',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('md')]: {
      fontSize: '19px',
      width: '93.25%',
    },
  },
  nogames: {
    color: 'white',
    fontSize: '2.8em',
    textAlign: 'center',
    paddingTop: '30vh',
    marginLeft: '-3vw',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em',
      textAlign: 'center',
    },
  },
  iframe: {
    width: '100%',
    height: '45vh',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      height: '50vh',
    },
    [theme.breakpoints.down('md')]: {
      height: '42vh',
    },
    [theme.breakpoints.down('xs')]: {
      height: '32.25vh',
    },
  },
  pgncontent: {
    marginBottom: '0em',
    marginTop: '1em',
    [theme.breakpoints.up('xl')]: {
      marginLeft: '1vw',
      marginRight: '1vw',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: '1.5vw',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '-1vw',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-1.5vw',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0.5em',
      marginBottom: '1em',
      marginLeft: '0.2vw',

    },
  },
  iframecard: {
    background: 'rgb(59, 56, 54)',
    padding: '2em',
    [theme.breakpoints.up('lg')]: {
      marginRight: '1em',
    },
    [theme.breakpoints.down('md')]: {
      padding: '1em',
      marginBottom: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0em',
      marginBottom: '0.5em',
    },
  },
  pgncard: {
    background: 'rgb(59, 56, 54)',
    padding: '2em',
    marginTop: '1em',
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0.5em',
      marginBottom: '0.5em',
    },
  },
  pgncard2: {
    background: 'rgb(59, 56, 54)',
    padding: '2em',
    marginTop: '1em',
    marginBottom: '1em',
    maxHeight: '51em',
    width: '99%',
    textAlign: 'center',
    marginLeft: 'auto',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      width: '98%',
      marginTop: '0.5em',
      marginBottom: '0.5em',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
  },
  pgnviewercard: {
    background: 'rgb(59, 56, 54)',
    padding: '2em',
    marginTop: '0.25em',
    marginBottom: '0.25em',
    height: 'auto',
    width: '95%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '0em',
      marginBottom: '0em',
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      width: '98%',
    },
  },
  pgncopycard: {
    background: 'rgb(59, 56, 54)',
    padding: '2em',
    marginTop: '0.25em',
    marginBottom: '0.25em',
    height: 'auto',
    width: '99%',
    textAlign: 'center',
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '0em',
      marginBottom: '0em',
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      width: '98%',
      marginTop: '0.5em',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
  },
  pgninfocard: {
    background: 'rgb(59, 56, 54)',
    padding: '1em',
    paddingTop: '2em',
    height: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
  },
  copypgncard: {
    background: 'rgb(59, 56, 54)',
    padding: '1em',
    height: '100%',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'underline white',
  },
  button: {
    color: 'white',
    borderColor: 'white',
    marginTop: '1vh',
  },
  nonprimarybutton: {
    fontSize: '0.9em',
    lineHeight: '1.35em',
    color: 'white',
    borderColor: 'white',
    '&:hover': {
      background: 'rgb(49, 46, 44)',
    },
  },
  buttongroup: {
    marginTop: '0.5em',
  },
  grow: {
    flexGrow: 1,
  },
  pgnview: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pgninfotext: {
    marginBottom: '0.5em',
  },
  textfield: {
    marginTop: '0.5em',
    marginBottom: '0.6em',
    width: '100%',
    color: '#fafafa',
    borderColor: '#fafafa',
    fontColor: '#fafafa',
  },
  label: {
    color: '#fafafa',
    fontWeight: '300',
    borderColor: '#fafafa',
    '&:before': {
      borderColor: '#fafafa',
    },
  },
  input: {
    color: '#fafafa',
    fontWeight: '300',
    borderColor: '#fafafa',
    '&:before': {
      borderColor: '#fafafa',
    },
  },
  nowrap: {
    width: '62vw',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      width: '45vw',
      maxWidth: '50vw',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '60vw',
    },
  },
  nowrappgn: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '65vw',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '65vw',
    },
  },
  formControl: {
    '&:before': {
      borderColor: '#fafafa',
    },
    marginTop: '-0.4em',
    paddingTop: '0em',
    maxWidth: 140,
    minWidth: 80,
    height: '2.4em',
    marginBottom: '0.4em',
    margin: '0em',
    [theme.breakpoints.down('xs')]: {
      minWidth: 50,
      maxWidth: 70,
    },
  },
}));
