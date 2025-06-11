<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <span class="close-btn" @click="$emit('close')">&times;</span>
      <h2 class="logo">Sign In</h2>

      <div v-if="userStore.error" class="error-message">
        {{ userStore.error }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Username</label>
          <input v-model="credentials.username" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="credentials.password" required>
        </div>
        <button type="submit" class="submit-btn style-btn" :disabled="userStore.loading">
          {{ userStore.loading ? 'Loading...' : 'Sign In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useUserStore } from '../../stores/user.store';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  emits: ['close'],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const router = useRouter();

    const credentials = reactive({
      username: '',
      password: ''
    });

    const handleSubmit = async () => {
      try {
        await userStore.login(credentials);
        emit('close');
        router.push('/'); // Yoki boshqa kerakli sahifaga yo'naltirish
      } catch (error) {
        // Xatolik store'da handle qilingan
        console.error('Login failed');
      }
    };

    return {
      userStore,
      credentials,
      handleSubmit
    };
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
      console.log('test', this.showModal);
    },
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style>
.login-btn {
  transition: all 0.3s ease;
  background: linear-gradient(90deg, #0f0, #0c2e0c);
  background-clip: border-box;
  border: 1px solid #5b5858;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-btn:hover {
  transform:scale(3)
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(12, 12, 12, 0.767);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.submit-btn {
  background: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.btn {
  background: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
</style>
