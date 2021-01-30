import app from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import React from 'react';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import Database = firebase.database.Database;
import Auth = firebase.auth.Auth;

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

class Firebase {

  auth: Auth;
  db: Database;
  googleProvider: GoogleAuthProvider;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***


  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        next({
          ...authUser.providerData[0],
          uid: authUser.uid,
          email: authUser.email,
          emailVerified: authUser.emailVerified
        });
      } else {
        fallback();
      }
    });

  /************** Collections **************/

  user = uid => this.db.ref(`users/${ uid }`);

  users = () => this.db.ref('users');

  film = uid => this.db.ref(`films/${ uid }`);

  films = () => this.db.ref('films');

  comments = () => this.db.ref('comments');

  comment = uid => this.db.ref(`comment/${ uid }`);

}

const FirebaseContext = React.createContext(null);

export { FirebaseContext, Firebase };


