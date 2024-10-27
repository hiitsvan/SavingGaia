<template>
  <div>
    <section class="bgVideo current">
        <video autoplay muted loop>
            <source src="/media/rain_forest.mp4" type="video/mp4">
        </video>
        <div id="introEcoLah">
            <span>E</span>
            <span>C</span>
            <span>O</span>
            <span>L</span>
            <span>A</span>
            <span>H</span>
            <p>Our world is dying</p>
        </div>
    </section>

    <div class="sticky_parent">
        <div class="sticky">
            <div class="scroll_section">
                <section class="pity">
                    <video autoplay muted loop>
                        <source src="/media/Drought.mp4" type="video/mp4">
                    </video>
                    <div class="videoContainer">
                        <h2 class="videoHeading">
                            <span class="fade-in-first">1.3 BILLION cm3 Of Water</span><br>
                            <span class="fade-in-second">Is Lost Every Year</span>
                        </h2>
                    </div>
                </section>
            
                <section class="pity">
                    <video autoplay muted loop>
                        <source src="/media/forestFire.mp4" type="video/mp4">
                    </video>
                    <div class="videoContainer">
                        <h2 class="videoHeading">
                            <span class="fade-in-first">10 MILLION HECTARES Of Trees</span><br>
                            <span class="fade-in-second">Are Burned Down Every Year</span>
                        </h2>
                    </div>
                </section>
            
                <section class="pity">
                    <video autoplay muted loop>
                        <source src="/media/Hungry.mp4" type="video/mp4">
                    </video>
                    <div class="videoContainer">
                        <h2 class="videoHeading">
                            <span class="fade-in-first">2.5 BILLION TONS Of Food</span><br>
                            <span class="fade-in-second">Is Wasted Every Year</span>
                        </h2>
                    </div>
                </section>
            
                <section class="pity">
                    <video autoplay muted loop>
                        <source src="/media/waves.mp4" type="video/mp4">
                    </video>
                    <div class="videoContainer">
                        <h2 class="videoHeading">
                            <span class="fade-in-first">Global Sea Levels Increased</span><br>
                            <span class="fade-in-second">By 21cm Since 1900</span>
                        </h2>
                    </div>
                </section>
            </div>
        </div>
    </div>

    

    <section class="hero">
        <div class="hero-content" style="position: absolute; top: 20px; left: 20px; background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 8px;">
            <h3>Hero Section Title</h3>
            <p>This is a description for the hero section.</p>
        </div>
    </section>

    <section id="carousell">
        <div class="card__container__wrapper">
            <div class="card__container">
                <article class="card__article">
                    <img src="/media/Study.jpg" alt="Study" class="card__img">
                    <div class="card__data">
                        <span class="card__description">Educate</span>
                        <h2 class="card__title">Learn More</h2>
                        <a href="#" class="card__button">Read More</a>
                    </div>
                </article>

                <article class="card__article">
                    <img src="/media/Newspaper.jpg" alt="News" class="card__img">
                    <div class="card__data">
                        <span class="card__description">Latest News</span>
                        <h2 class="card__title">Read More</h2>
                        <a href="#" class="card__button">Read More</a>
                    </div>
                </article>

                <article class="card__article">
                    <img src="/media/Volunteer.jpg" alt="Volunteer" class="card__img">
                    <div class="card__data">
                        <span class="card__description">Volunteer</span>
                        <h2 class="card__title">Work More</h2>
                        <a href="Opportunities.Vue" class="card__button">Read More</a>
                    </div>
                </article>
            </div>
        </div>
    </section>
    
    <section>
        <footer class="footer">
            <div class="footer__container">
                <!-- Logo Section -->
                <div class="footer__logo">
                    <!-- Change this to our LOGO-->
                    <h2 class="logo__text">ECOLAH</h2>
                    <p class="logo__description">Join us in our mission to protect and preserve our planet for future generations.</p>
                    <div class="social__links">
                        <a href="#" class="social__link" aria-label="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social__link" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social__link" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social__link" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
    
                <!-- Directory Column -->
                <div class="footer__column">
                    <h3 class="footer__heading">Directory</h3>
                    <ul class="footer__links">
                        <li><a href="#" class="footer__link">Home</a></li>
                        <li><a href="#" class="footer__link">About Us</a></li>
                        <li><a href="#" class="footer__link">Services</a></li>
                        <li><a href="#" class="footer__link">Projects</a></li>
                        <li><a href="#" class="footer__link">News</a></li>
                    </ul>
                </div>
    
                <!-- Account Column -->
                <div class="footer__column">
                    <h3 class="footer__heading">Account</h3>
                    <ul class="footer__links">
                        <li><a href="#" class="footer__link">Sign In</a></li>
                        <li><a href="#" class="footer__link">Register</a></li>
                        <li><a href="#" class="footer__link">My Profile</a></li>
                        <li><a href="#" class="footer__link">My Activities</a></li>
                        <li><a href="#" class="footer__link">Settings</a></li>
                    </ul>
                </div>
    
                <!-- Contact Column -->
                <div class="footer__column">
                    <h3 class="footer__heading">Contact Us</h3>
                    <ul class="footer__contact">
                        <li class="contact__item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>123 Eco Street, Green City, 12345</span>
                        </li>
                        <li class="contact__item">
                            <i class="fas fa-phone"></i>
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li class="contact__item">
                            <i class="fas fa-envelope"></i>
                            <span>contact@ecolah.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer__bottom">
                <p>&copy; 2024 ECOLAH. All rights reserved.</p>
            </div>
        </footer>
    
        <!-- Add Font Awesome for icons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    </section>
  </div>

</template>

<script>

import "./homepage.js"
export default {
  computed: {
    user() {
      return this.$store.state.user; // Access the user from Vuex state
    }
  }
};
</script>
<style scoped>
@import '../../assets/styles/landingpage.css';
</style>
