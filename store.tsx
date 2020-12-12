import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { useRouter } from "next/router";
import { Note, ContextType } from './types';
import { client } from './client';
 
export const FirebaseContext = createContext<ContextType | null>(null);

var db: firebase.firestore.Firestore;

export const FirebaseContextProvider = (props) => {
  const [notesData, setNotes] = useState<Note[] | []>([]);
  const router = useRouter();

  useEffect(() => {
    client.init();
    db = client.getDB();

    client.onAuthStateChanged((user: firebase.User) => { 
        if (user) {
            console.log(user)
            console.log('User logged')
            if(db) {
              client.getNotes((resp: Note[]) => {
                setNotes(resp);
              });
            }

            if ( router.pathname === '/login' ) {
              router.push({
                pathname: '/'
              });
            }
        // User is signed in.
        } else {
            console.log('User logout')
            router.push({
              pathname: '/login'
            });
        // No user is signed in.
        }
    });
  }, [])

  return (
    <FirebaseContext.Provider value={{ 
      notesData,
      updateNotes: function () {
        client.getNotes((resp: Note[]) => {
          setNotes(resp);
        });
      }
    }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}
