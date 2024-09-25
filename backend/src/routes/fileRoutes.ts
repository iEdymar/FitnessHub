import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { file } from "../entity/file";
import { authenticateToken } from "../middleware/authmiddleware";
import { isAdmin } from "../middleware/AdminMiddleware";

const router = Router();

// Criar
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    const { title, price, stock } = req.body;

    if (!title || typeof price !== 'number' || price <= 0 || typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({ message: 'invalid data' });
    }
    
    if (!title || !price || !stock) {
        return res.status(400).json({ message: 'invalid data' });
    }

    const fileRepository = AppDataSource.getRepository(file);
    const newCD = fileRepository.create({ title, price, stock });

    await fileRepository.save(newfile);
    res.status(201).json({ data: newfile });
});

// Listar 
router.get('/', authenticateToken ,async (req, res) => {
    const fileRepository = AppDataSource.getRepository(file);
    const cds = await fileRepository.find();
    res.json({ data: files });
});

// Atualizar 
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { title, price, stock } = req.body;

    const fileRepository = AppDataSource.getRepository(file);
    const cd = await fileRepository.findOneBy({ id: parseInt(id) });

    if (!file) {
        return res.status(404).json({ message: 'training not found' });
    }

    file.title = title || file.title;
    file.price = price || file.price;
    file.stock = stock || file.stock;

    await fileRepository.save(file);
    res.status(200).json({ data: cd });
});

// Deletar
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;

    const fileRepository = AppDataSource.getRepository(file);
    const cd = await fileRepository.findOneBy({ id: parseInt(id) });

    if (!file) {
        return res.status(404).json({ message: 'training not found' });
    }

    await fileRepository.remove(file);
    res.status(204).json();
}); 

export default router;