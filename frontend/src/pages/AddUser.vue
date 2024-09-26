<template>
    <div class="add-user-container">
      <h1 class="title">{{ isEditMode ? 'FITNESSHUB' : 'FITNESSHUB' }}</h1>
  
      <form @submit.prevent="isEditMode ? updateUser() : createUser()">
        <div class="form-group">
          <label for="name">Nome:</label>
          <input type="text" id="name" v-model="name" placeholder="Digite o nome" required />
        </div>
  
        <div class="form-group">
          <label for="username">Usuário:</label>
          <input type="text" id="username" v-model="username" placeholder="Digite o nome de usuário" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Digite o email" required />
        </div>
  
        <div class="form-group" v-if="!isEditMode">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" placeholder="Digite a senha" required />
        </div>

        <div class = 'form-group'>
            <label for="role">Função:</label>
            <select id="role" v-model="role" required>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
        </div>
  
        <button class="btn-create" type="submit">
          {{ isEditMode ? 'Atualizar Usuário' : 'Adicionar Usuário' }}
        </button>
      </form>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        isEditMode: false,
      };
    },
    async created() {
      const userId = this.$route.params.id;
  
      if (userId) {
        this.isEditMode = true;
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
          });
          const data = await response.json();
          const user = data.data;
  
          this.name = user.name;
          this.username = user.username;
          this.email = user.email;
        } catch (error) {
          console.error('Erro ao buscar o usuário:', error);
        }
      }
    },
    methods: {
      async createUser() {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role,
          }),
        });
  
        if (response.ok) {
          alert('Usuário adicionado com sucesso!');
          this.$router.push('/users');
        }
      },
      async updateUser() {
        const userId = this.$route.params.id;
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({
            name: this.name,
            username: this.username,
            email: this.email,
            role: this.role
          }),
        });
  
        if (response.ok) {
          alert('Usuário atualizado com sucesso!');
          this.$router.push('/users');
        }
      },
    },
  };
  </script>
  
<style scoped>
.add-user-container {
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

form {
    width: 100%;
    max-width: 500px;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
}

input,
select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
    margin-bottom: 1rem;
}

.btn-create {
    padding: 0.75rem 1.5rem;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    width: 100%;
}

.btn-create:hover {
    background-color: #d93b00;
}
</style>