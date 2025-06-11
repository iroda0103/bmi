<template>
  <div>
    <!-- <h2>Shaxsiy kabinet</h2> -->

    <!-- <div class="grid grid-cols-4">
      <div class="stats-card">
        <div class="stats-icon">🛒</div>
        <div class="stats-info">
          <h3>{{ stats.orders }}</h3>
          <p>Buyurtmalar</p>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-icon">❤️</div>
        <div class="stats-info">
          <h3>{{ stats.wishlist }}</h3>
          <p>Saqlangan</p>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-icon">⭐</div>
        <div class="stats-info">
          <h3>{{ stats.reviews }}</h3>
          <p>Sharhlar</p>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-icon">👁️</div>
        <div class="stats-info">
          <h3>{{ stats.views }}</h3>
          <p>Ko'rishlar</p>
        </div>
      </div>
    </div> -->

    <div class="grid grid-cols-2">
      <div class="card user-info-card">
        <div class="card-header">
          <h3>Profil ma'lumotlari</h3>
          <button class="button">Tahrirlash</button>
        </div>

        <div class="user-details">
          <div class="user-avatar">
            <img :src="user.imageUrl" alt="User avatar" class="avatar" width="100" height="100">
          </div>

          <div class="user-info">
            <div class="info-row">
              <span class="info-label">F.I.O:</span>
              <span class="info-value">{{ user.name }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">{{ user.email }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Telefon:</span>
              <span class="info-value">{{ user.phone }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Manzil:</span>
              <span class="info-value">{{ user.address }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Ro'yxatdan o'tgan sana:</span>
              <span class="info-value">{{ formatDate(user.joinDate) }}</span>
            </div>
          </div>
        </div>

        <div class="user-bio">
          <h4>Men haqimda</h4>
          <p>{{ user.bio }}</p>
        </div>
      </div>

      <div class="card recent-activities">
        <div class="card-header">
          <h3>So'nggi faoliyat</h3>
          <button class="button button-secondary">Barchasini ko'rish</button>
        </div>

        <div class="activity-list">
          <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
            <div :class="['activity-icon', `activity-${activity.type}`]">
              {{ getActivityIcon(activity.type) }}
            </div>
            <div class="activity-details">
              <div class="activity-description">{{ activity.description }}</div>
              <div class="activity-date text-muted">{{ activity.date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    stats: Object
  },
  computed: {
    recentActivities() {
      // Faqat eng so'nggi 4 ta faoliyatni ko'rsatish
      return this.user.activities ? this.user.activities.slice(0, 4) : [];
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('uz-UZ');
    },
    getActivityIcon(type) {
      const icons = {
        login: '🔑',
        purchase: '🛒',
        review: '⭐',
        update: '✏️',
        payment: '💰'
      };

      return icons[type] || '📝';
    }
  }
};
</script>

<style scoped>
.stats-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s;
}

.stats-card:hover {
  transform: translateY(-5px);
}

.stats-icon {
  font-size: 24px;
  width: 50px;
  height: 50px;
  background-color: #eff6ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-info h3 {
  font-size: 24px;
  margin: 0;
}

.stats-info p {
  margin: 5px 0 0 0;
  color: #6b7280;
  font-size: 14px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h3 {
  margin: 0;
}

.user-details {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.user-info {
  flex: 1;
}

.info-row {
  margin-bottom: 10px;
  display: flex;
}

.info-label {
  color: #6b7280;
  min-width: 160px;
}

.info-value {
  font-weight: 500;
}

.user-bio h4 {
  margin-bottom: 10px;
  color: #4b5563;
}

.user-bio p {
  color: #6b7280;
  line-height: 1.5;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-login {
  background-color: #eff6ff;
}

.activity-purchase {
  background-color: #f0fdf4;
}

.activity-review {
  background-color: #fffbeb;
}

.activity-update {
  background-color: #f3f4f6;
}

.activity-payment {
  background-color: #fef2f2;
}

.activity-details {
  flex: 1;
}

.activity-description {
  font-weight: 500;
  margin-bottom: 5px;
}

.activity-date {
  font-size: 12px;
}
</style>