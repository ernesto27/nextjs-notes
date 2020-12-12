import { useEffect,  useContext } from 'react';
import { FirebaseContext } from '../store';
import { ContextType } from '../types';
import firebase from 'firebase';


export default function Login() {
    const { firebase, user } = useContext<ContextType>(FirebaseContext);

    useEffect(() => {
        console.log('LOGIN USER' , user)
    }, [user])

    const doLogin = () => {

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
    }

    const doLogout = () => {
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        });
    }

    return (
        <div>
            <br></br>
            <button onClick={doLogin}>Login</button>

            <br></br><br></br>
            <button onClick={doLogout}>Logout</button>
        </div>
    )
}