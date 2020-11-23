import React from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';
import { firebaseClient } from '../../firebaseClient';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
    NavBarLoggedIn,
    SideDrawer,
} from "../components"
import { useAuth } from '../../auth';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxHeight: '100vh',
        overflow: 'hidden',
        background: '#121212',
        zIndex: '0',
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        background: '#121212',
        zIndex: '2',
        width: '99vw',
        height: '92vh',
        margin: 'auto',
        marginTop: '1.5vh',
    },
  
  }));

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
};

const dashboard = () => {
    const classes = useStyles()
    return (
    <Box className={classes.root}>
        <NavBarLoggedIn />
        <Grid container>
            <Grid item xs={12} md={12} lg={12}>
                <Box>
                    <SideDrawer/>
                </Box>
            </Grid>
        </Grid>
    </Box>
  );
}

export default dashboard;
