<template>
  <section class="container about-container">
    <h1 class="title">Biz haqimizda</h1>
    <p class="description">
{{ aboutText }}
    </p>

    <div class="team">
      <!-- <h2 class="subtitle">Jamoamiz</h2> -->
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

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      aboutText: `    AlgoEdu — bu innovatsion raqamli ta'lim platformasi bo‘lib, zamonaviy texnologiyalar orqali o‘quvchilarga, talabalar va IT sohasi enthusiastlariga sifatli va interaktiv ta’lim imkoniyatlarini taqdim etadi. Biz jamoamiz bilan texnologiya va ta’limni uyg‘unlashtirib, har bir foydalanuvchining bilim olish jarayonini qiziqarli, samarali va individual tarzda tashkil qilishga intilamiz.

Platformamiz quyidagi imkoniyatlarni taklif etadi:
    👨‍🏫 Interaktiv onlayn kurslar va darsliklar (algoritmlar, dasturlash, sun'iy intellekt va boshqa yo‘nalishlarda)
    💬 Real vaqtda muloqot qilish imkonini beruvchi chat tizimi
    🖥️ Kod yozish va sinab ko‘rish uchun terminal muhiti
    🎯 Foydalanuvchi yutuqlari va faoliyat statistikasi asosida progressni kuzatish
    📚 Resurslar kutubxonasi: maqolalar, video darslar, testlar va interaktiv topshiriqlar

Bizning maqsadimiz — har bir foydalanuvchiga mustahkam bilim va amaliy ko‘nikmalar berib, ularning kasbiy o‘sishiga zamin yaratishdir. AlgoEdu — bu nafaqat o‘rganish, balki o‘zini rivojlantirish va jamoa bilan o‘sish platformasi.`
    };
  }
};
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
  /* text-align: center; */
    white-space: pre-line;
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
  color: var(--color-primary);
}

.role {
  font-size: 14px;
  color: #ccc;
}
</style>
