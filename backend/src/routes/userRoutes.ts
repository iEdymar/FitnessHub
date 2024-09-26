import { Router } from 'express';
import { AppDataSource } from '../DataSource';
import { User } from '../entity/User';
import { Role } from '../entity/Role';
import { authenticateToken } from '../middleware/AuthMiddleware';

const router = Router();

// Criar 
router.post('/', async (req, res) => {
  const { name, username, email, password, role } = req.body;

  if (!name || !username || !email || !password || !role) {
    return res.status(400).json({
      error: {
        status: 400,
        name: 'Validation error',
        message: 'You missed a required field',
      },
    });
  }

  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  let roleInDB = await roleRepository.findOne({ where: { name: role } });
  if (!roleInDB) {
    roleInDB = roleRepository.create({ name: role });
    await roleRepository.save(roleInDB);
  }

  const newUser = userRepository.create({
    name,
    username,
    email,
    password,
    role: roleInDB,
  });

  await userRepository.save(newUser);
  res.status(201).json({ data: newUser });
});

// Listar
router.get('/', authenticateToken, async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: ['role'] });
  res.json({ data: users });
});

// Buscar 
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: parseInt(id),
    },
    relations: ['role'],
  });

  if (!user) {
    return res.status(404).json({
      error: {
        status: 404,
        name: 'NotFound',
        message: 'User not found',
      },
    });
  }

  res.json({ data: user });
});

// Atualizar
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password, role } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  const user = await userRepository.findOne({
    where: {
      id: parseInt(id),
    },
    relations: ['role'],
  });

  if (!user) {
    return res.status(404).json({
      error: {
        status: 404,
        name: 'NotFound',
        message: 'User not found',
      },
    });
  }

  let roleInDB = await roleRepository.findOne({ where: { name: role } });

  if (!roleInDB) {
    roleInDB = roleRepository.create({ name: role });
    await roleRepository.save(roleInDB);
  }

  user.name = name || user.name;
  user.username = username || user.username;
  user.email = email || user.email;
  user.password = password || user.password;
  user.role = roleInDB || user.role;

  await userRepository.save(user);

  res.status(200).json({ data: user });
});

// Deletar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: parseInt(id) } });

  if (!user) {
    return res.status(404).json({
      error: {
        status: 404,
        name: 'NotFound',
        message: 'User not found',
      },
    });
  }

  await userRepository.remove(user);

  res.status(202).json({ data: user });
});

export default router;
