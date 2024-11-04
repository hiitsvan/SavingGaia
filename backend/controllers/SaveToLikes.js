const { db } = require('../firebase/firebase.js'); // Ensure this path is correct
const { collection, doc, setDoc, getDoc, deleteDoc } = require('firebase/firestore');

const SaveToLikes = async (req, res) => {
    try {
        const { userId, opportunityId } = req.body;

        if (!userId || !opportunityId) {
            return res.status(400).json({ error: 'Missing userId or opportunityId' });
        }

        // Reference to the user's likes collection
        const userLikesRef = collection(db, 'users', userId, 'likes');
        const opportunityDocRef = doc(userLikesRef, opportunityId);

        // Check if the opportunity is already liked
        const opportunitySnapshot = await getDoc(opportunityDocRef);
        if (opportunitySnapshot.exists()) {
            // If already liked, unlike it
            await deleteDoc(opportunityDocRef);
            return res.status(200).json({ message: 'Opportunity unliked successfully' });
        }

        // Save the opportunity to the user's likes collection
        await setDoc(opportunityDocRef, { likedAt: new Date() });

        res.status(200).json({ message: 'Opportunity saved to likes successfully' });
    } catch (error) {
        console.error('Error saving opportunity to likes:', error);
        res.status(500).json({ error: 'Failed to save opportunity to likes' });
    }
};

module.exports = {
    SaveToLikes,
};
