<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-top">
          <!-- Company Info Column -->
          <div class="footer-column">
            <div class="footer-logo">
              <img src="../../assets/logo.jpg" alt="Company Logo">
            </div>
            <p class="footer-description">
              Zamonaviy va sifatli onlayn kurslar orqali bilim oling va raqamli dunyoga qadam qo'ying.
            </p>
            <div class="footer-social">
              <a v-for="social in socialLinks" :key="social.icon" href="#" class="social-icon">
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
          
          <!-- Quick Links Column -->
          <div class="footer-column">
            <h3 class="footer-title">Tezkor Havolalar</h3>
            <div class="footer-links">
              <a v-for="link in quickLinks" :key="link.title" :href="link.url" class="footer-link">
                <i class="fas fa-chevron-right"></i> {{ link.title }}
              </a>
            </div>
          </div>
          
          <!-- Contact Info Column -->
          <div class="footer-column">
            <h3 class="footer-title">Bog'lanish</h3>
            <div class="contact-info">
              <div v-for="(item, index) in contactInfo" :key="index" class="contact-item">
                <i :class="item.icon + ' contact-icon'"></i>
                <div>{{ item.text }}</div>
              </div>
            </div>
          </div>
          
          <!-- Newsletter Column -->
          <div class="footer-column">
            <h3 class="footer-title">Yangiliklar</h3>
            <p class="footer-description">
              Yangi kurslar va maxsus takliflar haqida birinchilardan bo'lib xabardor bo'ling
            </p>
            <form @submit.prevent="subscribeToNewsletter" class="newsletter-form">
              <input 
                type="email" 
                v-model="email" 
                class="newsletter-input" 
                placeholder="Email manzilingiz"
                required
              >
              <button type="submit" class="newsletter-button"><span>Yuborish</span></button>
            </form>
          </div>
        </div>
        
        <div class="footer-divider"></div>
        
        <div class="footer-bottom">
          <div class="footer-copyright">
            &copy; {{ currentYear }} <strong>Kurslar Platformasi</strong>. Barcha huquqlar himoyalangan.
          </div>
          <div class="footer-policy">
            <a v-for="policy in policyLinks" :key="policy.title" :href="policy.url" class="policy-link">
              {{ policy.title }}
            </a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'SiteFooter',
    data() {
      return {
        email: '',
        socialLinks: [
          { icon: 'fab fa-facebook-f', url: '#' },
          { icon: 'fab fa-instagram', url: '#' },
          { icon: 'fab fa-telegram', url: '#' },
          { icon: 'fab fa-youtube', url: '#' }
        ],
        quickLinks: [
          { title: 'Barcha Kurslar', url: '#courses' },
          { title: 'Yangi Kurslar', url: '#courses' },
          { title: 'O\'qituvchilar', url: '/' },
          { title: 'Blog', url: '/blog' },
          { title: 'Biz Haqimizda', url: '/' }
        ],
        contactInfo: [
          { 
            icon: 'fas fa-map-marker-alt', 
            text: 'Toshkent sh., Mirzo Ulug\'bek tumani, Mustaqillik ko\'chasi, 54-uy' 
          },
          { 
            icon: 'fas fa-phone-alt', 
            text: '+998 90 123 45 67' 
          },
          { 
            icon: 'fas fa-envelope', 
            text: 'iroda3242@gmail.com' 
          },
          { 
            icon: 'fas fa-clock', 
            text: 'Dushanba - Shanba: 9:00 - 18:00' 
          }
        ],
        policyLinks: [
          { title: 'Maxfiylik siyosati', url: '/privacy' },
          { title: 'Foydalanish shartlari', url: '/terms' }
        ]
      };
    },
    computed: {
      currentYear() {
        return new Date().getFullYear();
      }
    },
    methods: {
      subscribeToNewsletter() {
        // Implement newsletter subscription functionality here
        alert(`${this.email} manzili yangiliklarimizga obuna bo'ldi!`);
        this.email = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .footer {
    /* background-color: #000; */
    padding: 4rem 0 2rem;
    position: relative;
    overflow: hidden;
  }
  
  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00ff00, #00ffff);
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .footer-top {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 1023px) {
    .footer-top {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 639px) {
    .footer-top {
      grid-template-columns: 1fr;
    }
  }
  
  .footer-column {
    display: flex;
    flex-direction: column;
  }
  
  .footer-logo {
    margin-bottom: 1.5rem;
  }
  
  .footer-logo img {
    height: 40px;
  }
  
  .footer-description {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .footer-social {
    display: flex;
    gap: 1rem;
  }
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00cc00, #00cccc);
    color: white;
    transition: all 0.3s ease;
  }
  
  .social-icon:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 204, 153, 0.3);
  }
  
  .footer-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    background: linear-gradient(90deg, #00b300, #00cccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  
  .footer-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #00b300, #00cccc);
    border-radius: 3px;
  }
  
  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .footer-link {
    color: #4b5563;
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
  }
  
  .footer-link i {
    color: #00b380;
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  .footer-link:hover {
    color: #00b380;
    transform: translateX(5px);
  }
  
  .footer-link:hover i {
    transform: scale(1.2);
  }
  
  .contact-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    color: #4b5563;
  }
  
  .contact-icon {
    color: #00b380;
    margin-right: 0.75rem;
    min-width: 20px;
    margin-top: 4px;
  }
  
  .newsletter-form {
    display: flex;
    margin-top: 1rem;
  }
  
  .newsletter-input {
    flex-grow: 1;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(0, 204, 153, 0.2);
    border-radius: 8px 0 0 8px;
    background-color: white;
    transition: all 0.3s ease;
  }
  
  .newsletter-input:focus {
    outline: none;
    border-color: #00b380;
    box-shadow: 0 0 0 2px rgba(0, 204, 153, 0.1);
  }
  
  .newsletter-button {
    background: linear-gradient(90deg, #00cc00, #00cccc);
    color: white;
    font-weight: 600;
    padding: 0 1.25rem;
    border: none;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .newsletter-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, #00cccc, #00cc00);
    transition: all 0.4s ease;
    z-index: 0;
  }
  
  .newsletter-button:hover::before {
    width: 100%;
  }
  
  .newsletter-button span {
    position: relative;
    z-index: 1;
  }
  
  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 204, 153, 0.1), rgba(0, 204, 153, 0.3), rgba(0, 204, 153, 0.1));
    margin: 2rem 0;
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  @media (max-width: 767px) {
    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
  
  .footer-policy {
    display: flex;
    gap: 1.5rem;
  }
  
  .policy-link {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .policy-link:hover {
    color: #00b380;
  }
  
  .footer-copyright {
    transition: all 0.3s ease;
  }
  
  .footer-copyright strong {
    background: linear-gradient(90deg, #00b300, #00cccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  </style>