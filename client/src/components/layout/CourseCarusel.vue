<template>
  <div class="courses-carousel-section">
    <div class="container">
      <!-- Section header -->
      <div class="section-header">
        <h2 class="section-title" data-aos="fade-up">Eng Mashxur Kurslar</h2>
        <div class="carousel-controls">
          <button class="control-btn prev" @click="prevSlide" aria-label="Previous courses">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="control-btn next" @click="nextSlide" aria-label="Next courses">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Carousel -->
      <div class="carousel-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        <div class="carousel-track" :style="carouselStyle">
          <Course v-for="course in courses" :course="course" :key="course.id"></Course>
        </div>
      </div>

      <!-- Carousel indicators -->
      <div class="carousel-indicators">
        <button v-for="(_, index) in indicatorsCount" :key="index" @click="goToSlide(index)"
          :class="['indicator', { active: activeIndex === index }]" :aria-label="`Go to slide ${index + 1}`"></button>
      </div>
      <button @click="loadCourses">TEST</button>
    </div>
  </div>
</template>

<script>
import Course from '../Courses/CourseCard.vue'
import { useCourseStore } from '../../stores/course.store';
import { onMounted } from 'vue';

export default {
  name: 'CoursesCarousel',
  components: { Course },
  setup() {
    const courseStore = useCourseStore();
    
    onMounted(async () => {
      try {
        let a=await courseStore.fetchCourses();
        console.log('oppp',a);
        
      } catch (error) {
        console.error('Kurslarni yuklashda xatolik:', error);
      }
    });
    
    return { courseStore }; 
  },
  data() {
    return {
      activeIndex: 0,
      itemsToShow: 3,
      touchStart: null,
      touchEnd: null,
      courses: [
        {
          id: 1,
          title: "Vue.js Asoslari",
          description: "Vue.js framework asoslarini o'rganib, zamonaviy veb-ilovalarni yaratishni boshlang",
          poster: "https://via.placeholder.com/400x225",
          duration: "6 hafta",
          students: 1243,
          level: "Boshlang'ich",
          instructor: "Jahongir Rahimov",
          instructorAvatar: "https://via.placeholder.com/40x40"
        },
        {
          id: 2,
          title: "Vue 3 Composition API",
          description: "Vue 3 ning yangi Composition API yordamida murakkab ilovalar yaratishni o'rganing",
          poster: "https://via.placeholder.com/400x225",
          duration: "8 hafta",
          students: 856,
          level: "O'rta",
          instructor: "Alisher Toshmatov",
          instructorAvatar: "https://via.placeholder.com/40x40"
        },
        {
          id: 3,
          title: "Vuex va Pinia bilan ishlash",
          description: "Vue ilovalaringizda state management'ni professional darajada boshqarishni o'rganing",
          poster: "https://via.placeholder.com/400x225",
          duration: "5 hafta",
          students: 723,
          level: "O'rta",
          instructor: "Dilshod Mirsoatov",
          instructorAvatar: "https://via.placeholder.com/40x40"
        },
        {
          id: 4,
          title: "Vue Router bilan SPA yaratish",
          description: "Single Page Application yaratish va routing logikasini professional darajada boshqarish",
          poster: "https://via.placeholder.com/400x225",
          duration: "4 hafta",
          students: 934,
          level: "O'rta",
          instructor: "Sardor Umarov",
          instructorAvatar: "https://via.placeholder.com/40x40"
        },
        {
          id: 5,
          title: "Vue 3 va TypeScript",
          description: "TypeScript bilan Vue 3 ilovalarini yaratib, kod sifatini yanada oshiring",
          poster: "../../assets/course_poster.jpg",
          duration: "7 hafta",
          students: 612,
          level: "Yuqori",
          instructor: "Doston Hamidov",
          instructorAvatar: "https://via.placeholder.com/40x40"
        },
        {
          id: 6,
          title: "Nuxt.js framework",
          description: "Server Side Rendering va SEO optimizatsiyasi uchun Nuxt.js frameworkini o'rganing",
          poster: "https://via.placeholder.com/400x225",
          duration: "9 hafta",
          students: 586,
          level: "Yuqori",
          instructor: "Shohjahon Tohirov",
          instructorAvatar: "https://via.placeholder.com/40x40"
        }
      ]
    };
  },
  computed: {
    maxVisibleIndex() {
      return Math.max(0, this.courses.length - this.itemsToShow);
    },
    indicatorsCount() {
      return this.maxVisibleIndex + 1;
    },
    carouselStyle() {
      const translateX = -(this.activeIndex * (100 / this.itemsToShow));
      return {
        transform: `translateX(${translateX}%)`,
        transition: 'transform 0.5s ease-in-out'
      };
    },
    courses() {
      return this.courseStore.getCourses;
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    // Auto-slide
    this.startAutoSlide();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.stopAutoSlide();
  },
  methods: {
    redirectCoursesPage(){
      ro
    },
    handleResize() {
      if (window.innerWidth < 640) {
        this.itemsToShow = 1;
      } else if (window.innerWidth < 1024) {
        this.itemsToShow = 2;
      } else {
        this.itemsToShow = 3;
      }
    },
    nextSlide() {
      if (this.activeIndex < this.maxVisibleIndex) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    },
    prevSlide() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      } else {
        this.activeIndex = this.maxVisibleIndex;
      }
    },
    goToSlide(index) {
      this.activeIndex = index;
    },
    handleTouchStart(e) {
      this.touchStart = e.touches[0].clientX;
    },
    handleTouchMove(e) {
      this.touchEnd = e.touches[0].clientX;
    },
    handleTouchEnd() {
      if (!this.touchStart || !this.touchEnd) return;

      const distance = this.touchStart - this.touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        this.nextSlide();
      } else if (isRightSwipe) {
        this.prevSlide();
      }

      this.touchStart = null;
      this.touchEnd = null;
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
    }
  }
};
</script>


<style>
.courses-carousel-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #080808 0%, #2e2e2e 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #00b300, #00cccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin: 0;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #00b300, #00cccc);
  border-radius: 3px;
}

.carousel-controls {
  display: flex;
  gap: 0.75rem;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00cc00, #00cccc);
  border: none;
  box-shadow: 0 4px 15px rgba(0, 204, 153, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 204, 153, 0.4);
}

.control-btn i {
  color: white;
  font-size: 1rem;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  margin: 0 -0.75rem;
  padding: 1rem 0;
}

.carousel-track {
  display: flex;
  gap: 1.5rem;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) !important;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.6rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #d1d5db;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  background-color: #00b380;
  transform: scale(1.2);
}

.indicator.active {
  background: linear-gradient(90deg, #00cc00, #00cccc);
  width: 25px;
  border-radius: 10px;
}
</style>