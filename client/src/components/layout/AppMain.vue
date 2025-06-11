<template>
  <div class="">
    <div class="container hero">
      <div class="hero-content" data-aos="fade-up">
        <h1 class="title">Zamonaviy Dasturlash Tillarini O'rganing</h1>
        <div class="cta-buttons">
          <button class="primary-btn style-btn">Bepul Boshlash</button>
          <button class="secondary-btn">Ko'proq Ma'lumot</button>
        </div>
      </div>

      <div class="three-d-container" ref="container"></div>
      <div class="circle">JS</div>


    </div>

    <section class="container features">
      <div class="feature-card" data-aos="fade-up" v-for="(feature, index) in features" :key="index">
        <i :class="feature.icon"></i>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </section>

    <div class="skills">
      <div class="container"> <a href="https://github.com/iroda0103/iroda0103">
          <img
            src="https://readme-components.vercel.app/api?component=logo&fill=black&logo=react&animation=spin&svgfill=15d8fe">
        </a>
        <a href="https://github.com/iroda0103/iroda0103">
          <img src="https://readme-components.vercel.app/api?component=logo&fill=black&logo=typescript&svgfill=2d79c7">
        </a>

        <a href="https://github.com/iroda0103/iroda0103">
          <img src="https://readme-components.vercel.app/api?component=logo&fill=black&logo=node.js&svgfill=659b60">
        </a>
        <a href="https://github.com/iroda0103/iroda0103">
          <img src="https://readme-components.vercel.app/api?component=logo&fill=black&logo=sass&svgfill=cd6799">
        </a>

        <a href="https://github.com/iroda0103/iroda0103">
          <img
            src="https://readme-components.vercel.app/api?component=logo&fill=black&logo=react&animation=spin&svgfill=15d8fe">
        </a>
        <a href="https://github.com/iroda0103/iroda0103">
          <img src="https://readme-components.vercel.app/api?component=logo&fill=black&logo=typescript&svgfill=2d79c7">
        </a>
        <a href="https://github.com/iroda0103/iroda0103">
          <img
            src="https://readme-components.vercel.app/api?component=logo&fill=black&logo=react&animation=spin&svgfill=15d8fe">
        </a>
      </div>


    </div>

    <CourseCarusel id="courses"></CourseCarusel>
  </div>
</template>

<script>
import * as THREE from 'three';
import CourseCarusel from './CourseCarusel.vue';

export default {
  name: 'AppMain',
  components: { CourseCarusel },
  data() {
    return {
      features: [
        {
          icon: 'fas fa-code',
          title: 'Interaktiv Darslar',
          description: 'Amaliy mashg`ulotlar orqali o`rganing'
        },
        {
          icon: 'fas fa-users',
          title: 'Professional Mentorlar',
          description: 'Tajribali dasturchilardan bilim oling'
        },
        {
          icon: 'fas fa-certificate',
          title: 'Sertifikatlar',
          description: 'Xalqaro tan olingan sertifikatlarni qo`lga kiriting'
        }
      ]
    }
  },
  mounted() {
    this.init3DScene()
  },
  methods: {
    init3DScene() {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ alpha: true })

      renderer.setSize(500, 500)
      this.$refs.container.appendChild(renderer.domElement)

      // Create floating code blocks
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.7
      })

      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      // Add lights
      const light = new THREE.PointLight(0x00ff00, 1, 100)
      light.position.set(10, 10, 10)
      scene.add(light)

      camera.position.z = 5

      const animate = () => {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
      }

      animate()
    }
  }
}
</script>

<style>
@keyframes changePosition {
  0% {
    transform: translateY(0);
  }

  50% {
    /* transform: translateY(10px); */
    width: 70px;
    height: 35px;
  }

  100% {
    transform: translateY(0);
  }
}

.style-btn {
  /* background: linear-gradient(130deg, #00ff00, #00ffff) !important; */
  background: linear-gradient(90deg, #0f0, #0c2e0c);
  background-clip: border-box;
  border: 1px solid #5b5858;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem;
  /* min-height: 80vh; */
  /* margin: 115px 50px 20px 50px; */
  border-radius: 50px;
  /* background: rgba(0, 0, 0, 0.774); */
}

.hero-content {
  max-width: 600px;
  color: white;
}

.title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #00ff00, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.primary-btn,
.secondary-btn {
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* .primary-btn {
  background: #00ff00;
  border: none;
  color: black;
} */

.secondary-btn {
  background: transparent;
  border: 2px solid #00c400;
  color: white;
}


.three-d-container {
  width: 500px;
  height: 500px;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 4rem;
  /* background: rgba(0, 0, 0, 0.8); */
}

.feature-card {
  color: white;
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background: rgba(1, 65, 1, 0.671);
  /* background: rgba(0, 255, 0, 0.1); */
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-card i {
  font-size: 2.5rem;
  color: #00ff00;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.circle {
  background-color: #6dfd6871;
  width: 80px;
  height: 40px;
  text-align: center;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  animation: changePosition 1.5s linear 1s infinite;
  -webkit-box-shadow: -6px 0px 34px 12px rgba(251, 251, 251, 0.2);
  -moz-box-shadow: -6px 0px 34px 12px rgba(251, 251, 251, 0.2);
  box-shadow: -6px 0px 34px 12px rgba(251, 251, 251, 0.2);
}

.skills {
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 30px;
  padding: 2rem;
  padding-bottom: 4rem;
  padding-left: 50px;
  width: 100%;
  flex-wrap: nowrap;
}

</style>