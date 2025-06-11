<template>
  <section class="container about-container">
    <h1 class="title">Biz haqimizda</h1>
    <p class="description">
      Biz yosh va innovatsion jamoamiz, texnologiya orqali jamiyatga foydali yechimlar yaratishga intilamiz.
      Platformamiz orqali foydalanuvchilarga interaktiv ta'lim, samarali vositalar va foydali ma'lumotlar taqdim etamiz.
    </p>

    <div class="team">
      <h2 class="subtitle">Jamoamiz</h2>
      <div class="member">
        <i class="fas fa-user-circle icon"></i>
        <div>
          <h3 class="name">Muminova Iroda</h3>
          <p class="role">Frontend Developer & Dizayner & Backend Developer</p>
        </div>
      </div>
  
    </div>
  </section>
</template>

<script setup>
// FontAwesome ni ishga tushirish uchun public/index.html yoki App.vue da CDN link qo‘shish kerak:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</script>

<style scoped>
.about-container {
  background: #121212;
  color: #f0f0f0;
  padding: 40px 20px;
  border-radius: 12px;
  margin: 0 auto;
  box-shadow: 0 0 12px rgba(0, 255, 180, 0.2);
}

.title {
  font-size: 32px;
  background: linear-gradient(90deg, #00cccc, #00cc00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  text-align: center;
}

.description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  text-align: center;
}

.subtitle {
  font-size: 24px;
  margin-bottom: 20px;
  border-left: 5px solid #00cc99;
  padding-left: 12px;
  color: var(--color-primary);
}

.team {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.member {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #1e1e1e;
  padding: 15px;
  border-radius: 8px;
}

.icon {
  font-size: 40px;
  color: #00b380;
}

.name {
  font-size: 20px;
  margin: 0;
  color:var(--color-primary);
}

.role {
  font-size: 14px;
  color: #ccc;
}
</style>
