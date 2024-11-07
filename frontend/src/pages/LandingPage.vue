<template>
  <div class="landing-page-container">
    <main>
      <section id="intro" :class="{ active: currentSection === 0 }">
        <video autoplay muted loop>
          <source src="media/rain_forest.mp4" type="video/mp4">
        </video>
        <button class="start-button" @click="goToNextSection">Begin Journey</button>
      </section>

      <section id="deforestation" :class="{ active: currentSection === 1 }">
        <video autoplay muted loop>
          <source src="media/forestFire.mp4" type="video/mp4">
        </video>
        <div class="content-wrapper">
          <a href="deforestation" target="_self" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'Deforestation'" :key="index" 
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  :class="{ 'animate-char': currentSection === 1 }">
              {{ char }}
            </span>
          </a>
        </div>
        <i class="chevron right" @click="goToNextSection">&gt;</i>
      </section>

      <section id="rising-seas" :class="{ active: currentSection === 2 }">
        <i class="chevron left" @click="goToPrevSection">&lt;</i>
        <video autoplay muted loop>
          <source src="media/waves.mp4" type="video/mp4">
        </video>
        <div class="content-wrapper">
          <a href="risingsealevel" target="_self" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'Rising    Sea    Levels'" :key="index"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  :class="{ 'animate-char': currentSection === 2 }">
              {{ char }}
            </span>
          </a>
        </div>
        <i class="chevron right" @click="goToNextSection">&gt;</i>
      </section>

      <section id="carbonemission" :class="{ active: currentSection === 3 }">
        <i class="chevron left" @click="goToPrevSection">&lt;</i>
        <video autoplay muted loop>
          <source src="media/Carbon.mp4" type="video/mp4">
        </video>
        <div class="content-wrapper">
          <a href="carbonemission" target="_self" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'Carbon    Emission'" :key="index"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  :class="{ 'animate-char': currentSection === 3 }">
              {{ char }}
            </span>
          </a>
        </div>
        <i class="chevron right" @click="goToNextSection">&gt;</i>
      </section>

      <section id="earth-dying" :class="{ active: currentSection === 4 }">
        <i class="chevron left" @click="goToPrevSection">&lt;</i>
        <video autoplay muted loop>
          <source src="media/earthdying.mp4" type="video/mp4">
        </video>
        <div class="final-content-wrapper">
          <a href="https://www.youtube.com/watch?v=SQ2ufFGm9xE" target="_blank" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'It    Is   Not    Too    Late.'" :key="index"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  :class="{ 'animate-char': currentSection === 4 }">
              {{ char }}
            </span>
          </a>
          <button :class="['start-button', 'green-hover', { 'animate-button': currentSection === 4 }]" @click="goToHome">Save Gaia</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      currentSection: 0
    }
  },
  mounted() {
    // Set overflow only for this component's container
    document.querySelector('.landing-page-container').style.overflow = 'hidden';
    this.initializeSection();
    this.setupEventListeners();
  },
  beforeUnmount() {
    // Clean up event listeners
    if (window.innerWidth > 768) {
      window.removeEventListener('wheel', this.handleScroll);
      window.removeEventListener('keydown', this.handleKeyNavigation);
    }
    // Remove touch events
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
  },
  methods: {
    initializeSection() {
      // Initialize the first section
      this.currentSection = 0;
    },
    setupEventListeners() {
      if (window.innerWidth > 768) {
        window.addEventListener('wheel', this.handleScroll, { passive: true });
        window.addEventListener('keydown', this.handleKeyNavigation);
      }
      this.setupTouchEvents();
    },
    goToSection(index) {
      const sections = document.querySelectorAll('section');
      if (index < 0 || index >= sections.length) return;
      
      this.currentSection = index;
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.transform = `translateX(-${index * 100}vw)`;
      }
    },
    goToPrevSection() {
      if (this.currentSection > 0) {
        this.goToSection(this.currentSection - 1);
      }
    },
    goToNextSection() {
      const sections = document.querySelectorAll('section');
      if (this.currentSection < sections.length - 1) {
        this.goToSection(this.currentSection + 1);
      }
    },
    handleScroll(e) {
      e.preventDefault();
      if (e.deltaY > 0) {
        this.goToNextSection();
      } else {
        this.goToPrevSection();
      }
    },
    handleKeyNavigation(e) {
      if (e.key === 'ArrowRight') {
        this.goToNextSection();
      } else if (e.key === 'ArrowLeft') {
        this.goToPrevSection();
      }
    },
    setupTouchEvents() {
      window.addEventListener('touchstart', this.handleTouchStart);
      window.addEventListener('touchend', this.handleTouchEnd);
    },
    handleTouchStart(e) {
      this.touchStart = e.touches[0].clientX;
    },
    handleTouchEnd(e) {
      if (!this.touchStart) return;
      
      const touchEnd = e.changedTouches[0].clientX;
      const diff = this.touchStart - touchEnd;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.goToNextSection();
        } else {
          this.goToPrevSection();
        }
      }
      this.touchStart = null;
    },
    goToHome() {
      this.$router.push("/home");
    }
  }
}
</script>

