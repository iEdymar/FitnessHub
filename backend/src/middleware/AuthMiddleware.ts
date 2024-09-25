import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Token não fornecido'})
    
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if(err) return res.status(403).json({ message: 'Token Invalido' })
        console.log('token verificado com sucesso', user);
        (req as any).user = user
        next()
    })
}