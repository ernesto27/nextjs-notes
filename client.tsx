import firebase from 'firebase';
import { Note } from './types';

export const client = {

    init() {
        console.log('Init client');
        var firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
            databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_MESSASING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_APP_ID
          };  
        firebase.initializeApp(firebaseConfig);
    },

    getDB() {
        return firebase.firestore();
    },

    onAuthStateChanged(cb: Function) {
        firebase.auth().onAuthStateChanged(function(user: firebase.User) {
            cb(user);
        });
    },

    signInWithPopup() {
        let provider:firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // // The signed-in user info.
            // var user = result.user;
            console.log(result)
            // ...
        }).catch(function(error) {
            console.log(error)
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
        });
    },

    signOut() {
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        });
    },
    
    getNotes(cb: Function) {
        var resp: Note[] = [];
        const db = client.getDB();
        const user: firebase.User = firebase.auth().currentUser;
        db.collection("notes").where('uid', '==', user.uid ).orderBy('updated', 'desc').get().then((querySnapshot: firebase.firestore.DocumentData) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().title}`);
                resp.push({
                    id: doc.id,
                    title: doc.data().title,
                    body:doc.data().body,
                    uid: doc.data().uid,
                    updated: doc.data().updated,
                })
            });
            cb(resp);
        });
    },

    editNote(title: string, body: string, id: string, cb: Function) {
        const user:firebase.User = firebase.auth().currentUser;

        const note:Note = {
            title: title,
            body: body,
            updated: new Date().getTime().toString(),
            uid: user.uid
        }

        const db = client.getDB();
        db.collection("notes").doc(id).update(note)
        .then(function(docRef) {
            cb(docRef);
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
            alert("Error updating document: ")
        });
    },

    deleteNote(id: string, cb: Function) {
        const db = client.getDB();
        db.collection("notes").doc(id).delete()
        .then(function(docRef) {
            cb(docRef)
        })
        .catch(function(error) {
            console.error("Error deleting document: ", error);
        });
    },

    addNote(title: string, body: string, cb: Function) {
        const user:firebase.User = firebase.auth().currentUser;

        const note:Note = {
            body: body,
            title: title,
            updated: new Date().getTime().toString(),
            uid: user.uid
        }
        const db = client.getDB();
        db.collection("notes").add(note)
        .then(function(docRef) {
            cb(docRef)
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

}