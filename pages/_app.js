import '../styles/globals.css'
import { FirebaseContextProvider } from '../store'

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContextProvider>
      <Component {...pageProps} />
    </FirebaseContextProvider>
  )
}

export default MyApp
