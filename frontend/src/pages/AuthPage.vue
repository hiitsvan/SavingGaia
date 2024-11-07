<template>
  <div class="auth-page" :style="backgroundStyle">
    <AuthCard />
  </div>
</template>

<script>
import AuthCard from "@/components/AuthCard.vue";

export default {
  components: {
    AuthCard,
  },
  data() {
    return {
      backgroundStyle: {
        backgroundImage: "url('/media/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    };
  },
};
</script>

<style scoped>
.auth-page > * {
  width: 400px; /* Set a fixed width to the card to avoid stretching */
}
</style>
