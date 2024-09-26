<template>
    <div class="add-workout-container">
        <h1 class="title">FITNESSHUB</h1>

        <div class="input-section">
            <label for="workout-name">Insira o nome do treino</label>
            <input type="text" id="workout-name" v-model="workoutName" placeholder="Digite o nome do treino" />
        </div>

        <div class="input-section">
            <label for="workout-price">Insira o preço</label>
            <input type="number" id="workout-price" v-model.number="workoutPrice" placeholder="Digite o preço do treino" />
        </div>

        <div class="input-section">
            <label for="workout-content">Insira aqui o conteúdo</label>
            <div class="drop-zone" @dragover.prevent @drop.prevent="handleDrop" @click="triggerFileUpload">
                <p v-if="!selectedFile">Arraste um arquivo ou clique para selecionar</p>
                <p v-else>{{ selectedFile.name }}</p>
                <input type="file" ref="fileInput" @change="handleFileUpload" accept=".pdf" style="display: none;" />
            </div>
        </div>

        <button class="btn-add-workout" @click="submitWorkout">{{ isUpdating ? 'Atualizar Treino' : 'Adicionar Treino' }}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            workoutName: '',
            workoutPrice: '',
            selectedFile: null,
            isUpdating: false, 
            workoutId: null 
        };
    },
    async created() {
        const workoutId = this.$route.params.id; 
        if (workoutId) {
            this.isUpdating = true;
            this.workoutId = workoutId;

            try {
                const response = await fetch(`http://localhost:3000/treinos/${workoutId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    this.workoutName = data.title;
                    this.workoutPrice = data.price;
                } else {
                    alert('Erro ao carregar o treino.');
                }
            } catch (error) {
                console.error('Erro ao buscar treino:', error);
            }
        }
    },
    methods: {
        async submitWorkout() {
            const price = Number(this.workoutPrice);
            if (!this.workoutName || isNaN(price) || price <= 0 || (!this.selectedFile && !this.isUpdating)) {
                alert('Por favor, preencha o nome, insira um preço válido e selecione um arquivo.');
                return;
            }

            const formData = new FormData();
            formData.append('title', this.workoutName);
            formData.append('price', price);

            if (this.selectedFile) {
                formData.append('file', this.selectedFile); 
            }
            const method = this.isUpdating ? 'PUT' : 'POST';
            const url = this.isUpdating
                ? `http://localhost:3000/treinos/${this.workoutId}`
                : 'http://localhost:3000/treinos';

            try {

                const response = await fetch(url, {
                    method: method,
                    body: formData,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Treino processado com sucesso:', data);
                    alert(this.isUpdating ? 'Treino atualizado com sucesso!' : 'Treino adicionado com sucesso!');
                } else {
                    const errorData = await response.json();
                    console.error('Erro ao processar treino:', errorData);
                    alert('Erro ao processar treino: ' + errorData.message);
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor:', error);
                alert('Erro ao conectar com o servidor.');
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file && file.type === 'application/pdf') {
                this.selectedFile = file;
            } else {
                alert('Por favor, selecione um arquivo válido.');
            }
        },
        handleDrop(event) {
            const file = event.dataTransfer.files[0];
            if (file && file.type === 'application/pdf') {
                this.selectedFile = file;
            } else {
                alert('Por favor, arraste um arquivo válido.');
            }
        },
        triggerFileUpload() {
            this.$refs.fileInput.click();
        }
    }
};
</script>

<style scoped>
.add-workout-container {
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

.input-section {
    margin-bottom: 20px;
    width: 100%;
    max-width: 500px;
}

label {
    font-size: 1rem;
    color: #333;
    display: block;
    margin-bottom: 10px;
}

input[type="text"],
input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.drop-zone {
    width: 100%;
    padding: 30px;
    border: 2px dashed #ddd;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background-color: white;
}

.drop-zone p {
    color: #666;
}

.btn-add-workout {
    margin-top: 20px;
    padding: 0.75rem 1.5rem;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    width: 100%;
    max-width: 200px;
}

.btn-add-workout:hover {
    background-color: #d93b00;
}
</style>
