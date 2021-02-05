import ErrorPage from 'next/error';
import {
  Grid, makeStyles, Typography, Card,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Link from 'next/link';
import {
  NavBarLoggedIn,
  PieChart,
  RadarChart,
} from '../../../components';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgb(39, 36, 34)',
    minHeight: '100vh',
    height: '100%',
    width: '100vw',
  },
  body: {
    width: '100vw',
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
    [theme.breakpoints.up('lg')]: {
      height: 'auto',
      maxHeight: '80vh',
      maxWidth: '41vw',
      width: 'auto',
      marginTop: '1.5vh',
    },
    [theme.breakpoints.up('xl')]: {
      height: 'auto',
      width: '32vw',
      position: 'relative',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      width: '100vw',
    },
  },
  pie: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('lg')]: {
      width: '40vw',
      marginTop: '1.5vh',
    },
    [theme.breakpoints.up('xl')]: {
      height: 'auto',
      width: '45vw',
      position: 'relative',
    },
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Aldrich, sans-serif',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3vh',
    },
  },
  pgncard: {
    background: 'rgb(49, 46, 44)',
    padding: '2em',
    marginTop: '2em',
    marginBottom: '2em',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '1em',
      marginBottom: '1em',
    },
  },
  radarcard: {
    background: 'rgb(49, 46, 44)',
    padding: '1em',
    margin: '2em',
    marginRight: '1em',
    paddingTop: '2em',
    height: '82vh',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
      margin: '2em',
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0em',
      padding: '0em',
    },
  },
  piecard: {
    background: 'rgb(49, 46, 44)',
    padding: '1em',
    margin: '2em',
    marginLeft: '1em',
    paddingTop: '2em',
    height: '82vh',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1em',
      margin: '2em',
      marginTop: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0em',
    },
  },
}));

export const getServerSideProps = async ({ params, res }) => {
  try {
    const response = await axios.get(
      `http://lichess.org/api/user/${params.lichessUser}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const username = JSON.stringify(response.data.username);
    const perfs = Object.keys(response.data.perfs);
    const perfList = [];
    perfs.forEach((elem) => {
      perfList.push({ [elem]: response.data.perfs[elem] });
    });
    const playerData = response.data.count;

    return {
      props: { perfList, playerData, username },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

const User = (props) => {
  const { perfList, playerData, username } = props;
  const classes = useStyles();

  if (!perfList && !playerData) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <div className={classes.root}>
        <NavBarLoggedIn />
        <Typography variant="h4" className={classes.title}>
          lichess.org account
          {' '}
          <a href={`https://lichess.org/@/${JSON.parse(username)}`} className={classes.link}>
            {JSON.parse(username)}
          </a>
        </Typography>
        <Grid container className={classes.body}>
          <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
            <Card className={classes.radarcard} elevation={0}>
              <div className={classes.radar}>
                <RadarChart perfList={perfList} />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
            <Card className={classes.piecard} elevation={0}>
              <div className={classes.pie}>
                <PieChart playerData={playerData} />
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default User;
