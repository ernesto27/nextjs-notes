import firebase from 'firebase';

export type Note = {
    id?: string,
    title: string,
    body: string,
    uid: string,
    updated: string
}


export type ContextType = {
    notesData: Note[] | [],
    updateNotes: () => void
  }