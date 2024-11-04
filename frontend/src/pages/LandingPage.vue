<template>
  <main>
    <section id="intro">
      <video autoplay muted loop>
        <source src="media/rain_forest.mp4" type="video/mp4">
      </video>
      <button class="start-button">Begin Journey</button>
    </section>

    <section id="deforestation">
      <button class="nav-button prev"><i class="bi bi-chevron-left"></i></button>
      <video autoplay muted loop>
        <source src="media/forestFire.mp4" type="video/mp4">
      </video>
      <div class="content-wrapper">
        <h1 class="animate-text">Deforestation</h1>
      </div>
      <button class="nav-button next"><i class="bi bi-chevron-right"></i></button>
    </section>

    <section id="rising-seas">
      <button class="nav-button prev"><i class="bi bi-chevron-left"></i></button>
      <video autoplay muted loop>
        <source src="media/waves.mp4" type="video/mp4">
      </video>
      <div class="content-wrapper">
        <h1 class="animate-text">Rising Sea Levels</h1>
      </div>
      <button class="nav-button next"><i class="bi bi-chevron-right"></i></button>
    </section>

    <section id="extreme-weather">
      <button class="nav-button prev"><i class="bi bi-chevron-left"></i></button>
      <video autoplay muted loop>
        <source src="media/Carbon.mp4" type="video/mp4">
      </video>
      <div class="content-wrapper">
        <h1 class="animate-text">Carbon Emission</h1>
      </div>
      <button class="nav-button next"><i class="bi bi-chevron-right"></i></button>
    </section>

    <section id="earth-dying">
      <button class="nav-button prev"><i class="bi bi-chevron-left"></i></button>
      <video autoplay muted loop>
        <source src="media/earthdying.mp4" type="video/mp4">
      </video>
      <div class="content-wrapper">
        <h1 class="animate-text"> Its not too late to start now.</h1>
        <button class="start-button" @click="goToHome">Start Now</button>
      </div>
      <button class="nav-button next"><i class="bi bi-chevron-right"></i></button>
    </section>

  </main>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = 0;
    let isScrolling = false;
    const isMobile = window.innerWidth <= 768;
    let lastScrollTime = 0;

    // Split text into spans for animation
    document.querySelectorAll('.animate-text').forEach(text => {
        text.innerHTML = text.textContent.split('').map((char, index) => 
            `<span style="animation-delay: ${index * 0.1}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    });

    // Mark first section as active
    sections[0].classList.add('active');

    function goToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;
        isScrolling = true;
        currentSection = index;

        sections.forEach(section => section.classList.remove('active'));
        sections[currentSection].classList.add('active');

        // Reset animations for the new section
        const spans = sections[currentSection].querySelectorAll('.animate-text span');
        spans.forEach((span, i) => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, i * 100);
        });

        window.scrollTo({
            left: window.innerWidth * index,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // Scroll handling
    function handleScroll(e) {
        const now = Date.now();
        if (now - lastScrollTime < 1000) return;
        lastScrollTime = now;

        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
            goToSection(currentSection - 1);
        }
    }

    // Navigation button click handlers
    document.querySelectorAll('.nav-button.prev').forEach(button => {
        button.addEventListener('click', () => {
            if (currentSection > 0) {
                goToSection(currentSection - 1);
            }
        });
    });

    document.querySelectorAll('.nav-button.next').forEach(button => {
        button.addEventListener('click', () => {
            if (currentSection < sections.length - 1) {
                goToSection(currentSection + 1);
            }
        });
    });

    // Start button click handler
    document.querySelector('.start-button').addEventListener('click', () => {
        if (isMobile) {
            document.getElementById('deforestation').scrollIntoView({ behavior: 'smooth' });
        } else {
            goToSection(1);
        }
    });

    // Improved touch handling
    let touchStart = { x: 0, y: 0 };
    let touchEnd = { x: 0, y: 0 };

    window.addEventListener('touchstart', (e) => {
        touchStart.x = e.touches[0].clientX;
        touchStart.y = e.touches[0].clientY;
    });

    window.addEventListener('touchend', (e) => {
        touchEnd.x = e.changedTouches[0].clientX;
        touchEnd.y = e.changedTouches[0].clientY;

        const diffX = touchStart.x - touchEnd.x;
        const diffY = touchStart.y - touchEnd.y;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSection < sections.length - 1) {
                goToSection(currentSection + 1);
            } else if (diffX < 0 && currentSection > 0) {
                goToSection(currentSection - 1);
            }
        }
    });

    // Event listeners
    if (!isMobile) {
        window.addEventListener('wheel', handleScroll, { passive: true });
        window.addEventListener('resize', () => {
            goToSection(currentSection);
        });

        // Handle keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
                goToSection(currentSection + 1);
            } else if (e.key === 'ArrowLeft' && currentSection > 0) {
                goToSection(currentSection - 1);
            }
        });
    }

    // Activate sections as they become visible on mobile
    if (isMobile) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }
});

export default {
  methods: {
    goToHome() {
      this.$router.push("/home"); 
    }
  }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: grey;
    --text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

body {
    overflow-x: hidden;
    background-color: #000;
    color: white;
    font-family: 'Arial', sans-serif;
    cursor: e-resize;
}

main {
    display: flex;
    width: 500vw;
    height: 100vh;
    touch-action: none;
}

section {
    position: relative;
    width: 100vw;
    /* height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.content-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    z-index: 2;
    width: 80vw;
    height: 20vh;
    text-align: center;
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    color: white;
    font-size: 3rem;
    cursor: pointer;
    padding: 1rem;
    transition: all 0.3s ease;
    opacity: 0.7;
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-button:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.nav-button.prev {
    left: 2rem;
}

.nav-button.next {
    right: 2rem;
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

.animate-text {
    max-width: 70vw;
    position: relative;
    z-index: 2;
    font-size: clamp(3rem, 6vw, 3rem);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    text-shadow: var(--text-shadow);
    white-space: nowrap;
    display: inline-block;
    transform: scale(1);
    transition: transform 0.3s ease, color 0.3s ease;
    cursor: pointer;
}

.animate-text:hover {
    transform: scale(1.5);
    color: var(--primary-color);
    text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
}

.start-button, .login-button {
    position: relative;
    z-index: 2;
    padding: 0.8rem 1.6rem;
    font-size: clamp(0.8rem, 1.5vw, 1.2rem);
    background: transparent;
    color: white;
    border: 2px solid var(--primary-color);
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    opacity: 0;
    transform: translateY(20px);
}

.start-button {
    font-size: clamp(1rem, 4vw, 1.5rem);
    padding: 1rem 2rem;
}

.start-button:hover, .login-button:hover {
    background: var(--primary-color);
    color: black;
    transform: scale(1.1);
}

section.active .start-button,
section.active .login-button {
    opacity: 1;
    transform: translateY(0);
    animation: fadeIn 1s ease forwards;
}

section.active .animate-text {
    opacity: 1;
    transform: translateY(0);
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

/* Mobile and Tablet Styles */
@media (max-width: 768px) {
    body {
        cursor: auto;
    }

    main {
        flex-direction: column;
        width: 100vw;
        height: auto;
    }

    section {
        width: 100vw;
        min-height: 100vh;
        scroll-snap-align: start;
    }

    .content-wrapper {
        width: 90vw;
        height: auto;
        padding: 2rem;
    }

    .animate-text {
        text-align: center;
        font-size: clamp(2rem, 8vw, 4rem);
        white-space: normal;
    }

    video {
        height: 100%;
        width: 100%;
    }

    .nav-button {
        font-size: 2rem;
        padding: 0.5rem;
        width: 4rem;
        height: 4rem;
    }

    .nav-button.prev {
        left: 0.5rem;
    }

    .nav-button.next {
        right: 0.5rem;
    }
}

/* Landscape Mode */
@media (orientation: landscape) and (max-height: 500px) {
    .animate-text {
        font-size: clamp(1.5rem, 4vw, 3rem);
    }

    .start-button, .login-button {
        padding: 0.75rem 1.5rem;
        font-size: clamp(0.8rem, 3vw, 1.2rem);
    }

    .content-wrapper {
        gap: 1rem;
    }
}
</style>
