<template>
    <section class="relative h-screen">
        <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
            <source src="../../../public/media/rain_forest.mp4" type="video/mp4">
        </video>
        <div id="introEcoLah" class="absolute inset-0 flex flex-col justify-center items-center text-white text-center font-bold text-4xl sm:text-6xl space-y-4 bg-black bg-opacity-50">
            <div class="tracking-wide">
                <span class="block">E</span>
                <span class="block">C</span>
                <span class="block">O</span>
                <span class="block">L</span>
                <span class="block">A</span>
                <span class="block">H</span>
            </div>
            <p class="text-lg sm:text-2xl">Our world is dying</p>
        </div>
    </section>

    <!-- Statistic Sections -->
    <section class="relative h-screen">
        <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
            <source src="../../../public/media/Drought.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <h2 class="text-white text-4xl sm:text-5xl font-bold text-center">
                <span class="block">1.3 BILLION cm³ Of Water</span>
                <span class="block text-2xl sm:text-3xl mt-4">Is Lost Every Year</span>
            </h2>
        </div>
    </section>

    <section class="relative h-screen">
        <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
            <source src="../../../public/media/forestFire.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <h2 class="text-white text-4xl sm:text-5xl font-bold text-center">
                <span class="block">10 MILLION HECTARES Of Trees</span>
                <span class="block text-2xl sm:text-3xl mt-4">Are Burned Down Every Year</span>
            </h2>
        </div>
    </section>

    <section class="relative h-screen">
        <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
            <source src="../../../public/media/Hungry.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <h2 class="text-white text-4xl sm:text-5xl font-bold text-center">
                <span class="block">2.5 BILLION TONS Of Food</span>
                <span class="block text-2xl sm:text-3xl mt-4">Is Wasted Every Year</span>
            </h2>
        </div>
    </section>

    <section class="relative h-screen">
        <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
            <source src="../../../public/media/waves.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <h2 class="text-white text-4xl sm:text-5xl font-bold text-center">
                <span class="block">Global Sea Levels Increased</span>
                <span class="block text-2xl sm:text-3xl mt-4">By 21cm Since 1900</span>
            </h2>
        </div>
    </section>

    <!-- Hero Section -->
    <section class="relative h-screen">
        <div class="absolute top-5 left-5 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold">Hero Section Title</h3>
            <p class="mt-2">This is a description for the hero section.</p>
        </div>
    </section>

    <!-- Carousel Section -->
    <section id="carousel" class="py-16 bg-gray-200">
        <div class="container mx-auto flex justify-center space-x-6">
            <!-- Card 1 -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
                <img src="../../../public/media/Study.jpg" alt="Study" class="w-full h-48 object-cover">
                <div class="p-6">
                    <span class="text-green-600 text-sm uppercase">Educate</span>
                    <h2 class="text-xl font-bold mt-2">Learn More</h2>
                    <a href="#" class="inline-block mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Read More</a>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
                <img src="../../../public/media/Newspaper.jpg" alt="News" class="w-full h-48 object-cover">
                <div class="p-6">
                    <span class="text-green-600 text-sm uppercase">Latest News</span>
                    <h2 class="text-xl font-bold mt-2">Read More</h2>
                    <a href="#" class="inline-block mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Read More</a>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
                <img src="../../../public/media/Volunteer.jpg" alt="Volunteer" class="w-full h-48 object-cover">
                <div class="p-6">
                    <span class="text-green-600 text-sm uppercase">Volunteer</span>
                    <h2 class="text-xl font-bold mt-2">Work More</h2>
                    <a href="#" class="inline-block mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Read More</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-10">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Logo Section -->
            <div>
                <h2 class="text-2xl font-bold">ECOLAH</h2>
                <p class="mt-4 text-gray-400">Join us in our mission to protect and preserve our planet for future generations.</p>
                <div class="flex space-x-4 mt-4">
                    <a href="#" class="text-white" aria-label="Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="text-white" aria-label="Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="text-white" aria-label="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="text-white" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            <!-- Directory Section -->
            <div>
                <h3 class="font-bold text-xl">Directory</h3>
                <ul class="mt-4 space-y-2">
                    <li><a href="#" class="text-gray-400 hover:underline">Home</a></li>
                    <li><a href="#" class="text-gray-400 hover:underline">About Us</a></li>
                    <li><a href="#" class="text-gray-400 hover:underline">Services</a></li>
                    <li><a href="#" class="text-gray-400 hover:underline">Projects</a></li>
                    <li><a href="#" class="text-gray-400 hover:underline">News</a></li>
                </ul>
            </div>

            <!-- Account Section -->
            <div>
                <h3 class="font-bold text-xl">Account</h3>
                <ul class="mt-4 space-y-2">
                    <li><a href="#" class="text-gray-400 hover:underline">Sign In</a></li>
                    <li><a href="#" class="text-gray-400 hover:underline">Register</a></li>
                    <li><a href="#" class="text-gray-400 hover:underline">My Profile</a></li>
                    <li><a href="#" class="text-gray-400 hover:underline">My Activities</a></li>
                    <li><a href="#" class="text-gray-400 hover:underline">Settings</a></li>
                </ul>
            </div>

            <!-- Contact Section -->
            <div>
                <h3 class="font-bold text-xl">Contact Us</h3>
                <ul class="mt-4 space-y-2">
                    <li class="text-gray-400"><i class="fas fa-map-marker-alt"></i> 123 Eco Street, Green City, 12345</li>
                    <li class="text-gray-400"><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
                    <li class="text-gray-400"><i class="fas fa-envelope"></i> contact@ecolah.com</li>
                </ul>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
            <p>&copy; 2024 ECOLAH. All rights reserved.</p>
        </div>
    </footer>
  </template>
  
  <script>
  export default {
    computed: {
      user() {
        return this.$store.state.user; // Access the user from Vuex state
      }
    }
  };
  </script>
  
