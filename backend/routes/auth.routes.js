import { Router } from "express";
import { getAllusers, loginUser, registerUser } from "../controllers/auth.controllers.js";

const router  = Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/users/', getAllusers)

export default router