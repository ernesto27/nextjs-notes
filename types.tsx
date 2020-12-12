import firebase from 'firebase';

export type Note = {
    id?: string,
    title: string,
    body: string,
    uid: string,
    updated: string
}


export type ContextType = {
    firebase: any,
    user: firebase.User | [],
    dbInstance: firebase.firestore.Firestore,
    notesData: Note[] | [],
    updateNotes: () => void
  }