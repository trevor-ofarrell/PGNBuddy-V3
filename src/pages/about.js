import React from 'react';

import {
  CssBaseline,
  Typography,
  Card,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Image from 'next/image';

import nookies from 'nookies';
import { firebaseAdmin } from '../../firebaseAdmin';

import {
  NavBarLoggedIn, ResponsiveAppBar,
} from '../components';

import useWindowSize from '../hooks/useWindowSize';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    background: 'rgb(39, 36, 34)',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    height: '100%',
    overflowY: 'scroll',
    background: 'rgb(39, 36, 34)',
    paddingBottom: '5vh',
    paddingTop: '1em',
    marginTop: '1em',
  },
  link: {
    textDecoration: 'underline white',
  },
  button: {
    color: 'white',
    borderColor: 'white',
    marginTop: '1vh',
  },
  grow: {
    flexGrow: 1,
  },
  maincard: {
    background: 'rgb(49, 46, 44)',
    height: 'auto',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '4em',
    textColor: 'white',
    marginBottom: '4em',
    [theme.breakpoints.up('xl')]: {
      width: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      marginBottom: '1em',
      padding: '3em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '2em',
      width: '95%',
    },
  },
  text: {
    color: '#fafafa',
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
  },
  paragraph: {
    color: '#fafafa',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  title: {
    textAlign: 'center',
    color: 'orange',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  image: {
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    color: 'orange',
    padding: '0.5em',
  },
}));

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  try {
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    return { props: { id: uid, email } };
  } catch (error) {
    return { props: {} };
  }
};

const About = (props) => {
  const { id, email } = props;
  const classes = useStyles();
  const size = useWindowSize();

  return (
    <div className={classes.root} style={{ height: size.height }}>
      { id && email ? <NavBarLoggedIn /> : <ResponsiveAppBar />}
      <CssBaseline />
      <div className={classes.content}>
        <Card className={classes.maincard}>
          <Typography variant="h3" className={classes.title}>
            About PGNBuddy
          </Typography>
          <br />
          <Typography variant="body1" className={classes.paragraph}>
            PGNBuddy was first created by me, Trevor O&#39;Farrell in 2020, as a personal project to
            practice my coding skills by building something I could personally use, and was
            interested in frequently working on. I recently began rewriting PGNBuddy from scratch
            after my original efforts, and came to realize that my fun project may prove useful
            to other chess players. So I&#39;m making it available for the public to use free of
            charge, without ads or tracking.
          </Typography>
          <br />
          <Typography variant="body1" className={classes.paragraph}>
            I hope you enjoy using PGNBuddy.
            Don&#39;t hesitate to reach out with any questions, concerns, suggestions,
            or anything else along those lines.
          </Typography>
          <br />
          <a href="https://trevorofarrell.com">
            <Typography variant="body1" className={classes.text}>
              - Trevor O&#39;Farrell
            </Typography>
          </a>
          <a href="https://github.com/trevor-ofarrell/PGNBuddy-V3">
            <Typography variant="body1" className={classes.text}>
              https://github.com/trevor-ofarrell/PGNBuddy-V3
            </Typography>
          </a>
        </Card>
        <Card className={classes.maincard} id="howtouse">
          <Typography variant="h3" className={classes.title}>
            How to use PGNBuddy
          </Typography>
          <br />
          <Typography variant="body1" className={classes.text}>
            PGNBuddy is made for storing PGN files (Portable Game Notation).
            You can create folders and upload PGN files from your local file system,
            or export PGN files from lichess.org
          </Typography>
          <br />
          <div className={classes.image}>
            <Image
              src="/howto/pgnbuddy1.jpg"
              alt="how to upload pgns"
              width={624}
              height={438}
              priority="true"
            />
            <Typography variant="body1">
              Two options:
              &#39;upload PGN files&#39; and &#39;export PGN&#39;s from lichess.org&#39;
            </Typography>
          </div>
          <br />
          <Typography variant="body1" className={classes.text}>
            Select either of the first two sidebar buttons to upload PGN files to PGNBuddy.
            The first option, is for uploading PGN files from your local file system,
            the second for exporting PGN files from
            lichess.org by username and date, or by game ID or link.
          </Typography>
          <br />
          <div className={classes.image}>
            <Image
              src="/howto/pgnbuddy6.jpg"
              alt="how to upload pgns"
              width={634.4}
              height={477.6}
              priority="true"
            />
            <Typography variant="body1">
              file system upload
            </Typography>
          </div>

          <br />
          <div className={classes.image}>
            <Image
              src="/howto/pgnbuddy5.jpg"
              alt="how to upload pgns"
              width={765.1}
              height={368.2}
              priority="true"
            />
            <Typography variant="body1">
              lichess.org export
            </Typography>
          </div>
          <br />
          <div className={classes.image}>
            <Image
              src="/howto/pgnbuddy7.png"
              alt="how to upload pgns"
              width={772.8}
              height={483}
              priority="true"
            />
            <br />
            <br />
            <Typography variant="body1" className={classes.text}>
              After submitting either form, the PGN files will be added to your database,
              and available whenever you need them, from any device!
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
