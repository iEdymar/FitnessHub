<template>
  <div class="admin-container">
    <h1 class="title">FITNESSHUB</h1>

    <div class="workouts-list">
      <div v-for="(workout, index) in workouts" :key="index" class="workout-card">
        <span class="workout-name">{{ workout.title }}</span>
        <span class="workout-price">R$ {{ workout.price }}</span>
        <div class="workout-actions">
          <a :href="workout.downloadLink" class="btn-download" download>Baixar PDF</a>
          <button class="btn-edit" @click="editWorkout(workout)">Editar Treino</button>
          <button class="btn-delete" @click="deleteWorkout(workout)">Excluir Treino</button>
        </div>
      </div>
    </div>

    <div class="admin-actions">
      <button class="btn-admin" @click="addWorkout">Adicionar Treino</button>
      <button class="btn-users" @click="goToUsersPage">Ver Usuários</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workouts: []
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/treinos', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.workouts = data.data;
      } else {
        console.error('Erro ao buscar treinos:', await response.text());
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
    }
  },
  methods: {
  async addWorkout() {
    this.$router.push('/admin/add');
  },

  async editWorkout(workout) {
    this.$router.push(`/admin/edit/${workout.id}`);
  },

  async deleteWorkout(workout) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir o treino ${workout.title}?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/treinos/${workout.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (response.ok) {
          alert('Treino excluído com sucesso!');
          this.workouts = this.workouts.filter(w => w.id !== workout.id);
        } else {
          console.error('Erro ao excluir treino:', await response.text());
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
      }
    }
  },

  goToUsersPage() {
    this.$router.push('/users');
  },
}
}
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.title {
  font-size: 2.5rem;
  color: #ff4500;
  margin-bottom: 30px;
}

.workouts-list {
  width: 100%;
  max-width: 600px;
}

.workout-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-direction: column;
}

.workout-name {
  font-size: 1.2rem;
  color: #333;
}

.workout-price {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
}

.workout-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}

.btn-download {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
}

.btn-download:hover {
  background-color: #218838;
}

.btn-edit {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit:hover {
  background-color: #0056b3;
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

.admin-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
}

.btn-admin,
.btn-users {
  padding: 0.75rem 1.5rem;
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 48%;
}

.btn-admin:hover,
.btn-users:hover {
  background-color: #d93b00;
}
</style>
