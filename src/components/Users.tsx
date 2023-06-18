import { useState } from "react"

type UsersType = {
  id: string
  name: string
}

type Props = {
  deleteUser: (id: string) => Promise<void>
  updateUser: (id: string, editedUser: string) => void
  user: UsersType
}

export default function Users({ user, deleteUser, updateUser }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedUser, setEditedUser] = useState<string>(user.name)

  // update the user on click of save button
  const handleSave = () => {
    updateUser(user.id, editedUser)
    setIsEditing(false)
  }

  return (
    <div>
      <section className="user-container" key={user.id}>
        {isEditing ? (
          <input
            className="edit-input"
            type="text"
            value={editedUser}
            autoFocus
            onChange={(e) => setEditedUser(e.target.value)}
          />
        ) : (
          <span> {user.name} </span>
        )}
        <div className="btn-wrapper">
          <button className="btn-delete" onClick={() => deleteUser(user.id)}>
            delete
          </button>
          {isEditing ? (
            <button className="btn-save" onClick={handleSave}>
              save
            </button>
          ) : (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              edit
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
