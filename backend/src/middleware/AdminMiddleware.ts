import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role
    if (userRole !== 'Admin') {
        console.log('Acesso negado. Usuario não é admin')
        return res.status(403).json({ message: 'Acesso negado. Somente administradores podem acessar.'})
    }
    next()
}