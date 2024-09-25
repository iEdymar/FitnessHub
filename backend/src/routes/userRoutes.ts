import { Router } from 'express'
import { AppDataSource } from '../DataSource'
import { User } from '../entity/User'
import { Role } from '../entity/Role'

const router = Router()

const users: User[] = []

//criar
router.post('/users', async (req, res) => {
    const {name, username, email, password, role} = req.body
    if(!name || !username || !email || !password || !role) {
        return res.status(400).json({
            error: {
                status: 400,
                name: 'Validation error',
                message: 'You missed a required field'
            }
        })
    }


    const userRepository = AppDataSource.getRepository(User)
    const roleRepository = AppDataSource.getRepository(Role)

    let roleInDB = await roleRepository.findOne({ where: { name: role}})
    if(!roleInDB) {
        roleInDB = roleRepository.create({ name: role })
        await roleRepository.save(roleInDB)
    }

    const newUser = userRepository.create({
        name,
        username,
        email,
        password,
        role: roleInDB
    })

    await userRepository.save(newUser)
    res.status(201).json
    data: newUser
})

//listar 
router.get('/users', authenticateToken, async (req, res) => {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({ relations: ['role']})
    res.json({
        data: users
    })
})

router.get('/:id', async(req, res) => {
    const { id } = req.params
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({ 
        where: {
            id: parseInt(id)
        }, 
        relations: ['role']})

    if(!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'UserNotFound'
            }
        })
    }

    res.json({
        data: user
    })
})


router.put('/:id', async(req, res) => {
    const { id } = req.params
    const {name, username, email, password, role} = req.body

    const userRepository = AppDataSource.getRepository(User)
    const roleRepository = AppDataSource.getRepository(Role)
    const user = await userRepository.findOne({
        where: {
            id: parseInt(id)
        },
        relations: ['role']
    })
    if(!user) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'User Not Found'
            }
        })
    }
    let roleInDB = await roleRepository.findOne({ where: { name: role}})


    if(!roleInDB) {
        roleInDB = roleRepository.create({ name: role})
        await roleRepository.save(roleInDB)
    }

    const userIndex = users.findIndex(u => u.id === parseInt(id))


    const updateUser = {
        id: parseInt(id),
        name: name || users[userIndex].name,
        username: username || users[userIndex].username,
        password: password || users[userIndex].password,
        email: email || users[userIndex].email,
        role: role || users[userIndex].role
    }

    users[userIndex] = updateUser
    res.status(200).json ({
        data:updateUser
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const userIndex = users.findIndex(u => u.id === parseInt(id))

    if (userIndex == -1) {
        return res.status(404).json({
            error: {
                status: 404,
                name: 'NotFound',
                message: 'UserNotFound',
            }
        })
    }

    const deletedUser = users.splice(userIndex, 1) [0]
    res.status(202).json ({
        data: deletedUser
    })
})


export default router