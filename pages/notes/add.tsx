import { useState } from 'react';
import { useRouter } from "next/router";
import { client } from '../../client';

export default function AddNote() {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const router = useRouter();

    const addNote = () => {
        client.addNote(title, body, (docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('New note added');
            router.push({
                pathname: '/',
                query: { 'update': true }
            });
        });
    }

    return (
        <div>
            <h2>Add note</h2>
            <form>
                <p>Title</p>
                <input
                    onKeyDown={(e) => setTitle(e.currentTarget.value)} 
                    type="text" />

                <p>body</p>
                <input 
                    onKeyDown={(e) => setBody(e.currentTarget.value)} 
                    type="text" />
                <br />
                <br />
                <input
                    onClick={addNote} 
                    type="button" 
                    value="send" />
            </form>
        </div>
    )   
}