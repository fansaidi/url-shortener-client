import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ShortenUrl from './components/ShortenUrl';
import ShortenedUrls from './components/ShortenedUrls';

const appName = 'URL Shortener';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  bodyContent: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BlurLinearIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            {appName}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container>
            <Typography variant="h4" color="textSecondary" paragraph>
              Simplify your links
            </Typography>
            <ShortenUrl  />
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.bodyContent}>
          <ShortenedUrls />
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © ' + appName + ' ' + new Date().getFullYear() + '.'}
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default App;
