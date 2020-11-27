
import React, { createContext, useEffect, useState } from 'react';
export const FirebaseContext = createContext();
import firebase from 'firebase';

export const FirebaseContextProvider = (props) => {
  const [dbInstance, setDB] = useState();

  useEffect(() => {
    var firebaseConfig = {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId
    };

   
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    setDB(db)

  }, [])

  return (
    <FirebaseContext.Provider value={{ dbInstance }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}
