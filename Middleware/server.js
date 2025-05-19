import express from 'express'
import { authRouter, authenticateUser, issueToken } from './auth.js'

const app = express()
app.use(express.json())

app.use('/api', authRouter)

router.post(
  '/login',
  authenticateUser, // 1️⃣ check creds, populate req.user
  issueToken // 2️⃣ sign JWT & send it back
)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
