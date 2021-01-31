import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RootStore from './stores/RootStore';
import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import { Firebase, FirebaseContext } from './components/firebase/Firebase';

const AUTH_USER = 'authUser';

export const AppProvider = () => {

  const rootStore = new RootStore();
  const firebase = new Firebase();

  rootStore.sessionStore.setUser(getLocalStorageUser());

  useEffect(() => {
    const films = firebase.films();
    films.on('value', (snapshot) => {
      !!snapshot?.val && rootStore.filmsStore.setFilms(snapshot.val());
    });

    return firebase.onAuthUserListener(
      authUser => setUser(authUser),
      () => setUser(undefined),
    );
  }, []);

  function setUser(user) {
    setLocalStorageUser(user);
    rootStore.sessionStore.setUser(getLocalStorageUser());
  }

  function setLocalStorageUser (user?) {
    localStorage.setItem(AUTH_USER, JSON.stringify(user));
  }

  function getLocalStorageUser() {
    return JSON.parse(localStorage.getItem(AUTH_USER));
  }

  return (
    <BrowserRouter>
      <Provider {...rootStore}>
        <FirebaseContext.Provider value={ firebase }>
          <App/>
        </FirebaseContext.Provider>
      </Provider>
    </BrowserRouter>
  );
};
