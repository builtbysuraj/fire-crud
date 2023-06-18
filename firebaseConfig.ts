import { getFirestore } from "@firebase/firestore"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  projectId: `${import.meta.env.VITE_PROJECT_ID}`,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
