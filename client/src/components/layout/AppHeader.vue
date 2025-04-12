<template>
  <header :class="['header', { 'header-scrolled': isScrolled }]">
    <div class="header-container">
      <div class="logo" data-aos="fade-up">AlgoEdu</div>
      <nav class="nav">

        <div class="nav-links">
          <a href="/courses" data-aos="fade-up">Kurslar</a>
          <a href="#about" data-aos="fade-up">Biz Haqimizda</a>
          <a href="#contact" data-aos="fade-up">Aloqa</a>
          <a href="/terminal" data-aos="fade-up">Terminal</a>
          <a href="/chat" data-aos="fade-up">Chat</a>
          <!-- <button @click="openModal" class="login-btn style-btn">Kirish</button> -->
          <button v-if="!isLoggin" @click="$emit('login')" class="login-btn style-btn"
            data-aos="fade-up">Kirish</button>
          <button v-if="isLoggin" @click="$emit('logout')" class="login-btn style-btn"
            data-aos="fade-up">Chiqish</button>

        </div>
      </nav>

    </div>

  </header>
</template>

<script>
// In your Vue component
export default {
  props: {
    isLoggin: Boolean
  },
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 150;
    }
  }
}
</script>

<style>
.header {
  /* padding: 2rem 4  rem; */
  position: fixed;
  background-color: transparent;
  width: 100%;
  transition: background-color 0.3s ease;
  z-index: 1000;
}

.header-scrolled {
  background-color: #000000d1;
}

.header-scrolled .header-container {
  padding: 1rem 4rem;
}

.header-container {
  padding: 2rem 4rem;
  max-width: 1440px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin: 0 auto; */
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00ff00, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
}
</style>
