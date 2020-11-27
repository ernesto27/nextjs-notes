
import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase';

export const FirebaseContext = createContext();

export const FirebaseContextProvider = (props) => {
  const [dbInstance, setDB] = useState();

  useEffect(() => {
    var firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSASING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID
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
