import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store'
import { useRouter } from "next/router";


export default function EditNote() {
    const { notesData, dbInstance, firebase } = useContext(FirebaseContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();

    useEffect(() => {
        if(notesData[0] !== undefined ) {
            const item = notesData.find(element => element.id === router.query.id);
            setTitle(item.title);
            setBody(item.body);
        }
        
    }, [notesData]);

    const editNote = () => {
        const user = firebase.auth().currentUser;
        dbInstance.collection("notes").doc(router.query.id).update({
            title: title,
            body: body,
            updated: new Date().getTime(),
            uid: user.uid
        })
        .then(function(docRef) {
            console.log("Document updated with ID: ", docRef);
            router.push({
                pathname: '/',
                query: { 'update': true }
            });
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
            alert("Error updating document: ", error)
        });
    }

    const deleteNote = () => {
        dbInstance.collection("notes").doc(router.query.id).delete()
        .then(function(docRef) {
            console.log("Document deleted");
            alert('Document deleted');
            router.push({
                pathname: '/',
                query: { 'update': true }
            });
        })
        .catch(function(error) {
            console.error("Error deleting document: ", error);
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


