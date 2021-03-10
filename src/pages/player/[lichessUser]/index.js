import ErrorPage from 'next/error';
import {
  Grid, makeStyles, Typography, Card,
} from '@material-ui/core';

import * as uuid from 'uuid';

import {
  NavBarLoggedIn,
  PieChart,
  RadarChart,
  LineChart,
} from '../../../components';

import rateLimit from '../../../../utils/ratelimit';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
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

const limiterHalf = rateLimit({
  interval: 30 * 1000, // 30 seconds
  uniqueTokenPerInterval: 1, // a max of 1 user can request per second
});
const limiterFull = rateLimit({
  interval: 65 * 1000,
  uniqueTokenPerInterval: 1,
});

export const getServerSideProps = async ({ params, res }) => {
  try {
    // limit this page from calling this function more than once every 30 sec
    // to adhere to the rate limiting rules of the lichess.org api
    await limiterHalf.check(res, 3, 'CACHE_TOKEN');
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

      if ([response.status, response2.status].includes(429)) {
        await limiterFull.check(res, 0, 'CACHE_TOKEN');
      }

      const username = JSON.stringify(response.data.username);
      const perfs = Object.keys(response.data.perfs);
      const perfList = [];
      const pastYearRatingHistory = [];

      JSON.parse(response2.data).forEach((timeControl) => {
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
            const averages = {};

            // Loop through the source data
            pastYearData.forEach((row) => {
              // Create an array as this month's value if not set
              if (!averages[row[1]]) { averages[row[1]] = []; }

              // Lump the same-month values into the correct array. Use parseInt to avoid
              // potential NaN errors
              averages[row[1]].push(parseInt(row[3], 10));
            });

            // Calculate the averages by looping through each key in the object (each month),
            // using reduce to get the sum of the array and then use the length property to
            // get the average of that array.
            Object.keys(averages).forEach(
              (m) => averages[m] = averages[m].reduce((v, i) => v + i, 0) / averages[m].length,
            );

            if (Object.keys(averages).length > 1) {
              pastYearRatingHistory.push({ [timeControlName]: averages });
            }
          }
        } catch (err) {
          return false;
        }
      });

      perfs.forEach((elem) => {
        perfList.push({ [elem]: response.data.perfs[elem] });
      });
      const playerData = response.data.count;

      return {
        props: {
          perfList,
          playerData,
          username,
          pastYearRatingHistory,
          lichessUsername: params.lichessUser,
        },
      };
    } catch {
      res.statusCode = 404;
      return {
        props: {},
      };
    }
  } catch {
    return {
      props: {
        perfList: [],
        playerData: {},
        username: JSON.stringify(params.lichessUser),
        pastYearRatingHistory: [],
        lichessUsername: params.lichessUser,
      },
    };
  }
};

const User = (props) => {
  const {
    perfList, playerData, username, pastYearRatingHistory, lichessUsername,
  } = props;

  const classes = useStyles();

  if (!perfList && !playerData) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {pastYearRatingHistory.length && perfList.length
        ? (
          <div className={classes.root}>
            <NavBarLoggedIn lichessUsername={lichessUsername} />
            <div className={classes.aspect}>
              <a href={`https://lichess.org/@/${JSON.parse(username)}`} className={classes.link}>
                <Typography variant="h6" className={classes.title}>
                  lichess.org account
                  {' '}
                  {JSON.parse(username)}
                </Typography>
              </a>
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
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <Card className={classes.radarcard} elevation={0}>
                    <div className={classes.radar}>
                      <RadarChart
                        perfList={perfList}
                        playerUsername={JSON.parse(username)}
                      />
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
        )
        : (
          <div className={classes.root}>
            <NavBarLoggedIn lichessUsername={lichessUsername} />
            <div className={classes.aspect}>
              <div className={classes.ratelimit}>
                <Typography variant="h2" className={classes.ratelimit}>
                  Please wait 30 seconds before requesting lichess user data again.
                </Typography>
                <Typography variant="h5">
                  This data is from the free lichess.org API,
                  to keep the API fast for everyone PGNBuddy is imposing rate limits.
                </Typography>
                <a href="https://lichess.org/api#section/Introduction/Rate-limiting" className={classes.link}>
                  <Typography variant="h5">
                    lichess.org/api
                  </Typography>
                </a>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default User;
