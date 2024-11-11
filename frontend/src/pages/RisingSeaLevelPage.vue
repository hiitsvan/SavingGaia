<template>
  <div class="container-fluid p-0">
    <!-- Hero Section -->
    <section class="hero" style="background-image: url('media/seaHero.jpg'); background-size: cover;">
        <div class="overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">
            <div class="title-wrapper">
              <span v-for="(letter, index) in heroLetters" :key="index" class="hero-letter"
                :style="{ animationDelay: `${index * 0.1}s` }">
                {{ letter }}
              </span>
            </div>
          </h1>
          <p class="hero-subtitle">A Critical Climate Change Impact</p>
        </div>
    </section>

    <!-- Key Statistics -->
    <section class="statistics" style="background-image: url('media/seaStats.jpg'); background-size: cover;">
      <div class="overlay"></div>
      <h2 class="section-title" data-aos="fade-up">Key Statistics</h2>
      <div class="row g-4">
        <div class="col-md-4" data-aos="fade-up">
          <div class="stat-card">
            <h3>3.4 mm</h3>
            <p><b>Annual sea level rise rate</b></p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="stat-card">
            <h3>8 inches</h3>
            <p><b>Sea level rise since 1900</b></p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-card">
            <h3>1 Billion</h3>
            <p><b>People at risk by 2050</b></p>
          </div>
        </div>
      </div>
    </section>

    <!-- Causes Section -->
    <section class="causes" style="background-image: url('media/seaStats.jpg'); background-size: cover;">
      <div class="overlay"></div>
      <h2 class="section-title" data-aos="fade-up">Major Causes</h2>
      <div class="row g-4">
        <div class="col-md-6 col-lg-3" data-aos="fade-up">
          <div class="cause-card">
            <div class="icon">
              <img src="media/thermal.png" alt="Icon" />
            </div>
            <h4>Thermal Expansion</h4>
            <p>Warming oceans contribute to <b>50% of sea level rise</b></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
          <div class="cause-card">
            <div class="icon">
              <img src="media/glacier.png" alt="Icon" />
            </div>
            <h4>Melting Glaciers</h4>
            <p>Mountain glaciers are <b>rapidly disappearing</b> worldwide</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
          <div class="cause-card">
            <div class="icon">
              <img src="media/global-warming.png" alt="Icon" />
            </div>
            <h4>LoIce Sheet Lossgging</h4>
            <p>Greenland and Antarctica <b>lose billions of tons</b> of ice annually</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
          <div class="cause-card">
            <div class="icon">
              <img src="media/flood.png" alt="Icon" />
            </div>
            <h4>Land Subsidence</h4>
            <p><b>Coastal land sinking</b> due to groundwater extraction and development</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Timeline -->
    <section class="timeline" style="background-image: url('media/seaCauses.jpg'); background-size: cover;">
      <div class="overlay"></div>
      <h2 class="section-title" data-aos="fade-up">Environmental Impact</h2>
      <div class="timeline-container">
        <div class="timeline-item" data-aos="fade-right">
          <h4>Coastal Flooding</h4>
          <p><b>Increased frequency of flooding</b> in coastal cities and islands</p>
        </div>
        <div class="timeline-item" data-aos="fade-left">
          <h4>Ecosystem Destruction</h4>
          <p>Loss of <b>coastal wetlands</b> and critical <b>marine habitats</b></p>
        </div>
        <div class="timeline-item" data-aos="fade-right">
          <h4>Population Displacement</h4>
          <p><b>Millions</b> forced to <b>relocate</b> from coastal and low-lying areas</p>
        </div>
      </div>
    </section>

    <!-- Solutions Section -->
    <section class="solutions" style="background-image: url('media//seaSolution.jpg'); background-size: cover;">
      <div class="overlay"></div>
      <h2 class="section-title" data-aos="fade-up">Solutions</h2>
      <div class="row g-4">
        <div class="col-md-4" data-aos="fade-up">
          <div class="solution-card">
            <h4>Emission Reduction</h4>
            <p>Implementing <b>clean energy solutions</b> to slow global warming</p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="solution-card">
            <h4>Coastal Protection</h4>
            <p>Building <b>sea walls</b> and restoring <b>natural barriers</b> like mangroves</p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="solution-card">
            <h4>Adaptation Planning</h4>
            <p>Developing <b>resilient infrastructure</b> and <b>relocation</b> strategies</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer with Return Button -->
    <div class="footer-section" v-show="showReturnButton">
      <router-link to="/">
        <button class="return-btn">Return</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'RisingSeaLevelsPage',
  data() {
    return {
      title: 'Rising Seas',
      showReturnButton: false
    }
  },
  computed: {
    heroLetters() {
      return this.title.split('')
    }
  },
  mounted() {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
    this.setupScrollObserver();
  },
  methods: {
    setupScrollObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.showReturnButton = entry.isIntersecting;
        });
      }, { threshold: 0.1 });

      const solutionsSection = document.querySelector('.solutions');
      if (solutionsSection) {
        observer.observe(solutionsSection);
      }
    }
  }
}
</script>

