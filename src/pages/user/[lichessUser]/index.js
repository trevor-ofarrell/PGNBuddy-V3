import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import {
  Grid, TextField, Button, Card, makeStyles,
} from '@material-ui/core';
import {
  NavBarLoggedIn,
  PieChart,
  RadarChart,
} from '../../../components';

const axios = require('axios');

const useStyles = makeStyles(() => ({
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
    const data = JSON.stringify(response.data);
    const perfs = Object.keys(response.data.perfs);
    const perfList = [];
    perfs.forEach((elem) => {
      perfList.push({ [elem]: response.data.perfs[elem] });
    });
    const playerData = response.data.count;

    return {
      props: { data, perfList, playerData },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

const User = (props) => {
  const router = useRouter();
  const { lichessUser } = router.query;
  const { data, perfList, playerData } = props;
  const classes = useStyles();

  if (!data) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <div className={classes.root}>
        <NavBarLoggedIn />
        <Grid container className={classes.body}>
          <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
            <div>
              <RadarChart perfList={perfList} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
            <div>
              <PieChart playerData={playerData} />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default User;
