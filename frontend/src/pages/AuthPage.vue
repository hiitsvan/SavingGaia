<template>
  <div class="auth-page">
    <AuthCard />
  </div>
</template>

<script>
import AuthCard from '../components/AuthCard.vue';

export default {
  name: 'AuthPage',
  components: {
    AuthCard
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>