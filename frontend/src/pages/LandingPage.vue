<template>
  <div class="landing-page-container">
    <main class="main">
      <section id="intro" :class="{ active: currentSection === 0 }" class="section">
        <video autoplay muted loop playsinline>
          <source src="media/rain_forest.mp4" type="video/mp4">
        </video>
        <button class="start-button" @click="goToNextSection">Begin Journey</button>
      </section>

      <section class="section" id="deforestation" :class="{ active: currentSection === 1 }">
        <video autoplay muted loop playsinline>
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
        <nav class="navigation">
          <i class="chevron right" @click="goToNextSection">&gt;</i>
        </nav>
      </section>

      <section class="section" id="rising-seas" :class="{ active: currentSection === 2 }">
        <video autoplay muted loop playsinline>
          <source src="media/waves.mp4" type="video/mp4">
        </video>
        <div class="content-wrapper">
          <a href="risingsealevel" target="_self" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'Sea Levels'" :key="index"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  :class="{ 'animate-char': currentSection === 2 }">
              {{ char }}
            </span>
          </a>
        </div>
        <nav class="navigation">
          <i class="chevron left" @click="goToPrevSection">&lt;</i>
          <i class="chevron right" @click="goToNextSection">&gt;</i>
        </nav>
      </section>

      <section class="section" id="carbonemission" :class="{ active: currentSection === 3 }">
        <video autoplay muted loop playsinline>
          <source src="media/Carbon.mp4" type="video/mp4">
        </video>
        <div class="content-wrapper">
          <a href="carbonemission" target="_self" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'CO2 levels'" :key="index"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  :class="{ 'animate-char': currentSection === 3 }">
              {{ char }}
            </span>
          </a>
        </div>
        <nav class="navigation">
          <i class="chevron left" @click="goToPrevSection">&lt;</i>
          <i class="chevron right" @click="goToNextSection">&gt;</i>
        </nav>
      </section>

      <section class="section" id="earth-dying" :class="{ active: currentSection === 4 }">
        <video autoplay muted loop playsinline>
          <source src="media/earthdying.mp4" type="video/mp4">
        </video>
        <div class="final-content-wrapper">
          <a href="https://www.youtube.com/watch?v=SQ2ufFGm9xE" target="_blank" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'Start Now'" :key="index"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  :class="{ 'animate-char': currentSection === 4 }">
              {{ char }}
            </span>
          </a>
          <button :class="['start-button', 'green-hover', { 'animate-button': currentSection === 4 }]" @click="goToHome">Save Gaia</button>
        </div>
        <nav class="navigation">
          <i class="chevron left" @click="goToPrevSection">&lt;</i>
        </nav>
      </section>
    </main>
    <div class="progress-indicator">
      <div v-for="n in 5" :key="n" 
           :class="['dot', { active: currentSection === n - 1 }]"
           @click="goToSection(n - 1)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      currentSection: 0,
      touchStart: null,
      isMobile: false,
      windowWidth: window.innerWidth
    }
  },
  mounted() {
    this.checkMobile();
    document.querySelector('.landing-page-container').style.overflow = 'hidden';
    this.initializeSection();
    this.setupEventListeners();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    if (!this.isMobile) {
      window.removeEventListener('wheel', this.handleScroll);
      window.removeEventListener('keydown', this.handleKeyNavigation);
    }
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.checkMobile();
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    initializeSection() {
      this.currentSection = 0;
    },
    setupEventListeners() {
      if (!this.isMobile) {
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

<style scoped>
.landing-page-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  display: flex;
  width: 500vw;
  height: 100vh;
  height: 100dvh;
  transition: transform 0.5s ease;
}

.section {
  position: relative;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
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
  padding: 1rem;
}

.final-content-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 5rem;
  width: 90%;
  max-width: 1200px;
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
  /* Update font-size to be more responsive to viewport width */
  font-size: clamp(1.2rem, 3.5vw, 4rem);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: #ffffff;
  transition: transform 0.3s ease;
  display: inline-flex;
  justify-content: center;
  flex-wrap: nowrap; 
  gap: 0.2em;
  max-width: 95%; 
  text-decoration: none;
  line-height: 1.2;
  padding: 0 1rem;
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
  transform: scale(1.05);
}

.navigation {
  position: absolute;
  bottom: clamp(10%, 15%, 20%);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 3vw, 2rem);
  z-index: 3;
}

.progress-indicator {
  position: fixed;
  bottom: clamp(3%, 5%, 8%);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: clamp(0.5rem, 1vw, 1rem);
  z-index: 4;
}

.dot {
  width: clamp(8px, 1.5vw, 10px);
  height: clamp(8px, 1.5vw, 10px);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #ffffff;
  transform: scale(1.2);
}

.chevron {
  color: #ffffff;
  font-size: clamp(1.2rem, 3vw, 2.5rem);
  opacity: 0.7;
  transition: all 0.3s ease;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: clamp(36px, 5vw, 44px);
  height: clamp(36px, 5vw, 44px);
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  padding-bottom: clamp(6px, 1vw, 10px);
}

.chevron:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.5);
}

.start-button {
  position: relative;
  z-index: 2;
  padding: clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.5rem, 3vw, 2rem);
  font-size: clamp(0.9rem, 2vw, 1.5rem);
  background: transparent;
  color: #ffffff;
  border: 2px solid #808080;
  border-radius: 30px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

.start-button:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: #ffffff;
  transform: scale(1.05);
}

.start-button.green-hover {
  opacity: 0;
  transform: translateY(20px);
}

.start-button.animate-button {
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 1s;
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

/* iPhone 6/7/8 and similar (375px) */
@media screen and (max-width: 375px) {
  .section-title {
    font-size: clamp(1.5rem, 4vw, 2rem);
    letter-spacing: 0.05em;
  }

  .start-button {
    padding: 0.7rem 1.3rem;
    font-size: 0.9rem;
  }

  .chevron {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }

  .dot {
    width: 6px;
    height: 6px;
  }
}

@media screen and (max-width: 375px) {
  .section-title {
    font-size: clamp(1rem, 3vw, 1.5rem);
    letter-spacing: 0.05em;
  }
}

@media screen and (min-width: 576px) {
  .section-title {
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  }
}

@media screen and (min-width: 768px) {
  .section-title {
    font-size: clamp(2rem, 4vw, 3.5rem);
  }
}

@media screen and (min-width: 992px) {
  .section-title {
    font-size: clamp(2.5rem, 4.5vw, 4rem);
  }
}

@media screen and (min-width: 1200px) {
  .section-title {
    font-size: 4rem;
  }
}

/* Landscape mode for mobile devices */
@media screen and (orientation: landscape) and (max-height: 500px) {
  .section-title {
    font-size: clamp(1.5rem, 4vh, 2.5rem);
  }

  .final-content-wrapper {
    gap: 2rem;
  }

  .navigation {
    bottom: 15%;
  }

  .progress-indicator {
    bottom: 5%;
  }

  .start-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

/* iOS Safari specific fix for 100vh */
@supports (-webkit-touch-callout: none) {
  .landing-page-container,
  main,
  section {
    height: -webkit-fill-available;
  }
}
</style>