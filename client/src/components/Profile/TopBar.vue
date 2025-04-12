<template>
    <div class="top-bar">
      <div class="welcome">
        <h2>Salom, {{ userName }}!</h2>
        <p class="text-muted">{{ userRole }}</p>
      </div>
      
      <div class="top-actions">
        <div class="search-bar">
          <input type="text" placeholder="Qidirish..." class="search-input">
        </div>
        
        <div class="notifications" @click="toggleNotifications">
          <span class="icon notification-icon">🔔</span>
          <span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
          
          <div class="notification-dropdown" v-if="showNotifications">
            <h3>Bildirishnomalar</h3>
            <div v-if="notifications.length === 0" class="empty-state">
              Bildirishnomalar yo'q
            </div>
            <div v-else class="notification-list">
              <div 
                v-for="notification in notifications" 
                :key="notification.id" 
                class="notification-item"
                :class="{ 'unread': !notification.read }"
              >
                <div class="notification-content">
                  <h4>{{ notification.title }}</h4>
                  <p>{{ notification.message }}</p>
                  <small class="text-muted">{{ notification.time }}</small>
                </div>
              </div>
            </div>
            <div class="notification-footer">
              <button class="button button-secondary">Barchasini ko'rish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      userName: String,
      userRole: String,
      notifications: Array
    },
    data() {
      return {
        showNotifications: false
      };
    },
    computed: {
      unreadCount() {
        return this.notifications.filter(n => !n.read).length;
      }
    },
    methods: {
      toggleNotifications() {
        this.showNotifications = !this.showNotifications;
      }
    }
  };
  </script>
  
  <style scoped>
  .top-bar {
    padding: 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .welcome h2 {
    margin: 0;
  }
  
  .top-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .search-bar {
    position: relative;
  }
  
  .search-input {
    padding: 10px 10px 10px 35px;
    border: 1px solid #e5e7eb;
    border-radius: 5px;
    width: 250px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 15px;
  }
  
  .notifications {
    position: relative;
    cursor: pointer;
  }
  
  .notification-icon {
    font-size: 20px;
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #ef4444;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .notification-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 320px;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 10;
    overflow: hidden;
  }
  
  .notification-dropdown h3 {
    padding: 15px;
    margin: 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .notification-list {
    max-height: 350px;
    overflow-y: auto;
  }
  
  .notification-item {
    padding: 15px;
    border-bottom: 1px solid #e5e7eb;
    transition: background-color 0.2s;
  }
  
  .notification-item:hover {
    background-color: #f9fafb;
  }
  
  .notification-item.unread {
    background-color: #eff6ff;
  }
  
  .notification-item.unread:hover {
    background-color: #e5edff;
  }
  
  .notification-content h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
  }
  
  .notification-content p {
    margin: 0 0 5px 0;
    font-size: 13px;
    color: #4b5563;
  }
  
  .notification-footer {
    padding: 15px;
    text-align: center;
    border-top: 1px solid #e5e7eb;
  }
  
  .empty-state {
    padding: 30px 15px;
    text-align: center;
    color: #6b7280;
  }
  
  @media (max-width: 768px) {
    .top-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    
    .top-actions {
      width: 100%;
    }
    
    .search-input {
      width: 100%;
    }
  }
  </style>