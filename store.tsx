
import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { useRouter } from "next/router";

type Notes = {
  id: string,
  title: string,
  body: string
}

type ContextType = {
  firebase: any,
  user: firebase.User | [],
  dbInstance: firebase.firestore.Firestore,
  notesData: Notes | [],
  updateNotes: () => void
}
 
export const FirebaseContext = createContext<ContextType | null>(null);
var db: firebase.firestore.Firestore;

export const FirebaseContextProvider = (props) => {
  const [dbInstance, setDB] = useState<firebase.firestore.Firestore>();
  const [notesData, setNotes] = useState<Notes | []>([]);
  const [user, setUser] = useState<firebase.User | []>([]);
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
    db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function(user: firebase.User) {
        if (user) {
            console.log(user)
            console.log('User logged')
            if(db) {
              getNotes(firebase, db, (resp) => {
                setNotes(resp);
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
      notesData,
      updateNotes: function () {
        getNotes(firebase, db, (resp: Notes) => {
          setNotes(resp);
        });
      }
    }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}


function getNotes(firebase, db: firebase.firestore.Firestore, cb: Function): void {
  var resp: Notes[] = [];
  const user: firebase.User = firebase.auth().currentUser;
  db.collection("notes").where('uid', '==', user.uid ).orderBy('updated', 'desc').get().then((querySnapshot: firebase.firestore.DocumentData) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().title}`);
          resp.push({
            id: doc.id,
            title: doc.data().title,
            body:doc.data().body,
          })
      });
    cb(resp);
  });
}
