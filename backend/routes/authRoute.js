import express, { Router } from 'express'
import { googleAuth, logoutUser } from '../controllers/authController.js';


const router = express.Router();

router.post('/google', googleAuth)
router.get('/logout', logoutUser) // use get becz ham kisiko veg nhi rehe

export default router