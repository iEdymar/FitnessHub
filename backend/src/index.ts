import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './DataSource';
import authRoutes from './routes/authRoutes';
import fileRoutes from './routes/fileRoutes';

async function startServer() {
    try {
        await AppDataSource.initialize();

        const app = express();
        const port = 3000;

        app.use(cors()); 

        app.use(express.json());

        app.use('/users', userRoutes);
        app.use('/auth', authRoutes);
        app.use('/treinos', fileRoutes);

        app.listen(port, () => {
            console.log(`Servidor escutando na porta ${port} em http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Erro ao inicializar o DataSource:', error);
        process.exit(1);
    }
}

startServer();
