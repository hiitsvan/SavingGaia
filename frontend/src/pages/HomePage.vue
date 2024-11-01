<template>
  <div>
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-content">
        <h1>Welcome to Our World</h1>
        <a href="#about" class="scroll-link">Discover the extraordinary</a>
      </div>
    </div>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="about-content">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Team" class="about-image">
        <h2>About Us</h2>
        <p class="about-text">
          We are a team of passionate innovators dedicated to creating extraordinary experiences.
          Our mission is to push the boundaries of what's possible and deliver exceptional results
          that inspire and amaze. With years of experience and a commitment to excellence,
          we transform ideas into reality.
        </p>
      </div>
    </section>

    <!-- Carousel Section -->
    <section class="carousel">
      <div class="carousel-container">
        <!-- Clone last slide for seamless looping -->
        <div class="carousel-slide">
          <img src="https://images.unsplash.com/photo-1558402529-d2638a7023e9" alt="Creativity">
          <div>
            <h3 class="carousel-text">Creativity</h3>
            <p class="carousel-text">Thinking outside the box</p>
          </div>
        </div>
        
        <!-- Original Slides -->
        <div class="carousel-slide">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" alt="Innovation">
          <div>
            <h3 class="carousel-text">Innovation</h3>
            <p class="carousel-text">Pushing boundaries every day</p>
          </div>
        </div>
        <div class="carousel-slide">
          <img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2" alt="Excellence">
          <div>
            <h3 class="carousel-text">Excellence</h3>
            <p class="carousel-text">Committed to quality</p>
          </div>
        </div>
        <div class="carousel-slide">
          <img src="https://images.unsplash.com/photo-1558402529-d2638a7023e9" alt="Creativity">
          <div>
            <h3 class="carousel-text">Creativity</h3>
            <p class="carousel-text">Thinking outside the box</p>
          </div>
        </div>
        
        <!-- Clone first slide for seamless looping -->
        <div class="carousel-slide">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" alt="Innovation">
          <div>
            <h3 class="carousel-text">Innovation</h3>
            <p class="carousel-text">Pushing boundaries every day</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  mounted() {
    // Smooth scroll
    document.querySelector('.scroll-link').addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Carousel Auto-scroll with seamless loop
    const carousel = document.querySelector('.carousel-container');
    let currentSlide = 1;
    const slideCount = document.querySelectorAll('.carousel-slide').length;

    // Set initial position to the first original slide
    carousel.style.transform = `translateX(-100%)`;

    setInterval(() => {
      currentSlide += 1;
      carousel.style.transition = 'transform 1s ease';
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Reset transition for seamless loop
      if (currentSlide === slideCount - 1) {
        setTimeout(() => {
          carousel.style.transition = 'none';
          carousel.style.transform = 'translateX(-100%)';
          currentSlide = 1;
        }, 1000);
      }
    }, 3000);

    // About section animation
    const aboutContent = document.querySelector('.about-content');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(aboutContent);
  }
}
</script>

<style scoped>
@import '../assets/styles/home.css';

.about-text {
  color: #fff;
}

.carousel-text {
  color: #fff;
}

.carousel-container {
  display: flex;
  transition: transform 1s ease;
  /* Width expanded to include cloned slides for seamless looping */
  width: calc(100% * 5); /* Number of slides including clones */
}

.carousel-slide {
  min-width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(45deg, #111, #000);
}
</style>
