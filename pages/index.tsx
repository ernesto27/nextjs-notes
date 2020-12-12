import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { FirebaseContext } from '../store';
import { Note, ContextType } from '../types';

export default function Home() {

  const { notesData, firebase, updateNotes } = useContext<ContextType>(FirebaseContext);
  const [notes, setNotes ] = useState<Note[]>([]);
  const router = useRouter();

  const doLogout = () => {
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
      console.log(error)
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
