const { db } = require('../firebase/firebaseAdmin');

const SaveCompletedWorks = async (req, res) => {
    try {
        const { userId, works } = req.body;
        
        if (!userId || !works || !Array.isArray(works)) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        const batch = db.batch();
        
        works.forEach(work => {
            // Use the original work ID instead of generating a new one
            const workRef = db.collection('completed-works').doc(work.id);
            const workData = {
                ...work, // Preserve all original work data
                userId,
                completionDate: new Date().toISOString()
            };
            batch.set(workRef, workData);
        });

        await batch.commit();
        res.status(201).json({ 
            message: 'Works saved successfully',
            count: works.length
        });
    } catch (error) {
        console.error('Error in SaveCompletedWorks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const GetUserCompletedWorks = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Simple query that doesn't require a composite index
        const snapshot = await db.collection('completed-works')
            .where('userId', '==', userId)
            .get();

        const completedWorks = [];
        snapshot.forEach(doc => {
            completedWorks.push({
                ...doc.data(),
                id: doc.id
            });
        });

        // Sort the results in memory instead of in the query
        completedWorks.sort((a, b) => {
            const dateA = new Date(a.completionDate || 0);
            const dateB = new Date(b.completionDate || 0);
            return dateB - dateA;
        });

        res.json(completedWorks);
    } catch (error) {
        console.error('Error in GetUserCompletedWorks:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
};

const DeleteCompletedWork = async (req, res) => {
    try {
        const { userId, workId } = req.params;
        
        if (!userId || !workId) {
            return res.status(400).json({ error: 'User ID and Work ID are required' });
        }

        const workRef = db.collection('completed-works').doc(workId);
        const workDoc = await workRef.get();

        if (!workDoc.exists) {
            return res.status(404).json({ error: 'Work not found' });
        }

        if (workDoc.data().userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await workRef.delete();
        res.json({ message: 'Work deleted successfully' });
    } catch (error) {
        console.error('Error in DeleteCompletedWork:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    SaveCompletedWorks,
    GetUserCompletedWorks,
    DeleteCompletedWork
};