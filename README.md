# FitnessHub   

Uma loja online destinada a vendas de produtos digitais com foco fitness.

Para executar este projeto siga os passos descritos no arquivo [passo-a-passo](passo-a-passo.md)

## Membros da equipe

Francisco Edimar Matias de Sousa, 541087, Design Digital <br>
Tony Matheus de Lima Oliveira, 540684, Design Digital

## Papéis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador

## Entidades ou tabelas do sistema

- Usuário
- Planilhas e Ebooks
- Comentário

## Principais funcionalidades da aplicação

- Usuário não registrador poderão ver a descrição dos produtos e comentários a respeito deles.
- Usuário registrado pode ver os produtos por dentro, como planilhas de treinos e ebooks. Adicionalmente, eles podem escrever comentários sobre eles.
- O adminstrador da loja pode: adicionar, remover e atualizar/editar as planilhas ou ebooks.

## Tecnologias e frameworks utilizados

**Frontend:**

- VueJS

**Backend:**

- Node e Express


## Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário |  |  |  |  |
| Planilha/Ebooks | X  | X |  X | X |
| Comentário | X |  X  |  | X |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| POST | /auth/local |
| GET | /users/me |
| GET | /api/planilhas |
| GET | /api/planilhas/{id} |
| POST | /api/planilhas |
| PUT | /api/planilhas/{id} |
| DELETE | /api/planilhas/{id} |
