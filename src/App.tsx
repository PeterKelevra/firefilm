import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import useAppStyles from './App.styles';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import AppRouter from './App.router';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import theme from './theme';
import { Container } from '@material-ui/core';
import FilmDialog from './components/filmDialog/FilmDialog';

const App = () => {
  const classes = useAppStyles();

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      <Box className={ classes.main }>
        <Header/>
        <Container className={ classes.mainContent }>
          <AppRouter/>
          <Footer/>
        </Container>
        <FilmDialog/>
      </Box>
    </ThemeProvider>
  );
};

export default hot(App);
