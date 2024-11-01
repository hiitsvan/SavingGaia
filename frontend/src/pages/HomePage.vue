<template>
    <div>
      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-content">
          <h1>Welcome to Our World</h1>
          <a href="#about" class="scroll-link">Discover the extraordinary</a>
        </div>
      </div>
  
      <!-- About Section -->
      <section id="about" class="about">
        <div class="about-content">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Team" class="about-image">
          <h2>About Us</h2>
          <p class="about-text">
            We are a team of passionate innovators dedicated to creating extraordinary experiences.
            Our mission is to push the boundaries of what's possible and deliver exceptional results
            that inspire and amaze. With years of experience and a commitment to excellence,
            we transform ideas into reality.
          </p>
        </div>
      </section>
  
      <!-- Cards Section -->
      <section id="cards" class="card__container__wrapper">
        <div class="card__container">
          <article class="card__article">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" alt="Innovation" class="card__img">
            <div class="card__data">
              <span class="card__description">Innovation</span>
              <h2 class="card__title">Learn More</h2>
              <a href="#" class="card__button">Read More</a>
            </div>
          </article>
          
          <article class="card__article">
            <img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2" alt="News" class="card__img">
            <div class="card__data">
              <span class="card__description">Latest News</span>
              <h2 class="card__title">Read More</h2>
              <a href="#" class="card__button">Read More</a>
            </div>
          </article>
          
          <article class="card__article">
            <img src="https://images.unsplash.com/photo-1558402529-d2638a7023e9" alt="Volunteer" class="card__img">
            <div class="card__data">
              <span class="card__description">Volunteer</span>
              <h2 class="card__title">Work More</h2>
              <a href="#" class="card__button">Read More</a>
            </div>
          </article>
        </div>
      </section>
  
      <!-- Footer Section -->
      <footer class="footer">
        <div class="footer__container">
          <!-- Logo Section -->
          <div class="footer__logo">
            <h2 class="logo__text">ECOLAH</h2>
            <p class="logo__description">Join us in our mission to protect and preserve our planet for future generations.</p>
            <div class="social__links">
              <a href="#" class="social__link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social__link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social__link" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
  
          <!-- Directory Column -->
          <div class="footer__column">
            <h3 class="footer__heading">Directory</h3>
            <ul class="footer__links">
              <li><a href="#" class="footer__link">Home</a></li>
              <li><a href="#" class="footer__link">About Us</a></li>
              <li><a href="#" class="footer__link">Services</a></li>
              <li><a href="#" class="footer__link">Projects</a></li>
              <li><a href="#" class="footer__link">News</a></li>
            </ul>
          </div>
  
          <!-- Account Column -->
          <div class="footer__column">
            <h3 class="footer__heading">Account</h3>
            <ul class="footer__links">
              <li><a href="#" class="footer__link">Sign In</a></li>
              <li><a href="#" class="footer__link">Register</a></li>
              <li><a href="#" class="footer__link">My Profile</a></li>
              <li><a href="#" class="footer__link">My Activities</a></li>
              <li><a href="#" class="footer__link">Settings</a></li>
            </ul>
          </div>
  
          <!-- Contact Column -->
          <div class="footer__column">
            <h3 class="footer__heading">Contact Us</h3>
            <ul class="footer__contact">
              <li class="contact__item"><i class="fas fa-map-marker-alt"></i> 123 Eco Street, Green City, 12345</li>
              <li class="contact__item"><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
              <li class="contact__item"><i class="fas fa-envelope"></i> contact@ecolah.com</li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; 2024 ECOLAH. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    mounted() {
      // Smooth scroll
      document.querySelector('.scroll-link').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
  
      // About section animation
      const aboutContent = document.querySelector('.about-content');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );
  
      observer.observe(aboutContent);
    }
  }
  </script>
  
  <style scoped>
  @import '../assets/styles/home.css';
  </style>
  