<style scoped>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.container-fluid {
  overflow-x: hidden;
  width: 100%;
}

/* Hero Section */
.hero {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem 1rem;
  margin: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

section .overlay {
  background: rgba(0, 0, 0, 0.7);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.title-wrapper {
  display: inline-flex;
  white-space: nowrap;
  overflow: visible;
}

.hero-title {
  font-size: min(8vw, 5rem);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
  transition: transform 0.5s ease;
  padding: 0 1rem;
  line-height: 1.2;
}

.hero-letter {
  display: inline-block;
  margin: 0 0.25rem;
  opacity: 0;
  animation: letterFadeIn 0.5s forwards;
}

.hero-title:hover {
  transform: scale(1.1);
}

.hero-subtitle {
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  opacity: 0;
  animation: fadeInSubtitle 1s forwards;
  animation-delay: 1.5s;
  padding: 0 1rem;
  margin-top: 1rem;
}

/* Section Styles */
section {
  background-attachment: fixed !important;
  background-size: cover !important;
  background-position: center !important;
  padding: clamp(3rem, 6vw, 6rem) 1rem;
  position: relative;
  overflow: hidden;
}

section > * {
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  color: white;
  position: relative;
  z-index: 2;
}

/* Card Styles */
.stat-card,
.cause-card,
.solution-card {
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  padding: clamp(1.5rem, 3vw, 2rem);
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(255, 255, 255, 0.8);
  text-align: center;
  position: relative;
  overflow: hidden;
  height: auto;
  min-height: clamp(180px, 25vw, 200px);
  transition: var(--transition);
}

.stat-card h3,
.cause-card h4,
.solution-card h4 {
  font-size: clamp(1.2rem, 3vw, 2rem);
  transition: var(--transition);
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 1rem;
}

.stat-card h3 {
  font-size: clamp(1.8rem, 4vw, 3rem);
  margin-bottom: 0.5rem;
}

.stat-card p,
.cause-card p,
.solution-card p {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  padding: 1rem;
  transform: translate(-50%, 100%);
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.stat-card:hover p,
.cause-card:hover p,
.solution-card:hover p {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.stat-card:hover h3,
.cause-card:hover h4,
.cause-card:hover .icon,
.solution-card:hover h4 {
  opacity: 0;
}

.cause-card .icon {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: var(--transition);
  opacity: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cause-card .icon img {
  width: clamp(32px, 6vw, 48px);
  height: auto;
  min-width: auto;
  max-width: none;
  margin-bottom: 0;
}

/* Timeline Styles */
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2rem);
  padding: 0 1rem;
}

.timeline-item {
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  padding: clamp(1.5rem, 3vw, 2rem);
  border-radius: 15px;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 600px;
}

.timeline-item h4 {
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin-bottom: 1rem;
}

.timeline-item p {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
}

/* Footer Styles */
.footer-section {
  background-color: var(--primary-color);
  padding: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.return-btn {
  background: black;
  color: white;
  border: none;
  padding: clamp(0.6rem, 2vw, 0.8rem) clamp(1.2rem, 3vw, 1.5rem);
  border-radius: 30px;
  cursor: pointer;
  transition: var(--transition);
  font-weight: bold;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.return-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .row {
    margin: 0;
  }
  
  .col-md-4,
  .col-md-6,
  .col-lg-3 {
    padding: 0.5rem;
  }

  .stat-card,
  .cause-card,
  .solution-card {
    margin: 0.5rem 0;
  }

  .hero-title:hover {
    transform: scale(1.05);
  }

  .hero-title {
    font-size: min(10vw, 5rem);
  }
}

@media (max-width: 480px) {
  .hero {
    height: 100vh;
  }

  .hero-letter {
    margin: 0 0.1rem;
  }

  .section-title {
    margin-bottom: 1.5rem;
  }
}

/* Animations */
@keyframes letterFadeIn {
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
</style>