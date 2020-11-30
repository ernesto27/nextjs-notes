import Head from 'next/head'
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { FirebaseContext } from '../store'

export default function Home() {

  const { notesData } = useContext(FirebaseContext);
  const [notes, setNotes ] = useState([]);

  useEffect(() => {
    setNotes(notesData)

  }, [notesData])
  
  
  return (
    <div>
      <h1>Notes</h1>


      <Link href="/notes/add">
        <a>New note</a>
      </Link>
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
