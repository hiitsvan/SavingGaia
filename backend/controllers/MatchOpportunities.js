const { db } = require('../firebase/firebase.js'); // Make sure this path is correct
const { collection, query, where, getDocs } = require('firebase/firestore');


const searchOpportunities = async (req, res) => {
    try {
        const keywords = req.query.keywords.toLowerCase(); 
        console.log("Keywords:", keywords);

        const keywordArray = keywords.split(' ').map(keyword => keyword.trim()).filter(Boolean);
        console.log("Keyword Array:", keywordArray);

        const opportunitiesRef = collection(db, 'opportunities');
        const querySnapshot = await getDocs(opportunitiesRef);
        const allOpportunities = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            allOpportunities.push({
                id: doc.id,
                name: data.name.toLowerCase().trim(),
                organisation: data.organisation.toLowerCase().trim(),
                tags: data.tags,
                desc: data.desc.toLowerCase().trim()
            });
        });

        const results = allOpportunities.filter(opportunity => {
            const nameMatch = keywordArray.some(keyword => 
                opportunity.name.includes(keyword)
            );
            const orgMatch = keywordArray.some(keyword => 
                opportunity.organisation.includes(keyword)
            );
            const tagsMatch = keywordArray.some(keyword => 
                opportunity.tags.some(tag => tag.toLowerCase().includes(keyword))
            );
            const descMatch = keywordArray.some(keyword=>
                opportunity.desc.includes(keyword)
            );

            console.log("Opportunity:", opportunity);
            console.log("Name Match:", nameMatch);
            console.log("Organisation Match:", orgMatch);
            console.log("Tags Match:", tagsMatch);
            console.log("Desc Match:", descMatch)

            return nameMatch || orgMatch || tagsMatch || descMatch;
        });

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

        // // Create an array to hold all the where clauses
        // let combinedQueries = [];
        // const opportunitiesRef = collection(db, 'opportunities');
        // keywordArray.forEach(keyword => {
        //     const nameQuery = query(
        //         opportunitiesRef,
        //         where('name', '>=', keyword),
        //         where('name', '<=', keyword + '\uf8ff')
        //     );
        
        //     const orgQuery = query(
        //         opportunitiesRef,
        //         where('organisation', '>=', keyword),
        //         where('organisation', '<=', keyword + '\uf8ff')
        //     );

        //     // const descQuery = query(
        //     //     opportunitiesRef,
        //     //     where('desc', '>=', keyword),
        //     //     where('desc', '<=', keyword + '\uf8ff')
        //     // );
        
        //     const tagsQuery = query(
        //         opportunitiesRef,
        //         where('tags', 'array-contains', keyword)
        //     );
        //     combinedQueries.push(nameQuery, orgQuery, tagsQuery);
        // });

        

        // Create a query for each keyword
        // keywordArray.forEach(keyword => {
        //     queries.push(
        //         where('name', '>=', keyword),
        //         where('name', '<=', keyword + '\uf8ff'),
        //         where('organisation', '>=', keyword),
        //         where('organisation', '<=', keyword + '\uf8ff'),
        //         where('desc', '<=', keyword + '\uf8ff'),
        //         where ('desc', '>=', keyword + '\uf8ff'),
        //         where ('roles' 
        //         where('tags', 'array-contains', keyword)
        //     );
        // });

        // Fetch documents from Firestore


        // console.log("aaa")
        // // Prepare the results
        // const allResults = [];
        // for (const q of combinedQueries) {
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //         allResults.push({ id: doc.id, ...doc.data() });
        //     });
        // }
        
//         // Check results
//         if (results.length === 0) {
//             console.log("No matching documents found.");
//         } else {
//             console.log(results); // Display all found documents
//         }
        
//         // Return results

//         // Return the results
//         res.status(200).json(results);
//     } catch (error) {
//         console.error("Error searching opportunities:", error);
//         res.status(500).json({ error: 'Failed to search opportunities' });
//     }
// };

// Export the function
module.exports = {
    searchOpportunities,
};