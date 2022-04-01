import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

// JWT Utils
import { CreateJWT, JwtMiddleware } from './utils/jwt'

// Dummy Credential
const username = "kaenova"
const password = "mahendra"

// Routing
const app = express()
const port = 3001

// Global middleware for cors, cookie parsing, and body parsing
app.use(cookieParser())
app.use(cors({
  credentials: true,
  preflightContinue: true,
  origin: ["http://127.0.0.1:3000",  "http://localhost:3000"]
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('API is active!!')
})

app.post("/login", (req, res) => {
  try {
    // Validator
    if (req.body.username == undefined || req.body.password == undefined) {
      return res.status(400).send("Not a valid request")
    }

    // Check username and password
    if (req.body.username != username || req.body.password != password) {
      return res.status(400).send("Username or password does not match")
    }

    // Create JWT Token
    let token = CreateJWT()

    // Creating Set-Cookies Header for saving JWT on httpOnly Cookies
    let date = new Date()
    date.setDate(date.getDate() + 1) // Expires in one day
    res.cookie("token", token, {
      path: "/",
      httpOnly: true, // To save on httpOnly Cookies (important!)
      sameSite: "lax",
      expires: date,
      secure: true
    })

    return res.status(200).json({
      "token": token
    })
  } catch (e) {
    return res.status(500).send(e)
  }
})

// Test Reading JWT on header Authorization or Cookie using defined function
// namely JwtMiddleware on ./utils/jwt.js
app.get("/test", JwtMiddleware, (req,res) => {
  try {
    return res.status(200).send("Congrats!")
  } catch (e) {
    return res.status(500).send("Internal server error")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})