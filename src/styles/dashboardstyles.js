import {
  makeStyles,
  withStyles,
} from '@material-ui/core';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import useWindowSize from '../hooks/useWindowSize';

const drawerWidth = 240;
const Size = () => useWindowSize();

export const Accordion = withStyles({
  root: {
    background: 'rgb(39, 36, 34)',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '0em',
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles((theme) => ({
  root: {
    background: 'rgb(59, 56, 54)',
    marginBottom: '3px',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        background: 'rgb(49, 46, 44)',
      },
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

export const PgnAccordionSummary = withStyles((theme) => ({
  root: {
    background: 'rgb(59, 56, 54)',
    minHeight: 56,
    marginBottom: '3px',
    '&$expanded': {
      minHeight: 56,
    },
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        background: 'rgb(49, 46, 44)',
      },
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.8),
    },
  },
}))(MuiAccordionDetails);

export const PgnAccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.1),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(0.8),
    },
  },
}))(MuiAccordionDetails);

export const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'hidden',
    height: '-webkit-fill-available',
    width: '100vw',
    background: 'rgb(39, 36, 34)',
  },
  accordian: {
    height: 'calc(100vh - 65px)',
    overflowY: 'auto',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 55px)',
    },
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
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
    fontSize: '1.1em',
    borderColor: '#fafafa',
    '&:before': {
      borderColor: '#fafafa',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.95em',
    },
  },
  nowrap: {
    width: '59vw',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginTop: 'auto',
    marginBottom: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '40vw',
      maxWidth: '45vw',
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
    [theme.breakpoints.down('xl')]: {
      maxWidth: 300,
      minWidth: 100,
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: 190,
      minWidth: 100,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 140,
      minWidth: 100,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 90,
      minWidth: 90,
    },
  },
  actionIcons: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
}));
