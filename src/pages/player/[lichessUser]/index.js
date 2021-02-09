import ErrorPage from 'next/error';
import {
  Grid, makeStyles, Typography, Card,
} from '@material-ui/core';
import Link from 'next/link';
import {
  NavBarLoggedIn,
  PieChart,
  RadarChart,
  LineChart,
} from '../../../components';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '1.25em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(29, 26, 24)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(19, 16, 14)',
    },
  },
  root: {
    background: 'rgb(39, 36, 34)',
    minHeight: '100vh',
    height: '100vh',
    width: '100vw',
    scroll: 'false',
    overflow: 'hidden',
  },
  aspect: {
    height: '100%',
    paddingBottom: '6em',
    [theme.breakpoints.up('xl')]: {
      aspectRatio: '16 / 9',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      overflowX: 'hidden',
    },
    [theme.breakpoints.down('xs')]: {
      background: 'rgb(49, 46, 44)',
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
    height: 'auto',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      height: 'auto',
      maxWidth: '41vw',
      width: 'auto',
      marginTop: '1.5vh',
    },
    [theme.breakpoints.up('xl')]: {
      height: 'auto',
      width: '30vw',
      position: 'relative',
    },
    [theme.breakpoints.down('xs')]: {
      height: '100%',
      width: '92vw',
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
      width: '30vw',
      position: 'relative',
    },
  },
  line: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '0.5em',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0.5vh',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0.25vh',
      paddingBottom: '0vh',
    },
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
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '1em',
      margin: '2em',
      marginBottom: '0em',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0em',
      padding: '0em',
      marginBottom: '2em',
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
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '1em',
      margin: '2em',
      marginTop: '2em',
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
      padding: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '1em',
      margin: '2em',
      marginTop: '0em',
      marginBottom: '0em',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0em',
      padding: '0em',
      marginBottom: '2em',
    },
  },
  grid: {
    background: 'rgb(39, 36, 34)',
    overflowY: 'auto',
    [theme.breakpoints.down('lg')]: {
      height: '100%',
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

    const response2 = await axios.get(
      `http://lichess.org/api/user/${params.lichessUser}/rating-history`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const username = JSON.stringify(response.data.username);
    const perfs = Object.keys(response.data.perfs);
    const perfList = [];
    const pastYearRatingHistory = [];

    response2.data.forEach((timeControl) => {
      try {
        if (timeControl.points.length > 0) {
          const timeControlName = timeControl.name;
          const currentDate = new Date();
          const month = currentDate.getUTCMonth();
          const year = currentDate.getUTCFullYear();
          const startYear = year - 1;

          const pastYearData = timeControl.points.filter((point) => {
            const refrenceDateStart = new Date(startYear, month, 1);
            const refrenceDateEnd = new Date(year, month, 1);
            const pointDate = new Date(point[0], point[1], point[2]);
            return (pointDate >= refrenceDateStart && pointDate <= refrenceDateEnd);
          });

          const avgs = Object.fromEntries(
            Object.entries(
              pastYearData.reduce(
                (acc, cur) => ({
                  ...acc,
                  [cur[1]]: {
                    ...acc[cur[1]],
                    count: (acc[cur[1]]?.count ?? 0) + 1,
                    total: (acc[cur[1]]?.total ?? 0) + cur[3],
                  },
                }),
              ),
            ).map(([k, { total, count }]) => [k, total / count]),
          );

          pastYearRatingHistory.push({ [timeControlName]: avgs });
        }
      } catch {}
    });

    perfs.forEach((elem) => {
      perfList.push({ [elem]: response.data.perfs[elem] });
    });
    const playerData = response.data.count;

    return {
      props: {
        perfList, playerData, username, pastYearRatingHistory,
      },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

const User = (props) => {
  const {
    perfList, playerData, username, pastYearRatingHistory,
  } = props;
  const classes = useStyles();

  if (!perfList && !playerData) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <div className={classes.root}>
        <NavBarLoggedIn />
        <div className={classes.aspect}>
          <Typography variant="h6" className={classes.title}>
            lichess.org account
            {' '}
            <a href={`https://lichess.org/@/${JSON.parse(username)}`} className={classes.link}>
              {JSON.parse(username)}
            </a>
          </Typography>
          <Grid container className={classes.grid}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card className={classes.linecard} elevation={0}>
                <div className={classes.line}>
                  <LineChart
                    pastYearRatingHistory={pastYearRatingHistory}
                    playerUsername={JSON.parse(username)}
                  />
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
              <Card className={classes.radarcard} elevation={0}>
                <div className={classes.radar}>
                  <RadarChart
                    perfList={perfList}
                    playerUsername={JSON.parse(username)}
                  />
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
              <Card className={classes.piecard} elevation={0}>
                <div className={classes.pie}>
                  <PieChart
                    playerData={playerData}
                    playerUsername={JSON.parse(username)}
                  />
                </div>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default User;
