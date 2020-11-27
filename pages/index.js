import Head from 'next/head'
import firebase from 'firebase';
import { useEffect, useState } from 'react';

export default function Home() {

  const [notes, setNotes ] = useState([]);

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

    var resp = [];
    db.collection("notes").get().then((querySnapshot) => {
      console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().title}`);
            resp.push({
              title: doc.data().title,
              body:doc.data().body,
            })
        });

        setNotes(resp)
    
    });
    // db.collection("notes").add({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
    
    //console.log(firebase)
  }, [])
  
  
  return (
    <div>
      <h1>Notes</h1>


      <ul>
        {notes.map((item) => {
          return (
            <li>{item.title} - {item.body}</li>
          )

        })}
      </ul>
    </div>
  )
}
