import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async(req, res) => {
    const { username, password } = req.body
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { username }, relations: ['role']});
    if (!user || password !== user.password) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos'})
    }

    const token = jwt.sign({ id: user.id, role: user.role.name }, process.env.JWT_SECRET!, { expiresIn: '1h'})
    res.status(200).json({ token });
})

export default router