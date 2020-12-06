import { FirebaseContext } from '../../store'
import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/router";

export default function AddNote() {
    const { dbInstance, firebase } = useContext(FirebaseContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();

    const addNote = () => {

        const user = firebase.auth().currentUser;
        // Validate input
         dbInstance.collection("notes").add({
            body: body,
            title: title,
            updated: new Date().getTime(),
            uid: user.uid
        })
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
                    onKeyDown={(e) => setTitle(e.target.value)} 
                    type="text" />

                <p>body</p>
                <input 
                    onKeyDown={(e) => setBody(e.target.value)} 
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