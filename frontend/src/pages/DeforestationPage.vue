<template>
  <div class="container-fluid p-0">
    <!-- Hero Section -->
    <section class="hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Deforestation</h1>
        <p class="hero-subtitle">A Global Environmental Crisis</p>
      </div>
    </section>

    <!-- Key Statistics -->
    <section class="statistics container my-5">
      <div class="row g-4">
        <div class="col-md-4" data-aos="fade-up">
          <div class="stat-card">
            <h3>15 Billion</h3>
            <p class="highheader">Trees cut down annually</p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="stat-card">
            <h3>46%</h3>
            <p class="highheader">Of Earth's trees have been cleared</p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-card">
            <h3>137</h3>
            <p>Species lost daily due to deforestation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Causes Section -->
    <section class="causes container my-5">
      <h2 class="section-title" data-aos="fade-up">Major Causes</h2>
      <div class="row g-4">
        <div class="col-md-6 col-lg-3" data-aos="fade-up">
          <div class="cause-card">
            <div class="icon">🌾</div>
            <h4>Agriculture</h4>
            <p>80% of deforestation is caused by agricultural expansion</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
          <div class="cause-card">
            <div class="icon">
              <img class="cause-icon" src="media/planting.png" alt="" />
            </div>
            <h4>Urban Development</h4>
            <p>Cities expand into forested areas at alarming rates</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
          <div class="cause-card">
            <div class="icon">🪵</div>
            <h4>Logging</h4>
            <p>Legal and illegal logging destroys millions of acres</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
          <div class="cause-card">
            <div class="icon">🔥</div>
            <h4>Forest Fires</h4>
            <p>Both natural and human-caused fires devastate forests</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Timeline -->
    <section class="timeline container my-5">
      <h2 class="section-title" data-aos="fade-up">Environmental Impact</h2>
      <div class="timeline-container">
        <div class="timeline-item" data-aos="fade-right">
          <h4>Biodiversity Loss</h4>
          <p>137 species of plants, animals, and insects go extinct every day</p>
        </div>
        <div class="timeline-item" data-aos="fade-left">
          <h4>Climate Change</h4>
          <p>15% of greenhouse gas emissions come from deforestation</p>
        </div>
        <div class="timeline-item" data-aos="fade-right">
          <h4>Soil Erosion</h4>
          <p>Leads to reduced agricultural productivity and water pollution</p>
        </div>
      </div>
    </section>

    <!-- Solutions Section -->
    <section class="solutions container my-5">
      <h2 class="section-title" data-aos="fade-up">Solutions</h2>
      <div class="row g-4">
        <div class="col-md-4" data-aos="fade-up">
          <div class="solution-card">
            <h4>Sustainable Farming</h4>
            <p>Implementing better agricultural practices to reduce forest clearing</p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="solution-card">
            <h4>Reforestation</h4>
            <p>Global initiatives to plant billions of trees annually</p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="solution-card">
            <h4>Policy Changes</h4>
            <p>Stricter regulations and enforcement against illegal deforestation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer with Return Button -->
    <div class="footer-section">
      <button class="return-btn">Return to Home</button>
    </div>
  </div>
</template>


<script>
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JS
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

export default {
  mounted() {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  },
};

