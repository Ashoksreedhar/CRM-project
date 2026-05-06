import { Router } from "express";
import { userRegisteration, userLogin, allUsers, addUser,userUpdate,userDelete } from "../controllers/controllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router()

router.post('/register', userRegisteration)
router.post('/login', userLogin)

router.post('/addusers', addUser)
router.get('/allusers',protect, allUsers)
router.put('/update/:id',userUpdate)
router.delete('/delete/:id',userDelete)

export default router