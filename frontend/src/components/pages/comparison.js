export default {
    data() {
      return {
        selectedCards: [],
      };
    },
    mounted() {
      const header = this.$el.querySelector('#selectionInfo h1');
      const volunteerCards = this.$el.querySelectorAll('.volunteer-card');
      const cardsSection = this.$el.querySelector('#allCards');
      const comparisonTable = this.$el.querySelector('#comparison-table');
      const resetButton = this.$el.querySelector('#reset-comparison');
  
      const updateHeader = () => {
        if (this.selectedCards.length === 0) {
          header.textContent = 'Please select 2 of your saved volunteer work';
        } else if (this.selectedCards.length === 1) {
          header.textContent = 'Please select one more';
        } else {
          header.textContent = 'Here are the comparisons between the two:';
        }
      };
  
      const updateComparisonTable = () => {
        if (this.selectedCards.length === 2) {
          const [card1, card2] = this.selectedCards;
  
          document.getElementById('title1').textContent = card1.querySelector('h3').textContent;
          document.getElementById('title2').textContent = card2.querySelector('h3').textContent;
  
          const fields = ['Date', 'Duration', 'Event Type', 'Location', 'Distance'];
          const tableIds = ['date', 'duration', 'type', 'location', 'distance'];
  
          fields.forEach((field, idx) => {
            const card1Value = Array.from(card1.querySelectorAll('p'))
              .find(p => p.textContent.includes(field))
              .textContent.split(': ')[1];
            const card2Value = Array.from(card2.querySelectorAll('p'))
              .find(p => p.textContent.includes(field))
              .textContent.split(': ')[1];
  
            document.getElementById(`${tableIds[idx]}1`).textContent = card1Value;
            document.getElementById(`${tableIds[idx]}2`).textContent = card2Value;
          });
  
          cardsSection.classList.add('hidden');
          comparisonTable.classList.remove('hidden');
          setTimeout(() => comparisonTable.classList.add('visible'), 100);
        }
      };
  
      volunteerCards.forEach(card => {
        card.addEventListener('click', () => {
          if (this.selectedCards.length < 2 && !this.selectedCards.includes(card)) {
            card.classList.add('selected');
            this.selectedCards.push(card);
            updateHeader();
  
            if (this.selectedCards.length === 2) {
              updateComparisonTable();
            }
          }
        });
      });
  
      resetButton.addEventListener('click', () => {
        this.selectedCards.forEach(card => card.classList.remove('selected'));
        this.selectedCards = [];
        comparisonTable.classList.remove('visible');
        setTimeout(() => {
          comparisonTable.classList.add('hidden');
          cardsSection.classList.remove('hidden');
          updateHeader();
        }, 500);
      });
  
      updateHeader(); // Initial call to set header text
    },
  };