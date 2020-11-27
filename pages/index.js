import Head from 'next/head'
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { FirebaseContext } from './store'

export default function Home() {

  const { dbInstance } = useContext(FirebaseContext);
  const [notes, setNotes ] = useState([]);

  useEffect(() => {

    console.log(dbInstance)

    if(dbInstance) {
      var resp = [];
      dbInstance.collection("notes").get().then((querySnapshot) => {
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
    }
    
  }, [dbInstance])
  
  
  return (
    <div>
      <h1>Notes</h1>


      <Link href="/notes/add">
        <a>New note</a>
      </Link>
      <ul>
        {notes.map((item, id) => {
          return (
            <li key={id}>{item.title} - {item.body}</li>
          )

        })}
      </ul>
    </div>
  )
}
