import { defineStore } from 'pinia';
import CourseRepository from '../repositories/course.repository.js';

export const useCourseStore = defineStore('course', {
  state: () => ({
    course: null,
    courses: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getCourse: (state) => state.course,
    getCourses: (state) => state.courses,
    getLoadingStatus: (state) => state.loading,
    getError: (state) => state.error
  },
  
  actions: {
    // Set loading state
    setLoading(status) {
      this.loading = status;
    },
    
    // Set error state
    setError(error) {
      this.error = error;
    },
    
    // Reset error
    resetError() {
      this.error = null;
    },
    
    // Fetch all courses
    async fetchCourses() {
      // Agar yuklanayotgan bo'lsa yoki xato bo'lsa, qaytarib yuboramiz
      if (this.loading) return;
      
      let retryCount = 0;
      const MAX_RETRIES = 2;
      
      const tryFetch = async () => {
        try {
          this.setLoading(true);
          this.resetError();
          const response = await CourseRepository.get();
          
          // Response valid bo'lishi kerak
          if (response && response.data) {
            this.courses = response.data.data;
            return response;
          } else {
            throw new Error('API dan noto\'g\'ri javob olindi');
          }
        } catch (error) {
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`Kurslarni yuklashda xatolik. Qayta urinish: ${retryCount}`);
            return await tryFetch(); // Rekursiv qayta urinish
          }
          
          this.setError(error.message || 'Kurslarni yuklashda xatolik');
          
          // Xatolikni tashqariga oshiramiz, lekin sahifa yangilanishiga yo'l qo'ymaymiz
          console.error('Failed to fetch courses after retries:', error);
          return { data: [] }; // Bo'sh array qaytaramiz 
        } finally {
          this.setLoading(false);
        }
      };
      
      return await tryFetch();
    },
    
    // Fetch single course
    async fetchCourse(id) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await CourseRepository.getCourse(id);
        this.course = response.data.data;
        return response.data;
      } catch (error) {
        this.setError(error.message || 'Kurs ma\'lumotlarini yuklashda xatolik');
        throw error;
      } 
      // finally {
      //   this.setLoading(false);
      // }
    },
    
    // Create course
    async createCourse(courseData) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await CourseRepository.create(courseData);
        // Refresh courses list after creating
        await this.fetchCourses();
        return response;
      } catch (error) {
        this.setError(error.message || 'Kurs yaratishda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Update course
    async updateCourse(courseData, id) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await CourseRepository.update(courseData, id);
        // If updating current course, update local course object
        if (this.course && this.course.id === id) {
          this.course = { ...this.course, ...courseData };
        }
        // Refresh courses list
        await this.fetchCourses();
        return response;
      } catch (error) {
        this.setError(error.message || 'Kursni yangilashda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Delete course
    async deleteCourse(id) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await CourseRepository.delete(id);
        // Refresh courses list
        await this.fetchCourses();
        return response;
      } catch (error) {
        this.setError(error.message || 'Kursni o\'chirishda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Enroll in a course
    async enrollCourse(courseId, userId) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await CourseRepository.enroll({ courseId, userId });
        return response;
      } catch (error) {
        this.setError(error.message || 'Kursga yozilishda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Unenroll from a course
    async unenrollCourse(courseId, userId) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await CourseRepository.unenroll({ courseId, userId });
        return response;
      } catch (error) {
        this.setError(error.message || 'Kursdan chiqishda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Fetch user's enrolled courses
    async fetchEnrolledCourses(userId) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await CourseRepository.getEnrolledCourses(userId);
        return response.data;
      } catch (error) {
        this.setError(error.message || 'Foydalanuvchi kurslarini yuklashda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Get course by category
    async fetchCoursesByCategory(categoryId) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await CourseRepository.getCoursesByCategory(categoryId);
        return response.data;
      } catch (error) {
        this.setError(error.message || 'Kategoriya bo\'yicha kurslarni yuklashda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    }
  }
});