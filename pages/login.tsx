import { client } from '../client';


export default function Login() {
    const doLogin = () => {
        client.signInWithPopup(); 
    }

    const doLogout = () => {
        client.signOut();
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