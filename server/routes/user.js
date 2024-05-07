import express from 'express'
import authenticate from '../middlewares/Myauthenticate.js'

const router = express.Router()

router.get('/', authenticate, (req, res) => {
  return res.status(200).json({
    status: 'success',
    user: req.user,
  })
})

export default router
