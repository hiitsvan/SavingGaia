<template>
  <div class="news-page">
    <div class="news-header fade-up delay-1">
      <h1 class="header-section">Latest News on Volunteering and Climate Change</h1>
      <p class="subtitle">Stay updated with the latest insights on sustainability and environmental initiatives around the world.</p>
    </div>

    <!-- Carousel Section -->
    <div v-if="newsArticles.length" id="newsCarousel" class="carousel slide fade-up delay-2" data-bs-ride="carousel" data-bs-interval="4000">
      <div class="carousel-inner">
        <div
          v-for="(article, index) in newsArticles"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="news-article">
            <img :src="article.img" alt="Article Image" class="article-image" />
            <div class="article-content fade-up delay-3">
              <div class="article-meta">
                <span class="article-date">{{ article.date || 'Date Unavailable' }}</span>
                <span class="article-read">{{ article.readTime || '3 min read' }}</span>
              </div>
              <h2 class="article-title ">{{ article.title }}</h2>
              <p class="article-summary">{{ article.desc }}</p>
              <a :href="article.link" target="_blank" class="read-more-btn">Continue reading</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel controls -->
      <button class="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div v-else class="loading-state fade-up delay-1">
      <div class="spinner"></div>
      <p>Loading news...</p>
    </div>
  </div>
  <footer class="footer">
      <div class="footer__container">
        <!-- Logo Section -->
        <div class="footer__logo">
          <h2 class="logo__text">SavingGaia</h2>
          <p class="logo__description">Join us in our mission to protect and preserve our planet for future generations.
          </p>
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
            <li><a href="home" class="footer__link">Home</a></li>
            <li><a href="education" class="footer__link">Education</a></li>
            <li><a href="news" class="footer__link">News</a></li>
            <li><a href="opportunities" class="footer__link">Opportunities</a></li>
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
import axios from 'axios';

export default {
  data() {
    return {
      newsArticles: []
    };
  },
  async created() {
    try {
      // Make an HTTP request to your backend to get news articles
      const response = await axios.get('http://localhost:8001/news');
      this.newsArticles = response.data;
    } catch (error) {
      console.error("Error fetching news articles: ", error);
    }
  }
};
</script>

<style scoped>
/* Make the entire viewport background black */
body {
  background-color: #000;
  margin: 0;
  padding: 0;
}

.news-page {
  padding: 2rem;
  margin: 0 auto;
  background-color: #000; /* Ensures inner content is also black */
  min-height: 100vh;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.news-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 2rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.1rem;
  color: #888;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
}

.carousel {
  background: #111;
  border-radius: 4px;
  margin: 0 auto;
  width: 100%; /* Make carousel take up full width */
}

.news-article {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;
  min-height: 600px;
  background: #111;
}

.article-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 2px;
}

.article-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.5rem;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
}

.article-title {
  font-size: 1.75rem;
  color: #fff;
  font-weight: 500;
  margin-bottom: 1rem;
  line-height: 1.3;
  letter-spacing: -0.3px;
}

.article-summary {
  color: #999;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 400;
}

.read-more-btn {
  display: inline-block;
  background: transparent;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: 1px solid #333;
  border-radius: 2px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  align-self: flex-start;
  margin-top: auto;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.read-more-btn:hover {
  background: #222;
  border-color: #444;
}

.carousel-control-prev,
.carousel-control-next {
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.7;
  margin: 0 1rem;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel-indicators {
  bottom: -3rem;
}

.carousel-indicators button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #444;
  opacity: 0.5;
  transition: all 0.2s ease;
  margin: 0 6px;
}

.carousel-indicators button.active {
  opacity: 1;
  background-color: #fff;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #666;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 2px solid #222;
  border-top: 2px solid #444;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .news-page {
    padding: 1rem;
  }

  .news-header {
    padding: 2rem 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .news-article {
    min-height: 500px;
    padding: 1rem;
  }

  .article-image {
    height: 250px;
  }

  .article-title {
    font-size: 1.5rem;
  }
}

.footer {
    background: linear-gradient(to right, #1a1a1a, #2a2a2a);
    color: #fff;
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
    background: linear-gradient(90deg, #4CAF50, #2196F3, #9C27B0);
}

.footer__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 3rem;
}

.footer__logo {
    grid-column: span 1;
}

.logo__text {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #4CAF50, #2196F3);
    display: inline-block;
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
    display: inline-block;
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
/* Fade-in animation */
.fade-up {
  opacity: 0;
  animation: fadeInOpacity 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes fadeInOpacity {
  to {
    opacity: 1;
  }
}

/* Animation delay classes */
.delay-1 {
  animation-delay: 0.3s;
}

.delay-2 {
  animation-delay: 0.6s;
}

.delay-3 {
  animation-delay: 0.9s;
}

/* Hover effect for enlarging the text */
.header-section:hover {
  transform: scale(1.15);
  
}
.header-section{
  transition:transform 0.4s ease;
}



</style>
