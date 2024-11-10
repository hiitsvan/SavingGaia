<template>
  <div>
    <!-- Hero Section -->
    <div class="hero">
      <video autoplay muted loop preload="auto">
        <source src="/media/globe.mp4" type="video/mp4">
      </video>
      <div class="overlay"></div>
      <div class="hero-content">
        <h1>Welcome to Our World</h1>
        <a href="#about" class="scroll-link">Discover the extraordinary</a>
      </div>
    </div>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="about-content">
        <img src="/media/us.jpg" alt="Team" class="about-image">
        <h2>About Us</h2>
        <p class="about-text">
          SavingGaia is a platform empowering individuals to make a positive environmental impact. Through accessible insights on deforestation, 
          climate change, live environmental trackers, eco news, and community engagement, we help users adopt sustainable practices in daily life. 
          Join us in protecting and restoring our planet for future generations. Together, we can create lasting change.
        </p>
      </div>
    </section>

    <!-- Cards Section -->
    <section id="cards" class="card__container__wrapper">
      <div class="container">
        <div class="row g-4">
          <div class="col-12 col-sm-6 col-lg-4">
            <article class="card__article">
              <div class="card__inner">
                <div class="card-img-wrapper">
                  <img src="/media/earthpage.jpg" alt="Innovation" class="card__img">
                </div>
                <div class="card__data">
                  <span class="card__description">Gaia</span>
                  <h2 class="card__title">How Has Earth Changed</h2>
                  <a href="gaia" class="card__button">Find Out Here</a>
                </div>
              </div>
            </article>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <article class="card__article">
              <div class="card__inner">
                <div class="card-img-wrapper">
                  <img src="/media/dashboard.jpg" alt="Innovation" class="card__img">
                </div>
                <div class="card__data">
                  <span class="card__description">Environmental Dashboard</span>
                  <h2 class="card__title">See Your Contributions</h2>
                  <a href="dashboard" class="card__button">Click Here</a>
                </div>
              </div>
            </article>
          </div>

          <div class="col-12 col-sm-6 col-lg-4">
            <article class="card__article">
              <div class="card__inner">
                <div class="card-img-wrapper">
                  <img src="/media/news.jpg" alt="News" class="card__img">
                </div>
                <div class="card__data">
                  <span class="card__description">Latest News</span>
                  <h2 class="card__title">Learn More</h2>
                  <a href="news" class="card__button">Read Here</a>
                </div>
              </div>
            </article>
          </div>


          <div class="col-12 col-sm-6 col-lg-4">
            <article class="card__article">
              <div class="card__inner">
                <div class="card-img-wrapper">
                  <img src="/media/volopp.jpg" alt="Volunteer" class="card__img">
                </div>
                <div class="card__data">
                  <span class="card__description">Volunteering Opportunities</span>
                  <h2 class="card__title">Play Your Part</h2>
                  <a href="opportunities" class="card__button">Source here</a>
                </div>
              </div>
            </article>
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
    document.querySelector('.scroll-link').addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });

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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

.hero {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: 0;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.hero-content {
    position: relative;
    text-align: center;
    z-index: 2;
    animation: fadeIn 1s ease-out;
    padding: 0 20px;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.hero h1 {
    font-size: 6rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #4CAF50, #2196F3);    
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s infinite linear;
}

.scroll-link {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
    font-size: 2rem;
    animation: scaleColorChange 4s infinite ease-in-out;
}

@keyframes scaleColorChange {
    0%, 100% {
        transform: scale(1);
        color: #fff;
    }
    50% {
        transform: scale(1.3);
        color: whitesmoke
    }
}

.scroll-link:hover {
    transform: translateY(-5px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

@keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
}

.about {
    background: black;
    min-height: 100vh;
    padding: 4rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.about-content {
    max-width: 1000px;
    text-align: center;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.about-content.visible {
    opacity: 1;
    transform: translateY(0);
}

.about-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(0, 255, 0, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

/* Updated Card Styles */
.card__container__wrapper {
    padding: 5rem 1.5rem;
    background: black;
}

.card__article {
    height: 400px;
    margin-bottom: 30px;
}

.card__inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    overflow: hidden;
    transition: all 0.3s ease;
    background: transparent;
}

.card-img-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.card__data {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    background: white;
    padding: 2rem 1.5rem;
    z-index: 2;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card__description {
    display: block;
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 0.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease 0.1s;
}

.card__title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease 0.2s;
}

.card__button {
    display: inline-block;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    color: #4a90e2;
    padding: 0.5rem 0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease 0.3s;
}

.card__button:hover {
    color: #357abd;
    text-decoration: underline;
}

.card__inner:hover {
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}

.card__inner:hover .card__img {
    transform: scale(1.1);
}

.card__inner:hover .card__data {
    transform: translateY(0);
}

.card__inner:hover .card__description,
.card__inner:hover .card__title,
.card__inner:hover .card__button {
    opacity: 1;
    transform: translateY(0);
}

#app {
    width: 100%;
    min-height: 100vh;
    overflow: visible !important;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 4rem;
    }
    
    .scroll-link {
        font-size: 1.5rem;
    }

    .card__article {
        height: 350px;
    }
}

@media (max-width: 576px) {
    .hero h1 {
        font-size: 3rem;
    }

    .card__article {
        height: 300px;
    }
}
</style>