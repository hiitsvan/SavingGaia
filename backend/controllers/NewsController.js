const { db } = require('../firebase/firebaseAdmin.js'); // Make sure the path is correct

// Controller function to get all news articles
const getAllNews = async (req, res) => {
  try {
    // Get the reference to the 'news' collection using the Firebase Admin SDK
    const newsCollection = db.collection('news');
    const querySnapshot = await newsCollection.get();

    // Map the documents to create an array of news articles
    const newsArticles = querySnapshot.docs.map((doc) => ({
      id: doc.id,  // Include document ID
      ...doc.data()  // Spread document data
    }));

    // Send the array of news articles as the response
    res.status(200).json(newsArticles);
  } catch (error) {
    console.error("Error fetching news articles: ", error);
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
};

module.exports = {
  getAllNews,
};
