<template>
  <div class="home-container">
    <h1 class="title">FITNESSHUB</h1>

    <div class="workouts-list">
      <div v-for="(workout, index) in workouts" :key="index" class="workout-card">
        <span class="workout-name">{{ workout.title }}</span>
        <span class="workout-price">R$ {{ workout.price }}</span>
        <button
          :class="['btn-toggle', { 'btn-remove': isWorkoutAdded(workout) }]"
          @click="toggleWorkout(workout)"
        >
          {{ isWorkoutAdded(workout) ? 'Remover Treino' : 'Adicionar Treino' }}
        </button>
      </div>
    </div>

    <button class="btn-download" @click="downloadApp">Download e Criar Pedido</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      workouts: [], 
      addedWorkouts: [] 
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/treinos', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
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
    toggleWorkout(workout) {
      if (this.isWorkoutAdded(workout)) {
        this.removeWorkout(workout);
      } else {
        this.addWorkout(workout);
      }
    },
    addWorkout(workout) {
      this.addedWorkouts.push(workout);
      console.log(`Treino ${workout.title} adicionado.`);
    },
    removeWorkout(workout) {
      this.addedWorkouts = this.addedWorkouts.filter(
        (addedWorkout) => addedWorkout.id !== workout.id
      );
      console.log(`Treino ${workout.title} removido.`);
    },
    isWorkoutAdded(workout) {
      return this.addedWorkouts.some((addedWorkout) => addedWorkout.id === workout.id);
    },
    async downloadApp() {
      const workoutIds = this.addedWorkouts.map(workout => workout.id);

      if (workoutIds.length === 0) {
        alert('Nenhum treino selecionado para download.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/treinos/download-selected', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ workoutIds })
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'selected_workouts.zip');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          const userId = localStorage.getItem('userId'); 
          const orderResponse = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, items: workoutIds.map(id => ({ fileId: id })) })
          });

          if (orderResponse.ok) {
            const orderData = await orderResponse.json();
            console.log('Pedido criado com sucesso:', orderData);
            alert('Pedido criado com sucesso!');
          } else {
            console.error('Erro ao criar pedido:', await orderResponse.text());
            alert('Erro ao criar pedido.');
          }
        } else {
          console.error('Erro ao baixar treinos:', await response.text());
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
.home-container {
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
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.workout-name {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.workout-price {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
}

.btn-toggle {
    padding: 0.5rem 1rem;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-toggle:hover {
    background-color: #d93b00;
}

.btn-remove {
    background-color: #d60606; 
}

.btn-remove:hover {
  background-color: #7d0404
}

.btn-download {
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
}

.btn-download:hover {
    background-color: #d93b00;
}
</style>
