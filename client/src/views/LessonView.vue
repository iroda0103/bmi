<template>
    <div class="lessons">
        <div class="user-controls">
          <span>{{ isAuthor ? 'Muallif rejimi' : 'O\'quvchi rejimi' }}</span>
          <button @click="toggleAuthorMode">
            {{ isAuthor ? 'O\'quvchi rejimiga o\'tish' : 'Muallif rejimiga o\'tish' }}
          </button>
        </div>
      
        <Lesson :isAuthor="isAuthor" />
     
    </div>
  </template>
  
  <script>
  import Lesson from '../components/Lessons/Lesson.vue';
  
  export default {
    components: {
      Lesson
    },
    data() {
      return {
        isAuthor: false
      };
    },
    methods: {
      toggleAuthorMode() {
        this.isAuthor = !this.isAuthor;
      }
    }
  };
  </script>
  
  <style scoped>
  
  .lessons {
    /* background-color: #2c3e50; */
    color: white;
    /* padding: 30px; */
    /* display: flex;
    justify-content: space-between; */
    align-items: center;
    border-radius: 10px;
    margin-top: 30px;
  }
  
  header h1 {
    margin: 0;
  }
  
  .user-controls {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    justify-content: end;
  }
  
  .user-controls button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .user-controls button:hover {
    background-color: #2980b9;
  }
  
 
  </style>