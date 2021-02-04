import ErrorPage from 'next/error';
import {
  Grid, makeStyles, Typography,
} from '@material-ui/core';
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
    paddingTop: '2em',
  },
  radar: {
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      width: '42vw',
      marginLeft: '5vw',
      marginTop: '4vh',
    },
    [theme.breakpoints.up('xl')]: {
      height: 'auto',
      width: '35vw',
      position: 'relative',
      marginLeft: '5vw',
    },
  },
  pie: {
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      width: '45vw',
      marginTop: '9vh',
    },
    [theme.breakpoints.up('xl')]: {
      height: '100%',
      width: '45vw',
      position: 'relative',
    },
  },
  title: {
    color: 'white',
    marginLeft: '2.5vw',
    textAlign: 'center',
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
          <Link href={`https://lichess.org/@/${JSON.parse(username)}`} color="inherit">
            {JSON.parse(username)}
          </Link>
        </Typography>
        <Grid container className={classes.body}>
          <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
            <div className={classes.radar}>
              <RadarChart perfList={perfList} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
            <div className={classes.pie}>
              <PieChart playerData={playerData} />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default User;
