
import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { useRouter } from "next/router";


export const FirebaseContext = createContext();

export const FirebaseContextProvider = (props) => {
  const [dbInstance, setDB] = useState();
  const [notesData, setNotes] = useState([]);
  const [user, setUser] = useState([]);
  const router = useRouter();

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

    console.log(router.pathname)

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user)
            console.log('User logged')
            if(db) {
              var resp = [];
              const user = firebase.auth().currentUser;
              db.collection("notes").where('uid', '==', user.uid ).orderBy('updated', 'desc').get().then((querySnapshot) => {
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

            if ( router.pathname === '/login' ) {
              router.push({
                pathname: '/'
              });
            }

            
            setUser(user);
        // User is signed in.
        } else {
            setUser([]);
            console.log('User logout')
            router.push({
              pathname: '/login'
            });
        // No user is signed in.
        }
    });


   
    
    setDB(db)

  }, [])

  return (
    <FirebaseContext.Provider value={{ 
      firebase,
      user,
      dbInstance,
      notesData
    }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}
