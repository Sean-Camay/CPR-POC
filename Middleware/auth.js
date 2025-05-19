import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
export const router = express.Router()

const { JWT_SECRET, JWT_EXPIRATION } = process.env

export const authenticateUser = (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' })
  }

  try {
    // Simulate user authentication (replace with your own logic)
    const user = { id: 1, username: 'testuser' } // Replace with actual user lookup

    // Check if the password is correct
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    })

    res.json({ token })
    next()
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const issueToken = (req, res, next) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const payload = {
    sub: user.id,
    email: user.email,
  }

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  })
  res.json({ token })
}

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const { email, passward } = req.body
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' })
  }
  try {
    // Simulate user authentication (replace with your own logic)
    const user = { id: 1, username: 'testuser' } // Replace with actual user lookup

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    })

    res.json({ token })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
