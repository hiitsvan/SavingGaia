document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('#selection-header h1');
  const volunteerCards = document.querySelectorAll('.volunteer-card');
  const cardsSection = document.getElementById('volunteer-cards');
  const comparisonTable = document.getElementById('comparison-table');
//   const resetButton = document.getElementById('reset-comparison');
  
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
          const [card1, card2] = selectedCards;
          
          // Update table cells with selected cards' data
          document.getElementById('title1').textContent = card1.querySelector('h3').textContent;
          document.getElementById('title2').textContent = card2.querySelector('h3').textContent;
          
          // Get all paragraphs from cards and update table
          const fields = ['Date:', 'Duration:', 'Event Type:', 'Location:', 'Distance:'];
          const tableIds = ['date', 'duration', 'type', 'location', 'distance'];
          
          fields.forEach((field, index) => {
              const card1Value = Array.from(card1.querySelectorAll('p'))
                  .find(p => p.textContent.includes(field.split(':')[0]))
                  ?.textContent.split(': ')[1];
              const card2Value = Array.from(card2.querySelectorAll('p'))
                  .find(p => p.textContent.includes(field.split(':')[0]))
                  ?.textContent.split(': ')[1];
              
              document.getElementById(`${tableIds[index]}1`).textContent = card1Value;
              document.getElementById(`${tableIds[index]}2`).textContent = card2Value;
          });

          // Hide cards section and show comparison table
          cardsSection.classList.add('hidden');
          comparisonTable.classList.remove('hidden');
          setTimeout(() => comparisonTable.classList.add('visible'), 100);
      }
  }

  volunteerCards.forEach(card => {
      card.addEventListener('click', () => {
          if (selectedCards.length < 2 && !selectedCards.includes(card)) {
              card.classList.add('selected');
              selectedCards.push(card);
              updateHeader();
              
              if (selectedCards.length === 2) {
                  updateComparisonTable();
              }
          }
      });
  });

//   resetButton.addEventListener('click', () => {
//       selectedCards.forEach(card => card.classList.remove('selected'));
//       selectedCards = [];
//       comparisonTable.classList.remove('visible');
//       setTimeout(() => {
//           comparisonTable.classList.add('hidden');
//           cardsSection.classList.remove('hidden');
//           updateHeader();
//       }, 500);
//   });
});