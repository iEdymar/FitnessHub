# FitnessHub   

Uma loja online especializada na venda de fichas de treino digital.

## Membros da equipe

Francisco Edimar Matias de Sousa, 541087, Design Digital <br>
Tony Matheus de Lima Oliveira, 540684, Design Digital

## Papéis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador

## Entidades ou tabelas do sistema

- Usuário
- Ficha de Treino
- Comentário

## Principais funcionalidades da aplicação

- Usuários não registrados poderão ver a descrição do produto e os comentários a respeito dele.
- Usuários registrados têm acesso ao conteúdo completo das fichas de treino, incluindo dentro do conteúdo planilhas e e-books. Além disso, têm permissão para deixar comentários sobre esses materiais.
- O administrador da loja pode adicionar, remover, atualizar e editar os conteudos dentro da ficha de treino.

## Tecnologias e frameworks utilizados

**Frontend:**

- VueJS

**Backend:**

- Node e Express


## Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário |  |  |  |  |
| Ficha de Treino | X  | X |  X | X |
| Comentário | X |  X  |  | X |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| POST | /auth/local |
| GET | /users/me |
| GET | /api/ficha |
| GET | /api/ficha/{id} |
| POST | /api/ficha |
| PUT | /api/ficha/{id} |
| DELETE | /api/ficha/{id} |
