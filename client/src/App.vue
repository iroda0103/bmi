<!-- App.vue -->
<template>
  <div class="main-container">
    <!-- <Video></Video> -->
    <AppHeader @login="openModal" :isLoggin="isLoggin"></AppHeader>
    <Login v-if="showModal && !isLoggin" @close="closeModal"></Login>
    <!-- <main class="app-content">
      <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/login">Go to About</RouterLink>
  </nav>
    </main>

    <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/login">Go to About</RouterLink>
  </nav> -->
    <main>
      <RouterView />
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Login from './components/cards/Login.vue';
import Video from './components/cards/Video.vue';
import AppFooter from './components/layout/AppFooter.vue';
import AppHeader from './components/layout/AppHeader.vue';
import AppMain from './components/layout/AppMain.vue';

export default {
  name: 'App',
  emits: ['login', 'close'],
  components: {
    AppHeader,
    AppMain,
    Video,
    Login,
    AppFooter
  },
  data() {
    return {
      showModal: false,
      email: '',
      password: '',
      isLoggin: false
    }
  },
  mounted() {
    // this.init3DScene()
  },
  methods: {
    openModal() {
      this.showModal = true

      console.log('test', this.showModal);

    },
    closeModal() {
      this.showModal = false
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggin = true
      }
    },
    // handleSubmit() {
    //   // Formani yuborish logikasi
    //   console.log('Submitted:', {
    //     email: this.email,
    //     password: this.password
    //   })
    //   this.closeModal()
    // },
  }
}

</script>

<style>
.main-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  /* overflow: hidden; */
  /* background-image: url('./assets/bg.jpg'); */
}


.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(90, 90, 90, 0.671); */
  background: rgba(0, 0, 0, 0.6);
}

main {
  padding-top: 80px;
}
</style>