import React, { useEffect, useState } from 'react'
import api from '../utils/api'

function Auth() {
  const [Authenticate, setAuthenticate] = useState(false)
  
  useEffect(() => {
    api.get("/test")
    .then((res) => {
      setAuthenticate(true)
    })
    .catch((e) => {
      alert(e)
    })
  }, [])

  return (
    <div>{Authenticate ? "Terotentikasi menggunakan httpCookie" : "Tidak terotentikasi"}</div>
  )
}

export default Auth