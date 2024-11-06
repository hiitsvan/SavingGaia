const { db, admin } = require('../firebase/firebase.js'); // Ensure this path is correct

// Save opportunity to likes
const SaveToLikes = async (req, res) => {
    try {
        const { userId, opportunityId } = req.body;

        if (!userId || !opportunityId) {
            return res.status(400).json({ error: 'Missing userId or opportunityId' });
        }

        // Reference to the user's likes subcollection
        const userLikesRef = db.collection('users').doc(userId).collection('likes').doc(opportunityId);

        // Save the opportunity to the user's likes collection
        await userLikesRef.set({ likedAt: admin.firestore.FieldValue.serverTimestamp() });

        res.status(200).json({ message: 'Opportunity saved to likes successfully' });
    } catch (error) {
        console.error('Error saving opportunity to likes:', error);
        res.status(500).json({ error: 'Failed to save opportunity to likes' });
    }
};

// Check if an opportunity is liked by the user
const CheckIfLiked = async (req, res) => {
    try {
        console.log("poop")
        const { userId, opportunityId } = req.params;
        console.log(`Checking if opportunity ${opportunityId} is liked by user ${userId}`); // Log userId and opportunityId

        if (!userId || !opportunityId) {
            console.error('Missing userId or opportunityId');
            return res.status(400).json({ error: 'Missing userId or opportunityId' });
        }

        // Reference to the user's likes subcollection
        const userLikesRef = db.collection('users').doc(userId).collection('likes').doc(opportunityId);

        // Check if the opportunity is already liked
        const opportunitySnapshot = await userLikesRef.get();
        const isLiked = opportunitySnapshot.exists;

        console.log(`Opportunity ${opportunityId} is liked: ${isLiked}`); // Log whether the opportunity is liked

        res.status(200).json({ isLiked });
    } catch (error) {
        console.error('Error checking if opportunity is liked:', error);
        res.status(500).json({ error: 'Failed to check if opportunity is liked' });
    }
};


// Remove an opportunity from likes
const RemoveFromLikes = async (req, res) => {
    try {
        const { userId, opportunityId } = req.params;

        if (!userId || !opportunityId) {
            return res.status(400).json({ error: 'Missing userId or opportunityId' });
        }

        // Reference to the user's likes subcollection
        const userLikesRef = db.collection('users').doc(userId).collection('likes').doc(opportunityId);

        // Check if the opportunity is already liked
        const opportunitySnapshot = await userLikesRef.get();
        if (opportunitySnapshot.exists) {
            // If already liked, unlike it
            await userLikesRef.delete();
            return res.status(200).json({ message: 'Opportunity unliked successfully' });
        } else {
            return res.status(404).json({ message: 'Opportunity not found in likes' });
        }
    } catch (error) {
        console.error('Error removing opportunity from likes:', error);
        res.status(500).json({ error: 'Failed to remove opportunity from likes' });
    }
};

// Function to get all saved "likes" for a user and fetch their details from opportunities
const GetUserLikes = async (req, res) => {
  const { userId } = req.params;

  try {
    // Reference to the user's likes collection
    const likesCollection = db.collection('users').doc(userId).collection('likes');
    const snapshot = await likesCollection.get();
    
    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    // Prepare an array to hold promises to get opportunity details
    const opportunityPromises = [];

    snapshot.forEach(doc => {
      const opportunityId = doc.id;

      // Reference to the opportunity in the opportunities collection
      const opportunityRef = db.collection('opportunities').doc(opportunityId);
      opportunityPromises.push(opportunityRef.get());
    });

    // Wait for all opportunity queries to resolve
    const opportunitiesSnapshots = await Promise.all(opportunityPromises);

    // Prepare the response data with opportunity details
    const likedOpportunities = opportunitiesSnapshots.map(opportunitySnapshot => {
      if (opportunitySnapshot.exists) {
        return {
          id: opportunitySnapshot.id,
          ...opportunitySnapshot.data(),
        };
      } else {
        console.error(`Opportunity with ID ${opportunitySnapshot.id} not found`);
        return null; // In case the opportunity document is missing
      }
    }).filter(opportunity => opportunity !== null); // Remove any null values

    res.status(200).json(likedOpportunities);
  } catch (error) {
    console.error("Error fetching user likes:", error);
    res.status(500).json({ error: 'Failed to fetch user likes' });
  }
};

module.exports = {
    SaveToLikes,
    CheckIfLiked,
    RemoveFromLikes,
    GetUserLikes
};
