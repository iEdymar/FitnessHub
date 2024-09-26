<template>
  <div class="login-container">
    <h1 class="title">FITNESSHUB</h1>
    <div class="login-box">
      <label for="username">Usuário</label>
      <input type="text" id="username" v-model="username" placeholder="Digite seu usuário" />

      <label for="password">Senha</label>
      <input type="password" id="password" v-model="password" placeholder="Digite sua senha" />

      <div class="buttons">
        <button @click="login">Entrar</button>
        <button @click="register">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          const token = data.token;

          const decoded = jwtDecode(token);
          const role = decoded.role;
          const id = decoded.id;

          this.authStore.setAuthData({
            token: token,
            role: role,
            id: id
          });

          console.log(role)
          if(role === "Admin"){
            this.$router.push('/admin');
          }else{
            this.$router.push('/home');
          }
        } else {
          alert('Falha no login. Verifique suas credenciais.');
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao conectar com o servidor.');
      }
    },
    register() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #FD4500;
}

.login-box {
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

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #FD4500;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #fd4500;
}
</style>
