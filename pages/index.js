import Head from 'next/head'
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { FirebaseContext } from '../store'
import { useRouter } from "next/router";

export default function Home() {

  const { notesData, dbInstance, firebase, updateNotes } = useContext(FirebaseContext);
  const [notes, setNotes ] = useState([]);
  const router = useRouter();

  const doLogout = () => {
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });
  }


  useEffect(() => {
    setNotes(notesData)
  }, [notesData])

  useEffect(() => {
    if(router.query.update === 'true') {
      updateNotes();
    }
  }, [])
  
  
  return (
    <div>
      <h1>Notes</h1>


      <Link href="/notes/add">
        <a>New note</a>
      </Link>

      <br></br><br></br>
      <button onClick={doLogout}>Logout</button>
      <ul>
        {notes.map((item, id) => {
          return (
            <li key={id}>
              <Link href={`/notes/${item.id}`}>
                <a>{item.title} - {item.body}</a>
              </Link>
            </li>
          )

        })}
      </ul>
    </div>
  )
}
