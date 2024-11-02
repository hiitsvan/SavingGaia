const { db } = require('../firebase/firebase.js'); // Make sure this path is correct
const { collection, getDocs } = require('firebase/firestore');

const searchOpportunities = async (req, res) => {
    try {
        // Check if keywords are provided, otherwise default to null
        const keywords = req.query.keywords ? req.query.keywords.toLowerCase() : null;
        console.log("Keywords:", keywords);

        // Get the reference to the 'opportunities' collection
        const opportunitiesRef = collection(db, 'opportunities');
        const querySnapshot = await getDocs(opportunitiesRef);
        const allOpportunities = [];

        // Gather all opportunities from Firestore without modifying the original casing
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            allOpportunities.push({
                id: doc.id,
                name: data.name,
                organisation: data.organisation,
                tags: data.tags,
                desc: data.desc,
                image: data.image,
                location: data.location,
                link: data.link,
                roles: data.roles,
                startTime: data.startTime,
                endTime: data.endTime,
            });
        });

        let results = [];

        if (keywords) {
            // If keywords are provided, split them and filter opportunities
            const keywordArray = keywords.split(' ').map(keyword => keyword.trim()).filter(Boolean);
            console.log("Keyword Array:", keywordArray);

            results = allOpportunities.filter(opportunity => {
                const nameMatch = keywordArray.some(keyword => 
                    opportunity.name && opportunity.name.toLowerCase().includes(keyword)
                );
                const orgMatch = keywordArray.some(keyword => 
                    opportunity.organisation && opportunity.organisation.toLowerCase().includes(keyword)
                );
                const tagsMatch = keywordArray.some(keyword => 
                    opportunity.tags && opportunity.tags.some(tag => tag.toLowerCase().includes(keyword))
                );
                const descMatch = keywordArray.some(keyword =>
                    opportunity.desc && opportunity.desc.toLowerCase().includes(keyword)
                );

                console.log("Opportunity:", opportunity);
                console.log("Name Match:", nameMatch);
                console.log("Organisation Match:", orgMatch);
                console.log("Tags Match:", tagsMatch);
                console.log("Desc Match:", descMatch);

                return nameMatch || orgMatch || tagsMatch || descMatch;
            });
        } else {
            // If no keywords are provided, return all opportunities
            results = allOpportunities;
        }

        if (results.length === 0) {
            console.log("No matching documents found.");
        } else {
            console.log("Found Results:", results);
        }

        res.status(200).json(results);
    } catch (error) {
        console.error("Error searching opportunities:", error);
        res.status(500).json({ error: 'Failed to search opportunities' });
    }
};

// Export the function
module.exports = {
    searchOpportunities,
};
