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
        const { userId, opportunityId } = req.params;

        if (!userId || !opportunityId) {
            return res.status(400).json({ error: 'Missing userId or opportunityId' });
        }

        // Reference to the user's likes subcollection
        const userLikesRef = db.collection('users').doc(userId).collection('likes').doc(opportunityId);

        // Check if the opportunity is already liked
        const opportunitySnapshot = await userLikesRef.get();
        const isLiked = opportunitySnapshot.exists;

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

module.exports = {
    SaveToLikes,
    CheckIfLiked,
    RemoveFromLikes,
};
