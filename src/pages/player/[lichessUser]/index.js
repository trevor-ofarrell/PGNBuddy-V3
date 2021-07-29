import ErrorPage from 'next/error';
import {
  Grid, Typography, Card,
} from '@material-ui/core';

import nookies from 'nookies';
import { firebaseAdmin } from '../../../../firebaseAdmin';
import { useStyles } from '../../../styles/lichessuserstyles';
import {
  NavBarLoggedIn,
  ResponsiveAppBar,
  PieChart,
  RadarChart,
  LineChart,
} from '../../../components';
import rateLimit from '../../../../utils/ratelimit';

import useWindowSize from '../../../hooks/useWindowSize';

const axios = require('axios');

const limiterHalf = rateLimit({
  interval: 30 * 1000, // 30 seconds
  uniqueTokenPerInterval: 5, // a max of 1 user can request per second
});
const limiterFull = rateLimit({
  interval: 65 * 1000,
  uniqueTokenPerInterval: 5,
});

export const getServerSideProps = async (ctx) => {
  const getData = async (lichessUsername, resp, uid, email) => {
    try {
      await limiterHalf.check(resp, 3, 'CACHE_TOKEN');
      try {
        const response = await axios.get(
          `http://lichess.org/api/user/${lichessUsername}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );

        const response2 = await axios.get(
          `http://lichess.org/api/user/${lichessUsername}/rating-history`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );

        if ([response.status, response2.status].includes(429)) {
          await limiterFull.check(resp, 0, 'CACHE_TOKEN');
        }

        const username = JSON.stringify(response.data.username);
        const perfs = Object.keys(response.data.perfs);
        const perfList = [];
        const pastYearRatingHistory = [];

        response2.data.forEach((timeControl) => {
          if (timeControl.points?.length > 0) {
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

            pastYearData.forEach((row) => {
              if (!averages[row[1]]) { averages[row[1]] = []; }
              averages[row[1]].push(parseInt(row[3], 10));
            });

            Object.keys(averages).forEach(
              (m) => averages[m] = averages[m].reduce((v, i) => v + i, 0) / averages[m].length,
            );

            if (Object.keys(averages).length > 1) {
              pastYearRatingHistory.push({ [timeControlName]: averages });
            }
          }
        });

        perfs.forEach((elem) => {
          perfList.push({ [elem]: response.data.perfs[elem] });
        });

        const playerData = response.data.count;

        if (uid && email) {
          return {
            props: {
              perfList,
              playerData,
              username,
              pastYearRatingHistory,
              lichessUsername,
              id: uid,
              email,
            },
          };
        }
        return {
          props: {
            perfList,
            playerData,
            username,
            pastYearRatingHistory,
            lichessUsername,
          },
        };
      } catch (err) {
        resp.statusCode = 404;
        return {
          props: {},
        };
      }
    } catch {
      if (uid && email) {
        return {
          props: {
            perfList: [],
            playerData: {},
            username: JSON.stringify(lichessUsername),
            pastYearRatingHistory: [],
            lichessUsername,
            id: uid,
            email,
          },
        };
      }
      return {
        props: {
          perfList: [],
          playerData: {},
          username: JSON.stringify(lichessUsername),
          pastYearRatingHistory: [],
          lichessUsername,
        },
      };
    }
  };
  const cookies = nookies.get(ctx);
  try {
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    return getData(ctx.params.lichessUser, ctx.res, uid, email);
  } catch (error) {
    return getData(ctx.params.lichessUser, ctx.res, undefined, undefined);
  }
};

const User = (props) => {
  const {
    perfList, playerData, username, pastYearRatingHistory, id, email,
  } = props;

  const classes = useStyles();
  const size = useWindowSize();

  if (!perfList && !playerData) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {pastYearRatingHistory.length && perfList.length
        ? (
          <div className={classes.root} style={{ height: size.height }}>
            { id && email ? <NavBarLoggedIn /> : <ResponsiveAppBar />}
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
          <div className={classes.root} style={{ height: size.height }}>
            { id && email ? <NavBarLoggedIn /> : <ResponsiveAppBar />}
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
