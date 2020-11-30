import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store'
import { useRouter } from "next/router";


export default function EditNote() {
    const { notesData, dbInstance } = useContext(FirebaseContext);
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
        console.log(router.query.id)
        dbInstance.collection("notes").doc(router.query.id).update({
            title: title,
            body: body
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
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
            </form>
        </div>
    )
}


