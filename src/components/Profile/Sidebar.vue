<template>
  <div class="side-menu">
    <div class="user-profile">
      <img src="https://i.pravatar.cc/100" alt="Foydalanuvchi rasmi" class="avatar" width="70" height="70">
      <h3>{{ userName }}</h3>
    </div>

    <nav class="nav-menu">
      <ul>
        <li @click="selectTab('dashboard')" :class="{ active: activeTab === 'dashboard' }">
          <span class="icon">📊</span> Bosh sahifa
        </li>
        <!-- <li @click="selectTab('settings')" :class="{ active: activeTab === 'settings' }">
            <span class="icon">⚙️</span> Sozlamalar
          </li> -->
        <li @click="selectTab('activity')" :class="{ active: activeTab === 'activity' }">
          <span class="icon">📝</span> Faollik
        </li>
        <!-- <li @click="selectTab('payments')" :class="{ active: activeTab === 'payments' }">
            <span class="icon">💰</span> To'lovlar
          </li> -->
        <!-- <li @click="selectTab('messages')" :class="{ active: activeTab === 'messages' }">
            <span class="icon">✉️</span> Xabarlar
          </li> -->

      </ul>
    </nav>

    <div class="menu-footer">
      <button @click="logout" class="button button-secondary logout-button">
        <span class="icon">🚪</span> Chiqish
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userName: String,
    userImage: String,
    activeTab: String
  },
  methods: {
    selectTab(tab) {
      this.$emit('change-tab', tab);
    },
    logout() {
      // Clear user data and token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Emit logout event to parent component
      this.$router.push('/').then(() => {
        window.location.reload(); // hard reload
      });
    }
  }
};
</script>

<style scoped>
.side-menu {
  width: 260px;
  /* background-color: #fff; */
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100vh;
  border-right: 1px solid #e5e7eb;
}

.side-menu h3 {
  color: var(--primary-color);
  margin-left: 15px;
  font-weight: bold;
}

.logo {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
}

.logo h1 {
  color: #4361ee;
  font-size: 24px;
}

.user-profile {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.user-profile h3 {
  margin-top: 10px;
  font-size: 16px;
}

.nav-menu {
  height: calc(100vh - 300px);
  padding: 20px 0;
}

.nav-menu ul {
  list-style: none;
}

.nav-menu li {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  display: flex;
  align-items: center;
}

.nav-menu li:hover {
  background-color: #f3f4f6;
  color: #4361ee;
}

.nav-menu li.active {
  background-color: #eff6ff;
  color: #4361ee;
  border-left: 3px solid #4361ee;
}

.icon {
  margin-right: 10px;
}

.menu-footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;

}

.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .side-menu {
    width: 100%;
    height: auto;
  }

  .user-profile {
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }

  .nav-menu ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .nav-menu li {
    padding: 10px;
  }

  .nav-menu li .icon {
    margin-right: 5px;
  }
}
</style>