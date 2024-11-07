<template>
    <footer class="footer">
      <div class="footer__container">
        <!-- Logo Section -->
        <div class="footer__logo">
          <h2 class="logo__text">SavingGaia</h2>
          <p class="logo__description">Join us in our mission to protect and preserve our planet for future generations.</p>
          <div class="social__links">
            <a href="https://www.instagram.com/notsamuelchua_/" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.instagram.com/hiitsvan/" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.instagram.com/kangyan_yang/" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.instagram.com/sebestbestebst/" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.instagram.com/zwayz_/" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
  
        <!-- Directory Column -->
        <div class="footer__column">
          <h3 class="footer__heading">Directory</h3>
          <ul class="footer__links">
            <li><a href="home" class="footer__link">Home</a></li>
            <li><a href="education" class="footer__link">Education</a></li>
            <li><a href="news" class="footer__link">News</a></li>
            <li><a href="opportunities" class="footer__link">Opportunities</a></li>
          </ul>
        </div>
  
        <!-- Contact Column -->
        <div class="footer__column">
          <h3 class="footer__heading">Contact Us</h3>
          <ul class="footer__contact">
            <li class="contact__item"><i class="fas fa-map-marker-alt"></i> 123 Eco Street, Green City, 12345</li>
            <li class="contact__item"><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
            <li class="contact__item"><i class="fas fa-envelope"></i> contact@savinggaia.com</li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <p>&copy; 2024 SavingGaia. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter'
  }
  </script>
  
  <style scoped>
  .footer {
      background: linear-gradient(to right, #1a1a1a, #2a2a2a);
      color: #fff;
      padding: 4rem 0 2rem;
      position: relative;
  }
  
  .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #4CAF50, #2196F3, #9C27B0);
  }
  
  .footer__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 4rem;
  }
  
  .footer__logo {
      grid-column: span 1;
  }
  
  .logo__text {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #4CAF50, #2196F3);
      display: inline-block;
      padding: 0.5vh 1.5vw;
  }
  
  .logo__description {
      color: #aaa;
      line-height: 1.6;
      margin-bottom: 1.5rem;
  }
  
  .social__links {
      display: flex;
      gap: 1rem;
  }
  
  .social__link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s ease;
  }
  
  .social__link:hover {
      background: #4CAF50;
      transform: translateY(-3px);
  }
  
  .footer__column {
      grid-column: span 1;
  }
  
  .footer__heading {
      color: #fff;
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      position: relative;
      padding-bottom: 0.5rem;
  }
  
  .footer__heading::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background: #4CAF50;
  }
  
  .footer__links, .footer__contact {
      list-style: none;
      padding: 0;
      margin: 0;
  }
  
  .footer__link, .contact__item {
      color: #aaa;
      text-decoration: none;
      display: block;
      margin-bottom: 0.8rem;
      transition: all 0.3s ease;
  }
  
  .footer__link:hover, .contact__item:hover {
      color: #4CAF50;
  }
  
  .footer__bottom {
      text-align: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .footer__bottom p {
      color: #aaa;
      font-size: 0.9rem;
  }
  
  @media (max-width: 992px) {
      .footer__container {
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
      }
      
      .footer__logo {
          grid-column: 1 / -1;
      }
  }
  
  @media (max-width: 576px) {
      .footer__container {
          grid-template-columns: 1fr;
          gap: 2rem;
      }
  }
  </style>