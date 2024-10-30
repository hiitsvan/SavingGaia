

<template>
  <div class="news-page">
    <h1>Latest News on Volunteering and Climate Change</h1>

    <section v-if="newsArticles.length" class="news-section">
      <div v-for="(article, index) in newsArticles" :key="index" class="news-article">
        <img :src="article.img" alt="Article Image" class="article-image" />
        <h2>{{ article.title }}</h2>
        <p>{{ article.desc }}</p>
        <a :href="article.link" target="_blank" class="read-more-btn">Read more</a>
      </div>
    </section>

    <p v-else>Loading news...</p>
  </div>
</template>

<script>

// Import Firebase Firestore functionality and the initialized `db` instance
// Use require to import db if using require syntax in firebase.js
const { db } = require('/backend/firebase/firebase.js'); // Adjust the path if needed

// Import necessary Firestore functions
const { collection, getDocs } = require('firebase/firestore');



export default {
  data() {
    return {
      newsArticles: [] // Will hold articles fetched from Firestore
    };
  },
  async created() {
    try {
      // Fetch documents from the "news" collection
      const querySnapshot = await getDocs(collection(db, "news"));
      // Map the documents to an array of data objects
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
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
  background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png');
  background-color: #e8f5e9;
}

.news-page h1 {
  font-size: 26px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 25px;
}

.news-section {
  display: grid;
  gap: 20px;
}

.news-article {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.news-article:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
}

.article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.news-article h2 {
  font-size: 20px;
  color: #3498db;
  margin: 15px;
}

.news-article p {
  font-size: 16px;
  color: #666;
  margin: 0 15px 15px;
  line-height: 1.6;
}

.read-more-btn {
  display: inline-block;
  background-color: #3498db;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin: 0 15px 15px;
  transition: background-color 0.3s;
}

.read-more-btn:hover {
  background-color: #2980b9;
}
</style>

