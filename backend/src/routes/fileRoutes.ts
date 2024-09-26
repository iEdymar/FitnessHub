import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { File } from "../entity/File"; 
import { authenticateToken } from "../middleware/AuthMiddleware";
import { isAdmin } from "../middleware/AdminMiddleware";
import multer from 'multer';
import fs from 'fs';
import archiver from 'archiver';
import path from 'path';

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', authenticateToken, isAdmin, upload.single('file'), async (req, res) => {
  const { title, price } = req.body;

  if (!title || price <= 0) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

    if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado' });
  }
  
  const fileBuffer = fs.readFileSync(req.file.path);

  const fileRepository = AppDataSource.getRepository(File);

  const newFile = fileRepository.create({
    title,
    price,
    content: fileBuffer 
  });

  await fileRepository.save(newFile);

  fs.unlinkSync(req.file.path);

  res.status(201).json({ data: newFile });
});

// Listar
router.get('/', authenticateToken, async (req, res) => {
    const fileRepository = AppDataSource.getRepository(File);
    const files = await fileRepository.find();

    const filesWithoutContent = files.map(file => ({
        id: file.id,
        title: file.title,
        price: file.price
    }));

    res.json({ data: filesWithoutContent });
});

router.post('/download-selected', authenticateToken, async (req, res) => {
    const { workoutIds } = req.body; 
  
    if (!workoutIds || workoutIds.length === 0) {
      return res.status(400).json({ message: 'Nenhum treino selecionado.' });
    }
  
    const fileRepository = AppDataSource.getRepository(File);
    
    const files = await fileRepository.findByIds(workoutIds); 
  
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'Nenhum arquivo encontrado.' });
    }
  
    // Dowloand formato .ZIP
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=selected_workouts.zip');
  
    const archive = archiver('zip', {
      zlib: { level: 9 } 
    });
  
    // Enviar arquivo p/o client
    archive.pipe(res);
  
    files.forEach((file) => {
      archive.append(file.content, { name: file.title + '.pdf' });
    });
  
    await archive.finalize();
  });
  

// Buscar 
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    const fileRepository = AppDataSource.getRepository(File);

    try {
        const file = await fileRepository.findOneBy({ id: parseInt(id) });

        if (!file) {
            return res.status(404).json({ message: 'Arquivo não encontrado' });
        }

        res.status(200).json({ data: file });
    } catch (error) {
        console.error('Erro ao buscar o arquivo:', error);
        res.status(500).json({ message: 'Erro ao buscar o arquivo' });
    }
});


// Atualizar
router.put('/:id', authenticateToken, isAdmin, upload.single('file'), async (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;

    const fileRepository = AppDataSource.getRepository(File);
    const file = await fileRepository.findOneBy({ id: parseInt(id) });

    if (!file) {
        return res.status(404).json({ message: 'Arquivo não encontrado' });
    }

    if (title) {
        file.title = title;
    }
    if (price && price > 0) {
        file.price = price;
    }

    if (req.file) {
        const newFileBuffer = fs.readFileSync(req.file.path);

        file.content = newFileBuffer;

        fs.unlinkSync(req.file.path);
    }

    await fileRepository.save(file);

    res.status(200).json({ data: file });
});


// Deletar
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;

    const fileRepository = AppDataSource.getRepository(File);
    const file = await fileRepository.findOneBy({ id: parseInt(id) });

    if (!file) {
        return res.status(404).json({ message: 'file not found' });
    }

    await fileRepository.remove(file);
    res.status(204).json();
});

export default router;
