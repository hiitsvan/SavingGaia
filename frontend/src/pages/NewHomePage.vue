<template>

    <div>
        <!-- <NavBar /> -->
        <HomePageParallax /> <!-- Include the HomepageParallax component -->
        <section>
            <AboutCarousel />
        </section>
    </div>
</template>



<script>
import HomePageParallax from "@/components/HomePageParallax.vue";
import AboutCarousel from "@/components/AboutCarousel.vue";
// import NavBar from "@/components/NavBar.vue";

export default {
    name: "NewHomePage",
    data() {
        return {};
    },
    components: {
        // NavBar,
        HomePageParallax,
        AboutCarousel,
    },
}
</script>