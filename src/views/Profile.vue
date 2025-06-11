<template>
    <div class="dashboard">
      <SideMenu 
        :userName="user.name" 
        :userImage="user.imageUrl" 
        :activeTab="activeTab"
        @change-tab="changeTab" 
      />
      <div class="main-content">
        <TopBar v-if="activeTab !== 'activity'" :userName="user.name" :userRole="user.role" :notifications="notifications" />
        
        <div class="content">
          <!-- Asosiy ko'rinish -->
          <ProfileOverview v-if="activeTab === 'dashboard'" :user="user" :stats="stats" />
          <Profile2 v-if="activeTab === 'activity'" :user="user" :stats="stats" ></Profile2>
          <!-- Sozlamalar ko'rinishi -->
          <!-- <Settings v-else-if="activeTab === 'settings'" :user="user" @save-settings="saveSettings" /> -->
          
          <!-- Faollik ko'rinishi -->
          <!-- <Activity v-else-if="activeTab === 'activity'" :activities="activities" /> -->
          
          <!-- To'lovlar ko'rinishi -->
          <!-- <Payments v-else-if="activeTab === 'payments'" :payments="payments" /> -->
          
          <!-- Xabarlar ko'rinishi -->
          <!-- <Messages v-else-if="activeTab === 'messages'" :messages="messages" /> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SideMenu from '../components/Profile/Sidebar.vue';
  import TopBar from '../components/Profile/TopBar.vue';
  import ProfileOverview from '../components/Profile/ProfileOverview.vue';
  import Profile2 from '../views/Profile2.vue';
//   import Settings from '../components/cards/Profile/Settings.vue';
//   import Activity from '../components/cards/Profile/Activity.vue';
//   import Payments from '../components/cards/Profile/Payments.vue';
//   import Messages from '../components/cards/Profile/Messages.vue';
  
export default {
    components: {
      SideMenu,
      TopBar,
      ProfileOverview,
      Profile2
    //   Settings,
    //   Activity,
    //   Payments,
    //   Messages
    },
    data() {
      return {
        activeTab: 'dashboard',
        user: {
          id: 1,
          name: 'Iroda Muminova',
          email: 'iroda@example.com',
          phone: '+998 90 123 45 67',
          role: 'Premium foydalanuvchi',
          address: 'Toshkent, Chilonzor tumani',
          imageUrl: '/api/placeholder/150/150',
          bio: 'Dasturchi va web dizayner. Ochiq kodli loyihalar ishqibozi.',
          joinDate: '2023-05-15',
          language: 'uz',
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            sms: false
          }
        },
        stats: {
          orders: 24,
          wishlist: 8,
          reviews: 12,
          views: 845
        },
        notifications: [
          { id: 1, title: 'Yangi xabar', message: 'Yangi xabar qabul qilindi', time: '10:30', read: false },
          { id: 2, title: 'Buyurtma tasdiqlandi', message: 'Sizning #12345 buyurtmangiz tasdiqlandi', time: '12:45', read: true },
          { id: 3, title: 'To\'lov qabul qilindi', message: '100,000 so\'m miqdoridagi to\'lov qabul qilindi', time: 'Kecha', read: true }
        ],
        activities: [
          { id: 1, type: 'login', description: 'Tizimga kirish', date: '2023-09-10 14:30' },
          { id: 2, type: 'purchase', description: 'Mahsulot sotib olindi - #12345', date: '2023-09-08 10:15' },
          { id: 3, type: 'review', description: 'Mahsulot sharhini qo\'shdi', date: '2023-09-05 16:42' },
          { id: 4, type: 'update', description: 'Profil yangilandi', date: '2023-09-01 09:20' },
          { id: 5, type: 'payment', description: 'To\'lov amalga oshirildi - 100,000 so\'m', date: '2023-08-28 15:37' }
        ],
        payments: [
          { id: 1, amount: '125,000', method: 'Click', status: 'Muvaffaqiyatli', date: '2023-09-08' },
          { id: 2, amount: '78,000', method: 'Payme', status: 'Muvaffaqiyatli', date: '2023-08-25' },
          { id: 3, amount: '250,000', method: 'Bank o\'tkazmasi', status: 'Muvaffaqiyatli', date: '2023-08-12' },
          { id: 4, amount: '85,000', method: 'Click', status: 'Bekor qilindi', date: '2023-08-05' }
        ],
        messages: [
          { id: 1, sender: 'Admin', subject: 'Xush kelibsiz!', preview: 'Bizning platformaga xush kelibsiz...', date: '2023-09-10', read: true },
          { id: 2, sender: 'Texnik yordam', subject: 'So\'rovingizga javob', preview: 'Sizning muammongiz yechimi...', date: '2023-09-07', read: true },
          { id: 3, sender: 'Xizmat ko\'rsatish', subject: 'Yangi xizmatlar', preview: 'Yangi xizmatlar haqida ma\'lumot...', date: '2023-09-03', read: false },
          { id: 4, sender: 'Marketing', subject: 'Maxsus taklif!', preview: '50% chegirma faqat siz uchun...', date: '2023-08-28', read: false }
        ]
      };
    },
    methods: {
      changeTab(tab) {
        this.activeTab = tab;
      },
      saveSettings(updatedUser) {
        this.user = { ...this.user, ...updatedUser };
        alert('Sozlamalar saqlandi!');
      }
    }
  };
  </script>
  
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  /* body {
    background-color: #f5f7fa;
  } */
  
  .dashboard {
    display: flex;
    /* min-height: 100vh; */
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .content {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }
  
  h2, h3 {
    color: #333;
    margin-bottom: 15px;
  }
  
  .card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .button {
    background-color: #4361ee;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .button:hover {
    background-color: #3a56d4;
  }
  
  .button-secondary {
    background-color: #e5e7eb;
    color: #4b5563;
  }
  
  .button-secondary:hover {
    background-color: #d1d5db;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #4b5563;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .form-control:focus {
    outline: none;
    border-color: #4361ee;
  }
  
  .badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .badge-success {
    background-color: #ecfdf5;
    color: #065f46;
  }
  
  .badge-danger {
    background-color: #fef2f2;
    color: #991b1b;
  }
  
  .badge-warning {
    background-color: #fffbeb;
    color: #92400e;
  }
  
  .badge-info {
    background-color: #eff6ff;
    color: #1e40af;
  }
  
  .text-muted {
    color: #6b7280;
  }
  
  .text-success {
    color: #059669;
  }
  
  .text-danger {
    color: #dc2626;
  }
  
  .avatar {
    border-radius: 50%;
    object-fit: cover;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-center {
    align-items: center;
    justify-content: center;
  }
  
  .flex-between {
    justify-content: space-between;
  }
  
  .flex-column {
    flex-direction: column;
  }
  
  .grid {
    display: grid;
    grid-gap: 20px;
  }
  
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 1024px) {
    .grid-cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .dashboard {
      flex-direction: column;
    }
    
    .grid-cols-2, .grid-cols-4 {
      grid-template-columns: 1fr;
    }
  }
  </style>
  