document.addEventListener('DOMContentLoaded', () => { // js only runs after the page has loaded
    const header = document.querySelector('#selectionInfo h1');
    const volunteerCards = document.querySelectorAll('.volunteer-card');
    const cardsSection = document.getElementById('allCards');
    const comparisonTable = document.getElementById('comparison-table');
    const resetButton = document.getElementById('reset-comparison');
    
    let selectedCards = [];

    function updateHeader() {
        if (selectedCards.length === 0) {
            header.textContent = 'Please select 2 of your saved volunteer work';
        } else if (selectedCards.length === 1) {
            header.textContent = 'Please select one more';
        } else {
            header.textContent = 'Here are the comparisons between the two:';
        }
    }

    function updateComparisonTable() {
        if (selectedCards.length === 2) {
            const [card1, card2] = selectedCards; //asigns the two elemeents to 2 separate DOMS
            
            // Update table cells with selected cards' data
            document.getElementById('title1').textContent = card1.querySelector('h3').textContent;
            document.getElementById('title2').textContent = card2.querySelector('h3').textContent;
            
            // Get all paragraphs from cards and update table
            const fields = ['Date', 'Duration', 'Event Type', 'Location', 'Distance'];
            const tableIds = ['date', 'duration', 'type', 'location', 'distance'];
            
            fields.forEach((field, idx) => {
                const card1Value = Array.from(card1.querySelectorAll('p')) // selects all <p> elements in card1 and convert 
                //  them to array so that other functions can be used such as push pop filter find map etc.
                    .find(p => p.textContent.includes(field)) // find the FIRST <p> element that contains the field
                    .textContent.split(':')[1];

                const card2Value = Array.from(card2.querySelectorAll('p'))
                    .find(p => p.textContent.includes(field))
                    .textContent.split(':')[1];
                
                document.getElementById(`${tableIds[idx]}1`).textContent = card1Value; //append to the table
                document.getElementById(`${tableIds[idx]}2`).textContent = card2Value;
            });

            // Hide cards section and show comparison table
            cardsSection.classList.add('hidden');
            comparisonTable.classList.remove('hidden');
            setTimeout(() => comparisonTable.classList.add('visible'), 100); // fade in effect
        }
    }

    volunteerCards.forEach(card => {  // add event listener to each card
        card.addEventListener('click', () => {
            if (selectedCards.length < 2 && !selectedCards.includes(card)) { // selects card && 
                card.classList.add('selected'); // add "selected" class to card => style border in css
                selectedCards.push(card); // card is DOM element.
                updateHeader(); // update header text
                
                if (selectedCards.length === 2) {
                    updateComparisonTable();
                }
            }
        });
    });

    resetButton.addEventListener('click', () => {
        selectedCards.forEach(card => card.classList.remove('selected'));
        selectedCards = [];
        comparisonTable.classList.remove('visible'); // styling purposes
        setTimeout(() => {
            comparisonTable.classList.add('hidden');
            cardsSection.classList.remove('hidden');
            updateHeader();
        }, 500);
    });
});