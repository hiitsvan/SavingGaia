<template>
    <div class="auth-container fade-up delay-1">
        <div class="card-wrapper" :class="{ 'is-flipped': isFlipped }">
            <!-- Login Side -->
            <div class="card-face front">
                <LoginForm @toggle="toggleCard" />
            </div>
            <!-- Signup Side -->
            <div class="card-face back">
                <SignupForm @toggle="toggleCard" />
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from './LoginForm.vue';
import SignupForm from './SignupForm.vue';

export default {
    name: 'AuthCard',
    components: {
        LoginForm,
        SignupForm
    },
    data() {
        return {
            isFlipped: false
        };
    },
    methods: {
        toggleCard() {
            this.isFlipped = !this.isFlipped;
        }
    }
};
</script>

<style scoped>
.auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
    width: 100%;
    max-width: 800px;
}

.card-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: auto;
    margin: 0 auto;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.is-flipped {
    transform: rotateY(180deg);
}

.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    /* Added to center children */
    flex-direction: column;
    /* Stack children vertically */
    justify-content: center;
    /* Center content vertically */
    align-items: center;
    /* Center content horizontally */
}

.back {
    transform: rotateY(180deg);
}
.fade-up {
    opacity: 0;
    animation: fadeInOpacity 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
.delay-1 {
    animation-delay: 0.3s;
}
@keyframes fadeInOpacity {
    to {
        opacity: 1;
    }
}
</style>