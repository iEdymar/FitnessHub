<template>
    <div class="user-management-container">
      <h1 class="title">FITNESSHUB</h1>
  
      <div class="add-user-container">
        <button class="btn-add-user" @click="addUser">
          Adicionar Usuário
        </button>
      </div>
  
      <table class="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role.name }}</td>
            <td>
              <button class="btn-edit" @click="editUser(user)">Editar</button>
              <button class="btn-delete" @click="deleteUser(user)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: []
      };
    },
    async created() {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          this.users = data.data;
        } else {
          console.error('Erro ao buscar usuários:', await response.text());
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
      }
    },
    methods: {
  addUser() {
    this.$router.push('/users/add');
  },
  editUser(user) {
    this.$router.push(`/users/edit/${user.id}`);
  },
  async deleteUser(user) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (response.ok) {
          alert('Usuário excluído com sucesso');
          this.users = this.users.filter((u) => u.id !== user.id);
        } else {
          console.error('Erro ao excluir usuário:', await response.text());
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
      }
    }
  },
},
  }
  </script>
  
  <style scoped>
  .user-management-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .title {
    font-size: 2.5rem;
    color: #ff4500;
    margin-bottom: 30px;
  }
  
  .add-user-container {
    margin-bottom: 20px;
  }
  
  .btn-add-user {
    padding: 0.75rem 1.5rem;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
  }
  
  .btn-add-user:hover {
    background-color: #d93b00;
  }
  
  .user-table {
    width: 80%;
    max-width: 1000px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .user-table th,
  .user-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .user-table th {
    background-color: #ff4500;
    color: white;
  }
  
  .user-table tr:hover {
    background-color: #f9f9f9;
  }
  
  .btn-edit {
    padding: 0.5rem 1rem;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  
  .btn-edit:hover {
    background-color: #d93b00;
  }
  
  .btn-delete {
    padding: 0.5rem 1rem;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-delete:hover {
    background-color: #cc0000;
  }
  </style>
  