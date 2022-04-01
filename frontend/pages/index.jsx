import { useState } from "react"
import api from "../utils/api"

export default function Home() {
  const [Request, setRequest] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Request.username == "" || Request.password == "") {
      alert("Nama atau email tidak boleh kosong")
      return
    } 
    api.post("/login", Request)
    .then((res) => {
      console.log(res)
      setTimeout(() => {
        window.location.replace("/auth")
      }, 5000);
    })
    .catch((e) => {
      alert(e)
    })
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-full">
      <div>
        <h1>Username</h1>
        <input onChange={(e) => {setRequest({...Request, username: e.target.value})}} type="text" name="" className='border-2' />
        <h1>Password</h1>
        <input onChange={(e) => {setRequest({...Request, password: e.target.value})}} type="text" name="" className='border-2' />
      </div>
      <button onClick={handleSubmit} className='border-2 p-2' type="submit">Login</button>
    </div>
  )
}
