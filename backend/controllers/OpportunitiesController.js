const { db } = require('../firebase/firebaseAdmin.js'); // Import Firestore from Firebase Admin SDK

const searchOpportunities = async (req, res) => {
  try {
    console.log("Query parameters:", req.query);

    let keywords = req.query.keywords && req.query.keywords.trim() ? req.query.keywords.toLowerCase() : null;
    let startTime = req.query.startTime && req.query.startTime.trim() ? req.query.startTime : null;
    let endTime = req.query.endTime && req.query.endTime.trim() ? req.query.endTime : null;
    let locations = req.query.locations;
    if (!locations) {
      locations = [];
    } else if (!Array.isArray(locations)) {
      locations = [locations];
    }
    let commitment = req.query.commitment && req.query.commitment.trim() ? req.query.commitment.toLowerCase() : null;

    console.log("Received Params:", { keywords, startTime, endTime, locations, commitment });

    // Get the reference to the 'opportunities' collection
    const opportunitiesRef = db.collection('opportunities');
    const querySnapshot = await opportunitiesRef.get(); // Use Admin SDK's get method
    const allOpportunities = [];

    // Gather all opportunities from Firestore
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      allOpportunities.push({
        id: doc.id,
        ...data,
      });
    });

    let results = allOpportunities;

    // Filter results based on provided query params
    if (keywords) {
      const keywordArray = keywords.split(' ').map(keyword => keyword.trim()).filter(Boolean);
      results = results.filter(opportunity => {
        return keywordArray.some(keyword =>
          (opportunity.name && opportunity.name.toLowerCase().includes(keyword)) ||
          (opportunity.organisation && opportunity.organisation.toLowerCase().includes(keyword)) ||
          (Array.isArray(opportunity.tags) && opportunity.tags.some(tag => tag.toLowerCase().includes(keyword))) ||
          (opportunity.desc && opportunity.desc.toLowerCase().includes(keyword))
        );
      });
    }

    if (locations.length > 0) {
      results = results.filter(opportunity => {
        if (!opportunity.location) return false;
        return locations.some(locationKey => opportunity.location[locationKey]);
      });
    }

    if (commitment) {
      results = results.filter(opportunity => {
        return opportunity.roles && Object.values(opportunity.roles).some(roleValue =>
          roleValue.toLowerCase() === commitment
        );
      });
    }

    if (startTime && endTime) {
      const [filterStartHours, filterStartMinutes] = startTime.split(':').map(Number);
      const [filterEndHours, filterEndMinutes] = endTime.split(':').map(Number);
      const filterStartTimeInMinutes = filterStartHours * 60 + filterStartMinutes;
      const filterEndTimeInMinutes = filterEndHours * 60 + filterEndMinutes;

      results = results.filter(opportunity => {
        if (!opportunity.startTime || typeof opportunity.startTime.toDate !== 'function') {
          return false;
        }

        try {
          const opportunityStartDate = opportunity.startTime.toDate();
          const opportunityHours = opportunityStartDate.getHours();
          const opportunityMinutes = opportunityStartDate.getMinutes();
          const opportunityTimeInMinutes = opportunityHours * 60 + opportunityMinutes;

          return (
            opportunityTimeInMinutes >= filterStartTimeInMinutes &&
            opportunityTimeInMinutes <= filterEndTimeInMinutes
          );
        } catch (error) {
          console.error("Error converting timestamp to date:", error);
          return false;
        }
      });
    }

    res.status(200).json(results);

  } catch (error) {
    console.error("Error searching opportunities:", error);
    res.status(500).json({ error: 'Failed to search opportunities' });
  }
};

const getOpportunityById = async (req, res) => {
  const { id } = req.params;

  try {
    const opportunityDoc = await db.collection('opportunities').doc(id).get();
    if (opportunityDoc.exists) {
      res.status(200).json(opportunityDoc.data());
    } else {
      res.status(404).json({ message: 'Opportunity not found' });
    }
  } catch (error) {
    console.error('Error fetching opportunity details:', error);
    res.status(500).json({ message: 'Error fetching opportunity details' });
  }
};

module.exports = {
  searchOpportunities,
  getOpportunityById
};
