import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"
import { useEffect, useState } from "react"

import { useAuth0 } from "@auth0/auth0-react"
import { db } from "../firebaseConfig"
import "./App.css"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import Users from "./components/Users"

type UsersType = {
  id: string
  name: string
}

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0()
  const [input, setInput] = useState<string>("")
  const [users, setUsers] = useState<UsersType[]>([])

  const collectionRef = collection(db, "users")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      input
        ? await addDoc(collectionRef, { name: input })
        : alert("please enter correct value")
      setInput("")
    } catch (error) {
      console.log("something wrong")
    }
  }

  //deleting user
  const deleteUser = async (id: string) => {
    await deleteDoc(doc(db, "users", id))
  }

  // update edited user
  const updateUser = async (id: string, editedUser: string) => {
    await updateDoc(doc(db, "users", id), { name: editedUser })
  }

  //read & set user data
  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          ...(doc.data() as UsersType),
          id: doc.id,
        }))
      )
    })
    return () => unsubscribe()
  }, [])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      {isAuthenticated ? (
        <>
          <LogoutButton />
          <section className="container">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                placeholder="Enter name"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </form>
            <button className="btn-form" type="submit">
              Add
            </button>
          </section>
          {users?.map((user) => (
            <Users
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              updateUser={updateUser}
            />
          ))}
        </>
      ) : (
        <LoginButton />
      )}
    </>
  )
}
