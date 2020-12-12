import { useState, useContext } from 'react';
import { useRouter } from "next/router";
import firebase from 'firebase';
import { FirebaseContext } from '../../store'
import { Note, ContextType } from '../../types';

export default function AddNote() {
    const { dbInstance, firebase } = useContext<ContextType>(FirebaseContext);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const router = useRouter();

    const addNote = () => {

        const user:firebase.User = firebase.auth().currentUser;
        // Validate input

        const note:Note = {
            body: body,
            title: title,
            updated: new Date().getTime().toString(),
            uid: user.uid
        }
        dbInstance.collection("notes").add(note)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert('New note added');
            router.push({
                pathname: '/',
                query: { 'update': true }
            });
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
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