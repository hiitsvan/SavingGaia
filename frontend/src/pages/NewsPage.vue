<template>
  <div class="news-page">
    <div class="news-header">
      <h1>Latest News on Volunteering and Climate Change</h1>
      <p class="subtitle">Stay updated with the latest insights on sustainability and environmental initiatives around the world.</p>
    </div>



    <!-- Carousel Section -->
    <div v-if="newsArticles.length" id="newsCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(article, index) in newsArticles"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="news-article">
            <img :src="article.img" alt="Article Image" class="article-image" />
            <div class="article-content">
              <div class="article-meta">
                <span class="article-date">{{ article.date || 'Date Unavailable' }}</span>
                <span class="article-read">{{ article.readTime || '3 min read' }}</span>
              </div>
              <h2 class="article-title">{{ article.title }}</h2>
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

      <!-- Carousel indicators -->
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in newsArticles"
          :key="index"
          type="button"
          data-bs-target="#newsCarousel"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
    </div>

    <div v-else class="loading-state">
      <div class="spinner"></div>
      <p>Loading news...</p>
    </div>
  </div>
</template>

<script>
const { db } = require('/backend/firebase/firebase.js');
const { collection, getDocs } = require('firebase/firestore');

export default {
  data() {
    return {
      newsArticles: []
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      this.newsArticles = querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error fetching news articles: ", error);
    }
  }
};
</script>

<style scoped>
.<style scoped>
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
</style>
