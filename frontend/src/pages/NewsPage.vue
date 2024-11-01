<template>
  <div class="news-page">
    <h1>Latest News on Volunteering and Climate Change</h1>
    <p class="subtitle">Stay updated with the latest insights on sustainability and environmental initiatives around the world.</p>

    <section v-if="newsArticles.length" class="news-section">
      <div v-for="(article, index) in newsArticles" :key="index" class="news-article">
        <div class="article-content">
          <img :src="article.img" alt="Article Image" class="article-image" />
          <div class="article-details">
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
    </section>

    <p v-else>Loading news...</p>
  </div>
</template>

<script>
const { db } = require('/backend/firebase/firebase.js');
const { collection, getDocs } = require('firebase/firestore');

export default {
  data() {
    return {
      newsArticles: [] // Will hold articles fetched from Firestore
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
.news-page {
  padding: 30px;
  max-width: 1200px; /* Increased width to span more of the page */
  margin: auto;
  font-family: Arial, sans-serif;
  background-color: #f5f9fc;
}

h1 {
  font-size: 36px;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  text-align: center;
  color: #6c757d;
  margin-bottom: 30px;
}

.news-section {
  display: grid;
  gap: 25px;
}

.news-article {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.news-article:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
}

.article-content {
  display: flex;
}

.article-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.article-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-meta {
  font-size: 0.85em;
  color: #666;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.article-date {
  font-style: italic;
}

.article-read {
  color: #007bff;
}

.article-title {
  font-size: 20px;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 10px;
}

.article-summary {
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.read-more-btn {
  align-self: flex-start;
  background-color: #007bff;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.read-more-btn:hover {
  background-color: #0056b3;
}
</style>
