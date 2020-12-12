import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/router";
import { FirebaseContext } from '../../store'
import { Note, ContextType } from '../../types';
import { client } from '../../client';


export default function EditNote() {
    const { notesData } = useContext<ContextType>(FirebaseContext);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if(notesData[0] !== undefined ) {
            const item:Note = notesData.find((element:Note) => element.id === router.query.id.toString());
            setTitle(item.title);
            setBody(item.body);
        }
        
    }, [notesData]);

    const editNote = () => {
        client.editNote(title, body, router.query.id.toString(), (docRef) => {
            console.log("Document updated with ID: ", docRef);
            router.push({
                pathname: '/',
                query: { 'update': true }
            });
        });
    }

    const deleteNote = () => {
        client.deleteNote(router.query.id.toString(), (docRef) => {
            alert('Document deleted');
            router.push({
                pathname: '/',
                query: { 'update': true }
            });
        });
    }

    return (
        <div>
            <h1>View - Edit note</h1>
            <form>
                <p>Title</p>
                <input
                    type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <p>body</p>
                <input 
                    type="text" value={body} onChange={(e) => setBody(e.target.value)}  />
                <br />
                <br />
                <input 
                    onClick={editNote} 
                    type="button" 
                    value="Edit" />

                <input 
                    style={{ "marginLeft": "8px" }}
                    onClick={deleteNote} 
                    type="button" 
                    value="Delete" />
            </form>
        </div>
    )
}


