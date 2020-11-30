import Head from 'next/head'
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { FirebaseContext } from '../store'
import { useRouter } from "next/router";

export default function Home() {

  const { notesData, dbInstance } = useContext(FirebaseContext);
  const [notes, setNotes ] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setNotes(notesData)

    if(router.query.update === 'true') {
      console.log('update data')
      var resp = [];
      dbInstance.collection("notes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            resp.push({
              id: doc.id,
              title: doc.data().title,
              body:doc.data().body,
            })
        });
        setNotes(resp)

      });
    }

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
