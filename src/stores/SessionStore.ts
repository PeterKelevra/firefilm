import { makeAutoObservable } from 'mobx';
import firebase from 'firebase';
import UserInfo = firebase.UserInfo;

class SessionStore {

  user: UserInfo = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }
}

export default SessionStore;