// Hero section text animation
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.hero-title');
  const text = title.textContent;
  title.textContent = '';

  // Animate each letter with a delay
  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${index * 0.5}s`;
    title.appendChild(span);
  });
});

// Smooth scroll functionality
const sections = document.querySelectorAll('section');
let isScrolling = false;
let currentSection = 0;

// Function to scroll to a specific section
function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentSection = index;
  }
}

// Wheel event handler with debouncing
window.addEventListener('wheel', (e) => {
  if (!isScrolling) {
    isScrolling = true;
    if (e.deltaY > 0) {
      scrollToSection(currentSection + 1);
    } else {
      scrollToSection(currentSection - 1);
    }
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
});

// Return to Home button visibility
const returnButton = document.querySelector('.footer-section');
const solutionsSection = document.querySelector('.solutions');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      returnButton.style.display = 'block';
    } else {
      returnButton.style.display = 'none';
    }
  });
}, { threshold: 0.1 });

observer.observe(solutionsSection);

// Return to Home button click handler
document.querySelector('.return-btn').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize card hover effects
const cards = document.querySelectorAll('.stat-card, .cause-card, .solution-card');

cards.forEach(card => {
  const heading = card.querySelector('h3, h4');
  const icon = card.querySelector('.icon');
  const paragraph = card.querySelector('p');

  if (heading) heading.style.opacity = '1';
  if (icon) icon.style.opacity = '1';
  if (paragraph) paragraph.style.opacity = '0';

  card.addEventListener('mouseenter', () => {
    if (heading) heading.style.opacity = '0';
    if (icon) icon.style.opacity = '0';
    if (paragraph) {
      paragraph.style.opacity = '1';
      paragraph.style.transform = 'translate(-50%, -50%)';
    }
  });

  card.addEventListener('mouseleave', () => {
    if (heading) heading.style.opacity = '1';
    if (icon) icon.style.opacity = '1';
    if (paragraph) {
      paragraph.style.opacity = '0';
      paragraph.style.transform = 'translate(-50%, 100%)';
    }
  });
});
</script>

<style scoped>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hero Section Animations */
.hero-title {
  display: inline-block;
}


.hero-title span {
  opacity: 0;
  display: inline-block;
  animation: fadeIn 0.5s forwards;
}

.hero-subtitle {
  opacity: 0;
  animation: fadeInSubtitle 1s forwards;
  animation-delay: 6s;
  /* Delay until after all letters are shown */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInSubtitle {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Base card styles */
.stat-card,
.cause-card,
.solution-card {
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(255, 255, 255, 0.8);
  text-align: center;
  position: relative;
  overflow: hidden;
  height: 200px;
  transition: var(--transition);
}

/* Section Backgrounds */
section {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  padding: 4rem 0;
  position: relative;
}

section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 0;
}

section>* {
  position: relative;
  z-index: 1;
}

.statistics {
  background-image: url('https://source.unsplash.com/1600x900/?rainforest');
}

.causes {
  background-image: url('https://source.unsplash.com/1600x900/?logging');
}

.timeline {
  background-image: url('https://source.unsplash.com/1600x900/?climate-change');
}

.solutions {
  background-image: url('https://source.unsplash.com/1600x900/?reforestation');
  margin-bottom: 0;
  padding-bottom: 2rem;
}

/* Footer Section */
.footer-section {
  background-color: var(--primary-color);
  padding: 2rem 0;
  text-align: center;
  display: none;
}

.return-btn {
  background: white;
  color: var(--primary-color);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: var(--transition);
  font-weight: bold;
}

.return-btn:hover {
  background: var(--secondary-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Center h2 */
h2.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: smaller;
}

/* Center Environmental Impact Cards */
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.timeline-item {
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05);
  width: 80%;
  max-width: 600px;
}

/* Statistics Cards */
.stat-card h3 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  transition: var(--transition);
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.stat-card:hover h3 {
  opacity: 0;
}

.stat-card p {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 1rem;
  transform: translate(-50%, 100%);
  opacity: 0;
  transition: var(--transition);
}

.stat-card:hover p {
  transform: translate(-50%, -50%);
  opacity: 1;
}

/* Cause Cards */
.cause-card {
  height: 180px;
}

.cause-card .icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  margin-top: -0.5rem;
  transition: var(--transition);
  opacity: 1;
}

.cause-card h4 {
  transition: var(--transition);
  opacity: 1;
  margin-bottom: 0.5rem;
}

.cause-card:hover .icon,
.cause-card:hover h4 {
  opacity: 0;
}

.cause-card p {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 1rem;
  transform: translate(-50%, 100%);
  opacity: 0;
  transition: var(--transition);
}

.cause-card:hover p {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.cause-icon {
  min-width: 3vw;
  max-width: 3vw;
  height: auto;
}

/* Solution Cards */
.solution-card h4 {
  transition: var(--transition);
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.solution-card:hover h4 {
  opacity: 0;
}

.solution-card p {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 1rem;
  transform: translate(-50%, 100%);
  opacity: 0;
  transition: var(--transition);
}

.solution-card:hover p {
  transform: translate(-50%, -50%);
  opacity: 1;
}

/* Hero Section */
.hero {
  height: 100vh;
  background-image: url('https://source.unsplash.com/1600x900/?forest,deforestation');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .stat-card,
  .cause-card,
  .solution-card {
    height: 160px;
  }

  .stat-card h3 {
    font-size: 2rem;
  }
}
</style>