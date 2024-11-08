const { db } = require('../firebase/firebaseAdmin');

const SaveCompletedWorks = async (req, res) => {
    try {
        const { userId, works } = req.body;
        
        if (!userId || !works || !Array.isArray(works)) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        const batch = db.batch();
        
        works.forEach(work => {
            // Use the work's ID as the document ID
            const workRef = db.collection('completed-works').doc(work.id);
            const workData = {
                ...work,
                userId,
                completionDate: new Date().toISOString()
            };
            batch.set(workRef, workData);
        });

        await batch.commit();
        console.log(`Successfully saved ${works.length} completed works`);
        res.status(201).json({ message: 'Works saved successfully' });
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

        res.json(completedWorks);
    } catch (error) {
        console.error('Error in GetUserCompletedWorks:', error);
        res.status(500).json({ error: error.message });
    }
};

const DeleteCompletedWork = async (req, res) => {
    try {
        const { userId, workId } = req.params;
        console.log('Deleting work:', { userId, workId });
        
        if (!userId || !workId) {
            return res.status(400).json({ error: 'User ID and Work ID are required' });
        }

        // Get the work document first
        const workRef = db.collection('completed-works').doc(workId);
        const workDoc = await workRef.get();

        if (!workDoc.exists) {
            console.log('Work not found:', workId);
            return res.status(404).json({ error: 'Work not found' });
        }

        const workData = workDoc.data();
        
        // Check if the work belongs to the user
        if (workData.userId !== userId) {
            console.log('Unauthorized deletion attempt:', { workUserId: workData.userId, requestUserId: userId });
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Delete the work
        await workRef.delete();
        
        // Return the deleted work data
        res.json({ 
            message: 'Work deleted successfully',
            deletedWork: { ...workData, id: workId }
        });
    } catch (error) {
        console.error('Error in DeleteCompletedWork:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    SaveCompletedWorks,
    GetUserCompletedWorks,
    DeleteCompletedWork
};