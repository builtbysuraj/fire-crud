import { useRef } from "react"

export default function Auth() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(emailRef.current.value)
    console.log(passwordRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={emailRef} placeholder="email" />
      <input type="text" ref={passwordRef} placeholder="password" />
      <button type="submit">submit</button>
    </form>
  )
}
