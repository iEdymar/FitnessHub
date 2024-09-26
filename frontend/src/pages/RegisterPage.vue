<template>
  <div class="register-container">
    <h1 class="title">FITNESSHUB</h1>
    <div class="register-box">
      <label for="name">Nome</label>
      <input type="text" id="name" v-model="name" placeholder="Digite seu nome" />

      <label for="username">Usuário</label>
      <input type="text" id="username" v-model="username" placeholder="Digite seu usuário" />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail" />

      <label for="password">Senha</label>
      <input type="password" id="password" v-model="password" placeholder="Digite sua senha" />

      <button class="btn-register" @click="register">Cadastrar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      const userData = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        role: 'User'
      };

      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData) 
        });
        if (response.ok) {
          this.$router.push('/login');
        } else {
          const errorData = await response.json();
          console.error('Erro ao cadastrar:', errorData);
          alert('Erro ao cadastrar: ' + errorData.message);
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert('Erro ao conectar com o servidor.');
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #ff4500; 
}

.register-box {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem;
  color: #333;
}

input {
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.btn-register {
  margin-top: 1.5rem;
  padding: 0.75rem;
  border: none;
  background-color: #ff4500;
  color: white;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%; 
}

.btn-register:hover {
  background-color: #d93b00; 
}
</style>
