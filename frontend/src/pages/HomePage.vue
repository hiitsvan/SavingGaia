<template>
  <div>
    <!-- Hero Section -->
    <div class="hero">
      <video autoplay muted loop preload="auto">
        <source src="/media/globe.mp4" type="video/mp4">
      </video>
      <div class="overlay"></div>
      <div class="hero-content">
        <h1>Welcome to Our World</h1>
        <a href="#about" class="scroll-link">Discover the extraordinary</a>
      </div>
    </div>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="about-content">
        <img src="/media/us.jpg" alt="Team" class="about-image">
        <h2>About Us</h2>
        <p class="about-text">
          SavingGaia is a platform empowering individuals to make a positive environmental impact. Through accessible insights on deforestation, 
          climate change, live environmental trackers, eco news, and community engagement, we help users adopt sustainable practices in daily life. 
          Join us in protecting and restoring our planet for future generations. Together, we can create lasting change.
        </p>
      </div>
    </section>

    <!-- Cards Section -->
    <section id="cards" class="card__container__wrapper">
      <div class="card__container">
        <article class="card__article">
          <img src="/media/dashboard.jpg" alt="Innovation" class="card__img">
          <div class="card__data">
            <span class="card__description">Environmental Dashboard</span>
            <h2 class="card__title">Learn More</h2>
            <a href="education" class="card__button">Read More</a>
          </div>
        </article>

        <article class="card__article">
          <img src="/media/news.jpg" alt="News" class="card__img">
          <div class="card__data">
            <span class="card__description">Latest News</span>
            <h2 class="card__title">Read More</h2>
            <a href="news" class="card__button">Read More</a>
          </div>
        </article>

        <article class="card__article">
          <img src="/media/volopp.jpg" alt="Volunteer" class="card__img">
          <div class="card__data">
            <span class="card__description">Volunteering Opportunities </span>
            <h2 class="card__title">Contribute More</h2>
            <a href="opportunities" class="card__button">Read More</a>
          </div>
        </article>
      </div>
    </section>

    <!-- Footer Section -->
  <footer class="footer">
    <div class="footer__container">
      <!-- Logo Section -->
      <div class="footer__logo">
        <h2 class="logo__text">SavingGaia</h2>
        <p class="logo__description">Join us in our mission to protect and preserve our planet for future generations.</p>
        <div class="social__links">
          <a href="https://www.instagram.com/zwayz_/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://www.instagram.com/sebestbestebst/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://www.instagram.com/kangyan_yang/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://www.instagram.com/hiitsvan/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://www.instagram.com/notsamuelchua_/" target="_blank" class="social__link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
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
          <li class="contact__item"><i class="fas fa-map-marker-alt"></i>  &nbsp; SebHouse, 576422 </li>
          <li class="contact__item"><i class="fas fa-phone"></i> +65 8888 88888</li>
          <li class="contact__item"><i class="fas fa-envelope"></i> &nbsp;goodteam@savinggaia.com</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>&copy; 2024 SavingGaia. All rights reserved.</p>
    </div>
  </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  mounted() {
    // Remove the overflow settings since they're not needed
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
/* Remove all overflow and height restrictions from the root level */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

/* Hero Section */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    padding-bottom: 120px;
    justify-content: center;
    position: relative;
}

.hero video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
}

@keyframes backgroundMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-20px, -20px); }
}

.hero-content {
    text-align: center;
    z-index: 1;
    animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.hero h1 {
    font-size: 6rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #fff, rgba(0, 255, 0, 0.5));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s infinite linear;
}

.scroll-link {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
    font-size: 2rem;
    animation: scaleColorChange 4s infinite ease-in-out;
}

@keyframes scaleColorChange {
    0%, 100% {
        transform: scale(1);
        color: #fff;
    }
    50% {
        transform: scale(1.3);
        color: rgba(0, 255, 0, 0.5);
    }
}

.scroll-link:hover {
    transform: translateY(-5px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

@keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
}

/* About Section */
.about {
    background: black;
    min-height: 100vh;
    padding: 4rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.about-content {
    max-width: 1000px;
    text-align: center;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.about-content.visible {
    opacity: 1;
    transform: translateY(0);
}

.about-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

/* Card Styles */
.card__container__wrapper {
    padding: 5rem 1.5rem;
    background: black;
}

.card__container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.card__article {
    position: relative;
    height: 400px;
    border-radius: 1.5rem;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.card__article::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.card__data {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    background: white;
    padding: 2rem 1.5rem;
    z-index: 2;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card__description {
    display: block;
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 0.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease 0.1s;
}

.card__title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease 0.2s;
}

.card__button {
    display: inline-block;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    color: #4a90e2;
    padding: 0.5rem 0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease 0.3s;
}

.card__button:hover {
    color: #357abd;
    text-decoration: underline;
}

.card__article:hover {
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}

.card__article:hover::before {
    opacity: 1;
}

.card__article:hover .card__img {
    transform: scale(1.1);
}

.card__article:hover .card__data {
    transform: translateY(0);
}

.card__article:hover .card__description,
.card__article:hover .card__title,
.card__article:hover .card__button {
    opacity: 1;
    transform: translateY(0);
}

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
    grid-template-columns: 2fr 1fr 1fr; /* Updated to 3 columns with logo taking more space */
    gap: 4rem; /* Increased gap for better spacing */
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
    display: block; /* Changed to block for better spacing */
    margin-bottom: 0.8rem; /* Added margin between items */
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

/* Updated Responsive Design */
@media (max-width: 992px) {
    .footer__container {
        grid-template-columns: 1fr 1fr; /* Two columns on medium screens */
        gap: 3rem;
    }
    
    .footer__logo {
        grid-column: 1 / -1; /* Logo takes full width */
    }
}

@media (max-width: 576px) {
    .footer__container {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}

#app {
  width: 100%;
  min-height: 100vh;
  overflow: visible !important;
}
</style>