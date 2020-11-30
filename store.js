
import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase';

export const FirebaseContext = createContext();

export const FirebaseContextProvider = (props) => {
  const [dbInstance, setDB] = useState();
  const [notesData, setNotes] = useState([]);

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

    
    if(db) {
      var resp = [];
      db.collection("notes").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(`${doc.id} => ${doc.data().title}`);
              resp.push({
                id: doc.id,
                title: doc.data().title,
                body:doc.data().body,
              })
          });
          setNotes(resp)

      });
    }
    
    setDB(db)

  }, [])

  return (
    <FirebaseContext.Provider value={{ 
      dbInstance,
      notesData: notesData
    }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}
