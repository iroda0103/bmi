<template>
    <div class="course-details-container">
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Yuklanmoqda...</p>
      </div>
      <div v-else-if="error" class="error-container">
        <div class="error-icon">❌</div>
        <p>{{ error }}</p>
      </div>
      <div v-else-if="course" class="course-content-wrapper">
        <div class="course-main-content">
          <Course :course="course"></Course>
        </div>
        <div class="course-lessons-sidebar">
          <div class="lessons-header">
            <h3>Kurs darslari</h3>
            <span class="lessons-count">{{ courseLessons.length }} ta dars</span>
          </div>
          <div class="lessons-list">
            <div 
              v-for="(lesson, index) in courseLessons" 
              :key="lesson.id" 
              class="lesson-item"
              :class="{ 'active': currentLessonId === lesson.id }"
              @click="selectLesson(lesson.id)"
            >
              <div class="lesson-number">{{ index + 1 }}</div>
              <div class="lesson-info">
                <h4 class="lesson-title">{{ lesson.title }}</h4>
                <div class="lesson-meta">
                  <span class="lesson-duration">{{ lesson.duration }}</span>
                  <span class="lesson-status" :class="lesson.status">{{ lesson.statusText }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="not-found">
        <div class="not-found-icon">🔍</div>
        <p>Kurs topilmadi</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useCourseStore } from '../stores/course.store';
  import Course from '../components/Courses/CourseCard.vue';
  
  export default {
    name: 'CourseDetails',
    components: {
      Course
    },
    data() {
      return {
        loading: true,
        error: null,
        isLoading: false,
        currentLessonId: null,
        // Mahalliy darslar ma'lumotlari (API dan kelmagan taqdirda ishlatiladi)
        localLessons: [
        {
          id: 1,
          title: "C# asoslari va algoritmik masalalar",
          duration: "50 daqiqa",
          status: "completed",
          statusText: "Tugatilgan",
          description: "C# sintaksisi, o'zgaruvchilar, asosiy ma'lumot turlari va operatorlar bilan tanishish. Oddiy algoritmik masalalarni yechishda C# imkoniyatlari."
        },
        {
          id: 2,
          title: "Massivlar va List kolleksiyalari",
          duration: "1 soat 10 daqiqa",
          status: "completed",
          statusText: "Tugatilgan",
          description: "Bir o'lchovli va ko'p o'lchovli massivlar. List<T> kolleksiyasi va ular ustida amallar. Massivlar bilan ishlashda LINQ so'rovlari."
        },
        {
          id: 3,
          title: "Rekursiya va rekursiv algoritmlar",
          duration: "1 soat 15 daqiqa",
          status: "in-progress",
          statusText: "Davom etmoqda",
          description: "Rekursiv funksiyalar. Stack overflow muammosi. Rekursiv algoritmlar va ularning iterativ yechimlar bilan taqqoslash. Fibonacci, faktorial va boshqa masalalar."
        },
        {
          id: 4,
          title: "Saralash algoritmlari",
          duration: "1 soat 30 daqiqa",
          status: "locked",
          statusText: "Qulflangan",
          description: "Bubble sort, insertion sort, selection sort, merge sort va quicksort algoritmlarini C# da amalga oshirish. Algoritmlar samaradorligi va Big O notatsiyasi."
        },
        {
          id: 5,
          title: "Qidiruv algoritmlari",
          duration: "1 soat",
          status: "locked",
          statusText: "Qulflangan",
          description: "Chiziqli qidiruv, binary search va hash-based qidiruv algoritmlari. Dictionary<K,V> kolleksiyasi. Qidiruv algoritmlarini amalda qo'llash."
        },
        {
          id: 6,
          title: "Ma'lumotlar strukturalari",
          duration: "1 soat 45 daqiqa",
          status: "locked",
          statusText: "Qulflangan",
          description: "Stack, Queue, LinkedList va boshqa asosiy ma'lumotlar strukturalari. C# standart kutubxonasida mavjud kolleksiyalar va ularning qo'llanilishi."
        },
        {
          id: 7,
          title: "Graph algoritmlari",
          duration: "2 soat",
          status: "locked",
          statusText: "Qulflangan",
          description: "Graflarni C# da ifodalash. BFS va DFS algoritmlari. Eng qisqa yo'l topish: Dijkstra va Floyd-Warshall algoritmlari."
        },
        {
          id: 8,
          title: "Dinamik dasturlash",
          duration: "1 soat 50 daqiqa",
          status: "locked",
          statusText: "Qulflangan",
          description: "Dinamik dasturlash tamoyillari. Memoization. Fibonacci, LCS, rukzak masalasi kabi masalalarni yechish."
        },
        {
          id: 9,
          title: "Greedy algoritmlar",
          duration: "1 soat 20 daqiqa",
          status: "locked",
          statusText: "Qulflangan",
          description: "Ochko'z algoritmlar va ularning qo'llanilishi. Minimal bog'lanish daraxti, Kruskal va Prim algoritmlari."
        },
        {
          id: 10,
          title: "Amaliy loyiha: Algoritmik muammolarni yechish",
          duration: "2 soat 30 daqiqa",
          status: "locked",
          statusText: "Qulflangan",
          description: "Yuqorida o'rganilgan algoritm va ma'lumotlar strukturalarini amalda qo'llash. CodeForces, LeetCode va HackerRank masalalarini yechish strategiyalari."
        }
      ]
      };
    },
    computed: {
      courseStore() {
        return useCourseStore();
      },
      id() {
        return this.$route.params.id;
      },
      course() {
        return this.courseStore.getCourse;
      },
      courseLessons() {
        // Kursning darslari bor bo'lsa ularni qaytaradi, aks holda lokal darslarni
        return (this.course && this.course.lessons) ? this.course.lessons : this.localLessons;
      }
    },
    methods: {
      async loadCourseData() {
        this.loading = true;
        this.error = null;
        try {
          await this.courseStore.fetchCourse(this.id);
          if (!this.course) {
            this.error = "Kurs topilmadi";
          } else {
            // Birinchi darsni tanlash
            if (this.courseLessons.length > 0) {
              this.currentLessonId = this.courseLessons[0].id;
            }
          }
        } catch (error) {
          console.error("Kurs ma'lumotlarini yuklashda xatolik:", error);
          this.error = error.message || "Kurs ma'lumotlarini yuklashda xatolik yuz berdi";
        } finally {
          this.loading = false;
        }
      },
      async loadCourses() {
        if (this.isLoading) return;
        this.isLoading = true;
        try {
          await this.courseStore.fetchCourse(this.id);
          if (!this.course) {
            console.warn("API dan kurslar yuklanmadi, mahalliy ma'lumotlar ishlatiladi");
          }
        } catch (error) {
          console.error('Kurslarni yuklashda xatolik:', error);
        } finally {
          this.isLoading = false;
        }
      },
      selectLesson(lessonId) {
        this.currentLessonId = lessonId;
        // Dars tanlanganda qo'shimcha logika (masalan, dars ma'lumotlarini yuklash) qo'shilishi mumkin
        console.log(`${lessonId} raqamli dars tanlandi`);
      }
    },
    watch: {
      '$route.params.id': {
        immediate: true,
        handler() {
          this.loadCourseData();
        }
      }
    },
    mounted() {
      this.loadCourseData();
      this.loadCourses();
    }
  };
  </script>
  
  <style scoped>
  .course-details-container {
    display: flex;
    width: 100%;
    min-height: 600px;
    position: relative;
    color: #e2e2e2;
  }
  
  .loading-container, .error-container, .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 2rem;
    color: #e2e2e2;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-left-color: #6c6c6c;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-icon, .not-found-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #a0a0a0;
  }
  
  .course-content-wrapper {
    display: flex;
    width: 100%;
    gap: 40px;
    padding: 50px;
  }
  
  .course-main-content {
    flex: 1;
    /* height: 100%; */
    /* flex-grow:2; */
    /* padding: 1rem; */
  }
  
  .course-lessons-sidebar {
    /* width: 320px; */
    width: 55%;
    border-radius: 10px;
    border-left: 1px solid #3d3d3d;
    background-color: linear-gradient(90deg, #00ff00, #00ffff);;
    padding: 1rem;
   
    position: sticky;
    top: 80px;
    -webkit-box-shadow: -6px 0px 34px 12px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: -6px 0px 34px 12px rgba(0, 0, 0, 0.2);
    box-shadow: -6px 0px 34px 12px rgba(0, 0, 0, 0.2);
  }
  
  .lessons-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #3d3d3d;
  }
  
  .lessons-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #e2e2e2;
  }
  
  .lessons-count {
    background-color: rgba(80, 80, 80, 0.5);
    color: #c2c2c2;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
  }
  
  .lessons-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: calc(100vh - 200px);
    overflow-y: auto;
  }
  
  .lesson-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    background-color: rgba(50, 50, 50, 0.5);
  }
  
  .lesson-item:hover {
    background-color: rgba(70, 70, 70, 0.7);
  }
  
  .lesson-item.active {
    background-color: rgba(80, 80, 80, 0.8);
    border-color: #505050;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .lesson-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: #444444;
    color: #e2e2e2;
    border-radius: 50%;
    margin-right: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  .lesson-item.active .lesson-number {
    background-color: #565656;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    
    /* ------------------------------------------ */
  }
  
  .lesson-info {
    flex: 1;
  }
  
  .lesson-title {
    font-size: 0.925rem;
    font-weight: 500;
    color: #d2d2d2;
    margin: 0 0 0.25rem 0;
  }
  
  .lesson-item.active .lesson-title {
    color: #ffffff;
    font-weight: 600;
  }
  
  .lesson-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #a0a0a0;
  }
  
  .lesson-status {
    display: inline-block;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    font-weight: 500;
  }
  
  .lesson-status.completed {
    /* background-color: rgba(76, 175, 80, 0.2);
    color: #9ed49f; */
    background-color: rgba(0, 255, 10, 0.56);
  color: #e2f1e2;

  }
  
  .lesson-status.in-progress {
    /* background-color: rgba(66, 165, 245, 0.2);
    color: #90caf9; */
    background-color: rgb(173, 126, 7);
  color: #f2f2f2;
  }
  
  .lesson-status.locked {
    /* background-color: rgba(70, 70, 70, 0.5);
    color: #9e9e9e; */
    background-color: rgba(244, 24, 24, 0.28);
  color: #e6e3e3;
  }
  </style>