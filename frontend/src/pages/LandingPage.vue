<template>
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
          <a href="deforestation" target="_blank" rel="noopener noreferrer" class="section-title">
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
          <a href="risingsealevel" target="_blank" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'Rising-Sea-Levels'" :key="index"
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
          <a href="carbonemission" target="_blank" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in 'Carbon-Emission'" :key="index"
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
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="section-title">
            <span v-for="(char, index) in '1800-not-too-late'" :key="index"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  :class="{ 'animate-char': currentSection === 4 }">
              {{ char }}
            </span>
          </a>
          <button :class="['start-button', 'green-hover', { 'animate-button': currentSection === 4 }]" @click="goToHome">Start Now</button>
        </div>

      </section>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentSection: 0
      }
    },
    mounted() {
      this.initializeSection();
      this.setupEventListeners();
      document.body.style.overflow = 'hidden';
      document.body.style.cursor = 'ew-resize';
    },
    methods: {
      initializeSection() {
        // The animation will now be handled by Vue's reactivity
      },
      setupEventListeners() {
        if (window.innerWidth > 768) {
          window.addEventListener('wheel', this.handleScroll, { passive: true });
          window.addEventListener('keydown', this.handleKeyNavigation);
        }
        this.setupTouchEvents();
        this.setupHoverListeners();
      },
      setupHoverListeners() {
        const headers = document.querySelectorAll('.section-title');
        headers.forEach(header => {
          header.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
          });
          header.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'ew-resize';
          });
        });
      },
      goToSection(index) {
        const sections = document.querySelectorAll('section');
        if (index < 0 || index >= sections.length) return;
        
        this.currentSection = index;
        
        window.scrollTo({
          left: window.innerWidth * index,
          behavior: 'smooth'
        });
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
        let touchStart = { x: 0, y: 0 };
        
        window.addEventListener('touchstart', (e) => {
          touchStart.x = e.touches[0].clientX;
          touchStart.y = e.touches[0].clientY;
        });
  
        window.addEventListener('touchend', (e) => {
          const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
          };
  
          const diffX = touchStart.x - touchEnd.x;
          if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
              this.goToNextSection();
            } else {
              this.goToPrevSection();
            }
          }
        });
      },
      goToHome() {
        this.$router.push("/home");
      }
    },
    watch: {
      currentSection(newValue) {
        if (newValue === 4) {
          const button = document.querySelector('.start-button.green-hover');
          if (button) {
            button.style.animation = 'none';
            button.offsetHeight;
            button.style.animation = null;
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  main {
    display: flex;
    width: 500vw;
    height: 100vh;
    touch-action: none;
    overflow: hidden;
  }
  
  section {
    position: relative;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #242424;
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
    cursor: pointer;
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
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;
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
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
  
  .start-button:hover {
    background: #808080;
    color: #000000;
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
    background: #98FB98;
    border-color: #98FB98;
    color: #000000;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    main {
      flex-direction: row;
      width: 500vw;
      height: 100vh;
      overflow-x: hidden;
      scroll-snap-type: x mandatory;
    }
  
    section {
      width: 100vw;
      min-height: 100vh;
      scroll-snap-align: start;
    }
  
    .section-title {
      font-size: clamp(1.5rem, 6vw, 2.5rem);
      padding: 0 1rem;
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