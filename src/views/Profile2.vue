<template>
  <div class="container profile-container">
    <div class="profile-header">
      <img src="https://i.pravatar.cc/100" alt="Avatar" class="avatar" />
      <div class="info">
        <h2 class="name">Iroda Muminova</h2>
        <p class="email"><i class="fas fa-envelope"></i> iroda@example.com</p>
      </div>
    </div>

    <div class="statistics">
      <div class="stat">
        <i class="fas fa-book-open stat-icon"></i>
        <div>
          <p class="stat-number">12</p>
          <p class="stat-label">Kurslar</p>
        </div>
      </div>
      <div class="stat">
        <i class="fas fa-chart-line stat-icon"></i>
        <div>
          <p class="stat-number">75%</p>
          <p class="stat-label">O‘zlashtirish</p>
        </div>
      </div>
      <div class="stat">
        <i class="fas fa-star stat-icon"></i>
        <div>
          <p class="stat-number">4.8</p>
          <p class="stat-label">Baholar</p>
        </div>
      </div>
    </div>

    <div class="progress-section">
      <h3>O‘quv jarayoni:</h3>
      <div class="progress-item">
        <span>Frontend</span>
        <div class="progress-bar"><div class="fill" style="width: 80%;"></div></div>
      </div>
      <div class="progress-item">
        <span>Backend</span>
        <div class="progress-bar"><div class="fill" style="width: 60%;"></div></div>
      </div>
      <div class="progress-item">
        <span>Data Engineering</span>
        <div class="progress-bar"><div class="fill" style="width: 45%;"></div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Font Awesome ulashni unutmang!
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</script>

<style scoped>
.profile-container {
  /* background-color: #121212; */
  color: #f2f2f2;
  padding: 30px;
  border-radius: 12px;
  /* max-width: 700px; */
  margin: 0 auto;
  /* box-shadow: 0 0 12px rgba(0, 255, 180, 0.2); */
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #00b380;
}

.info .name {
  font-size: 24px;
  margin-bottom: 5px;
  color: #00cc99;
}

.email {
  font-size: 14px;
  color: #ccc;
}

.statistics {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  font-size: 30px;
  color: #00cccc;
}

.stat-number {
  font-size: 22px;
  font-weight: bold;
}

.stat-label {
  font-size: 14px;
  color: #aaa;
}

.progress-section h3 {
  margin-bottom: 15px;
  color: #00cc99;
}

.progress-item {
  margin-bottom: 15px;
}

.progress-bar {
  background-color: #333;
  border-radius: 6px;
  overflow: hidden;
  height: 12px;
  margin-top: 5px;
}

.fill {
  background: linear-gradient(90deg, #00cccc, #00cc00);
  height: 100%;
}
</style>
