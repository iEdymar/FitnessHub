import express from 'express';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './DataSource';

async function startServer() {
    try {
        // Inicializa a conexão com o banco de dados
        await AppDataSource.initialize();

        // Inicializa o servidor Express
        const app = express();
        const port = 3000;

        // Configuração de middleware
        app.use(express.json());
        app.use('/users', userRoutes); // Define as rotas de usuário

        // Inicia o servidor
        app.listen(port, () => {
            console.log(`Servidor escutando na porta ${port} em http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Erro ao inicializar o DataSource:', error);
        process.exit(1); // Finaliza o processo se houver erro crítico
    }
}

// Chama a função para iniciar o servidor
startServer();
