import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/scroll_to_top/ScrollToTop.component';
import Home from './scenes/home/Home';
import Login from './scenes/login/Login';
import FilmComments from './scenes/filmComments/FilmComments';


export default function AppRouter() {
  return (
    <>
      <ScrollToTop/>
      <Switch>
        <Route path="/" exact={ true } component={ Home }/>
        <Route path="/login" component={ Login }/>
        <Route path="/film/:uid" component={ FilmComments }/>
        <Redirect to="/"/>
      </Switch>
    </>
  );
};
