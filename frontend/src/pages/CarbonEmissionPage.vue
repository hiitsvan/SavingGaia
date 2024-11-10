<template>
  <div class="container-fluid p-0">
    <!-- Hero Section -->
    <section class="hero" style="background-image: url('media/carbonHero.jpg'); background-size: cover;">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span v-for="(letter, index) in heroLetters" :key="index" class="hero-letter"
            :style="{ animationDelay: `${index * 0.1}s` }">
            {{ letter }}
          </span>
        </h1>
        <p class="hero-subtitle">The Primary Driver of Climate Change</p>
      </div>
    </section>

    <!-- Key Statistics -->
    <section class="statistics" style="background-image: url('media/carbonCauses.jpg'); background-size: cover;">
      <div class="overlay"></div>
      <h2 class="section-title" data-aos="fade-up">Key Statistics</h2>
      <div class="row g-4">
        <div class="col-md-4" data-aos="fade-up">
          <div class="stat-card">
            <h3>36.3 GT</h3>
            <p>Global <b>CO2</b> emissions <b>annually</b></p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="stat-card">
            <h3>419 ppm</h3>
            <p><b>Current</b> atmospheric <b>CO2</b> levels</p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-card">
            <h3>1.1°C</h3>
            <p><b>Global temperature rise</b> since 1900</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Causes Section -->
    <section class="causes" style="background-image: url('media/carbonCauses.jpg'); background-size: cover;">
      <div class="overlay"></div>
      <h2 class="section-title" data-aos="fade-up">Major Sources</h2>
      <div class="row g-4">
        <div class="col-md-6 col-lg-3" data-aos="fade-up">
          <div class="cause-card">
            <div class="icon">
              <img src="media/energy.png" alt="Icon" />
            </div>
            <h4>Energy Production</h4>
            <p><b>Fossil fuel</b> burning accounts for <b>75%</b> of global emissions</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
          <div class="cause-card">
            <div class="icon">
              <img src="media/transportation.png" alt="Icon" />
            </div>
            <h4>Transportation</h4>
            <p><b>Cars, planes, and ships</b> contribute <b>24% of emissions</b></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
          <div class="cause-card">
            <div class="icon">
              <img src="media/factory.png" alt="Icon" />
            </div>
            <h4>Industry</h4>
            <p>Manufacturing and production create <b>21% of emissions</b></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
          <div class="cause-card">
            <div class="icon">
              <img src="media/field.png" alt="Icon" />
            </div>
            <h4>Agriculture</h4>
            <p>Farming and livestock produce <b>24% of greenhouse gases</b></p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Timeline -->
    <section class="timeline" style="background-image: url('media/carbonTimeline.jpg'); background-size: cover;">
      <div class="overlay"></div>
      <h2 class="section-title" data-aos="fade-up">Environmental Impact</h2>
      <div class="timeline-container">
        <div class="timeline-item" data-aos="fade-right">
          <h4>Global Warming</h4>
          <p>Rising temperatures leading to <b>extreme weather events</b></p>
        </div>
        <div class="timeline-item" data-aos="fade-left">
          <h4>Ocean Acidification</h4>
          <p>CO2 absorption making oceans <b>30% more acidic</b></p>
        </div>
        <div class="timeline-item" data-aos="fade-right">
          <h4>Air Quality</h4>
          <p>Poor air quality causing <b>7 million premature deaths annually</b></p>
        </div>
      </div>
    </section>

    <!-- Solutions Section -->
    <section class="solutions"
      style="background-image: url('media/carbonSolution.jpg'); background-size: cover; background-position: center -8vh;">
      <div class="overlay"></div>
      <h2 class="section-title" data-aos="fade-up">Solutions</h2>
      <div class="row g-4">
        <div class="col-md-4" data-aos="fade-up">
          <div class="solution-card">
            <h4>Renewable Energy</h4>
            <p>Transitioning to <b>solar, wind,</b> and other <b>clean energy sources</b></p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="solution-card">
            <h4>Electric Vehicles</h4>
            <p>Shifting to <b>zero-emission transportation</b> options</p>
          </div>
        </div>
        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="solution-card">
            <h4>Carbon Capture</h4>
            <p>Implementing <b>technologies</b> to <b>remove CO2</b> from the atmosphere</p>
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
  name: 'CarbonEmissionsPage',
  data() {
    return {
      title: 'Carbon',
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
  overflow: hidden;
  width: 100%;
}

/* Hero Section */
.hero {
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;

}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 6rem);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.5s ease;
}

.hero-title:hover{
transform: scale(1.25);
}

.hero-letter {
  display: inline-block;
  opacity: 0;
  animation: letterFadeIn 0.5s forwards;
  transform-origin: center;
}

@keyframes letterFadeIn {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  opacity: 0;
  animation: fadeInSubtitle 1s forwards;
  animation-delay: 1.5s;
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

/* Section Styles */
section {
  background-attachment: fixed !important;
  background-size: cover !important;
  background-position: center !important;
  padding: 6rem 0;
  position: relative;
}

img {
  min-width: 4vw;
  max-width: 4vw;
  height: auto;
  margin-bottom: 1rem;
}

section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 0;
}

section>* {
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

/* Card Styles */
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
  font-size: 3.5vh;
}

.stat-card h3,
.cause-card h4,
.solution-card h4 {
  transition: var(--transition);
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.stat-card h3 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
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
  width: clamp(32px, 4vw, 48px);
  height: auto;
  min-width: auto;
  max-width: none;
  margin-bottom: 0;
}


.stat-card:hover h3,
.cause-card:hover h4,
.cause-card:hover .icon,
.solution-card:hover h4 {
  opacity: 0;
}

.stat-card p,
.cause-card p,
.solution-card p {
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
  transition: all 0.5s ease-in-out;
}

/* Timeline Styles */
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
  justify-content: center;
  text-align: center;
}

/* Footer Styles */
.footer-section {
  background-color: var(--primary-color);
  padding: 2rem 0;
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

/* Responsive Design */
@media (max-width: 768px) {
  section {
    padding: 4rem 0;
  }

  .stat-card,
  .cause-card,
  .solution-card {
    height: 160px;
  }

  .stat-card h3 {
    font-size: 2rem;
  }

  .timeline-item {
    width: 90%;
  }
}
</style>