<style>
/* Reset global styles */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
</style>

<style scoped>
.landing-page-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

main {
  display: flex;
  width: 500vw;
  height: 100vh;
  transition: transform 0.5s ease;
}

section {
  position: relative;
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
  overflow: hidden;
}

.content-wrapper, .final-content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
}

.final-content-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 5rem;
}

video {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 1;
  object-fit: cover;
  filter: brightness(0.4);
}

.section-title {
  font-size: clamp(2rem, 6vw, 4rem);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: #ffffff;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  gap: 0.1em;
  max-width: 80vw;
  flex-wrap: wrap;
  text-decoration: none;
}

.section-title span {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) scale(0.5);
}

.section-title span.animate-char {
  animation: popIn 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
}

.section-title:hover {
  color: #98FB98;
  text-shadow: 0 0 20px #2E8B57;
  transform: scale(1.1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.5);
  }
  70% {
    opacity: 1;
    transform: translateY(-10px) scale(1.2);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.chevron {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  color: #ffffff;
  font-size: 4rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  cursor: pointer;
}

.chevron:hover {
  opacity: 1;
  color: #808080;
}

.chevron.left { left: 2rem; }
.chevron.right { right: 2rem; }

.start-button {
  position: relative;
  z-index: 2;
  padding: 1rem 2rem;
  font-size: clamp(1rem, 4vw, 1.5rem);
  background: transparent;
  color: #ffffff;
  border: 2px solid #808080;
  border-radius: 30px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.start-button:hover {
  background: black;
  color: white;
  transform: scale(1.1);
}

.start-button.green-hover {
  opacity: 0;
  transform: translateY(20px);
}

.start-button.animate-button {
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 1s;
}

.start-button.green-hover:hover {
  background: black;
  border-color: white;
  color: white;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  main {
    flex-direction: row;
    width: 500vw;
    height: 100vh;
    scroll-snap-type: x mandatory;
  }

  section {
    width: 100vw;
    min-height: 100vh;
    scroll-snap-align: start;
  }

  .start-button {
    transform: scale(0.8);
    white-space: nowrap;
  }

  .content-wrapper,
  .final-content-wrapper {
    padding: 2rem;
  }

  .section-title {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    padding: 0 1rem;
    max-width: 80vw;
  }

  .chevron {
    font-size: 2rem;
    padding: 1rem;
  }

  .chevron.left { left: 0.5rem; }
  .chevron.right { right: 0.5rem; }
}

@media (orientation: landscape) and (max-height: 500px) {
  .section-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }

  .start-button {
    padding: 0.75rem 1.5rem;
    font-size: clamp(0.8rem, 3vw, 1.2rem);
  }

  .content-wrapper,
  .final-content-wrapper {
    gap: 1rem;
  }
}

@media (hover: none) {
  .chevron {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .start-button {
    padding: 1.2rem 2.4rem;
  }
}
</style>