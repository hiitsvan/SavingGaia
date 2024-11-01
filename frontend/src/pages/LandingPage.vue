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
</script>

<style scoped>
  @import '../assets/styles/landing.css';
</style>
