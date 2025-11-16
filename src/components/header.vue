<template>
  <div class="upper-header">
    <div class="header-text">
      <!-- Logo -->
      <img src="/logo.png" class="header-logo" />

      <!-- Title -->
      <div class="header-title">
        <h1 class="header-title-main">DÄRLIGEN</h1>
        <p class="header-title-secondary">Burgergemeinde am Thunersee</p>
      </div>
    </div>

    <!-- Mobile menu button -->
    <button class="mobile-menu-button" @click="toggle()">
      <div class="space-y-1">
        <span ref="upper" class="burger-line"></span>
        <span ref="middle" class="burger-line"></span>
        <span ref="lower" class="burger-line"></span>
      </div>
      <span class="font-medium ml-4">Menu</span>
    </button>
  </div>

  <!-- Menu XL -->
  <hr class="mt-4 sm:mt-12" />
  <div class="desktop-menu">
    <a href="/" class="menu-item">Startseite</a>
    <a href="/task" class="menu-item">Aufgaben</a>
    <a href="/members" class="menu-item">Verwaltung</a>
    <a href="/history" class="menu-item">Geschichte</a>
    <a href="/regulations" class="menu-item">Dokumente</a>
    <a href="/property" class="menu-item">Liegenschaften</a>
    <a href="/forestry" class="menu-item">Forstbetrieb</a>
  </div>
  <hr />

  <!-- Opened mobile menu -->
  <div
    v-motion
    :initial="{ opacity: 0, x: 0 }"
    :enter="{ opacity: 1, x: 0, scale: 1 }"
    class="mobile-menu"
    v-if="isOpen"
  >
    <a href="/" class="menu-item">Startseite</a>
    <a href="/task" class="menu-item">Aufgaben</a>
    <a href="/members" class="menu-item">Verwaltung</a>
    <a href="/history" class="menu-item">Geschichte</a>
    <a href="/regulations" class="menu-item">Dokumente</a>
    <a href="/property" class="menu-item">Liegenschaften</a>
    <a href="/forestry" class="menu-item">Forstbetrieb</a>
  </div>
</template>

<style scoped>
.upper-header {
  @apply flex flex-col-reverse 2xl:flex-col justify-between text-gray-900 pt-8 sm:pt-16 mx-8 md:mx-16;
}

.header-title {
  @apply flex-col lg:pl-8 mr-2 mt-2 md:mx-8 order-2;
}

.header-title-main {
  @apply font-bold text-3xl lg:text-5xl;
}

.header-title-secondary {
  @apply lg:mt-4 sm:text-xl lg:text-2xl;
}

.header-text {
  @apply flex max-md:justify-between;
}

.header-logo {
  @apply w-16 lg:w-24 order-3 md:order-1;
}

.burger-line {
  @apply block h-0.5 w-6 bg-black;
}

.desktop-menu {
  @apply hidden 2xl:flex uppercase my-6 mr-16 justify-between;
}

.mobile-menu-button {
  @apply flex 2xl:hidden items-center z-50 mb-4 order-1 max-w-[8rem];
}

.mobile-menu {
  @apply 2xl:hidden flex flex-col gap-8 uppercase fixed backdrop-blur-lg bg-white/80 bottom-0 left-0 w-full h-screen items-center justify-center z-40;
}

a:hover {
  color: #00579f;
}

/* Base menu item styles */
.menu-item {
  @apply relative transition-all duration-300;
}

/* Desktop menu items */
.desktop-menu .menu-item {
  @apply ml-16 text-base;
}

/* Mobile menu items */
.mobile-menu .menu-item {
  @apply text-lg font-medium py-3 px-6 hover:scale-105;
}

/* Animation for menu items */
.mobile-menu a {
  @apply opacity-0 translate-y-4;
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Add delay for each menu item */
.mobile-menu a:nth-child(1) { animation-delay: 0.1s; }
.mobile-menu a:nth-child(2) { animation-delay: 0.2s; }
.mobile-menu a:nth-child(3) { animation-delay: 0.3s; }
.mobile-menu a:nth-child(4) { animation-delay: 0.4s; }
.mobile-menu a:nth-child(5) { animation-delay: 0.5s; }
.mobile-menu a:nth-child(6) { animation-delay: 0.6s; }
.mobile-menu a:nth-child(7) { animation-delay: 0.7s; }
</style>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { useMotions, useMotion } from "@vueuse/motion";

/* Mobile menu, animations */

var isOpen = ref<boolean>(false);
const upper = ref<HTMLElement>();
const middle = ref<HTMLElement>();
const lower = ref<HTMLElement>();

const toggle = () => {
  isOpen.value = !isOpen.value;
  rotateUpper();
  rotateMiddle();
  toggleLower();

  // Prevent scrolling when menu is open
  if (isOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Clean up on component unmount
onUnmounted(() => {
  document.body.style.overflow = '';
});

const { apply: applyUpper } = useMotion(upper, {
  enter: {
    rotateZ: 0,
  },
});

const rotateUpper = async () => {
  await applyUpper({
    rotateZ: isOpen.value ? 45 : 0,
    y: isOpen.value ? 5 : 0,
    transition: {
      type: "spring",
      damping: 10,
    },
  });
};

const { apply: applyMiddle } = useMotion(middle, {
  enter: {
    rotateZ: 0,
  },
});

const rotateMiddle = async () => {
  await applyMiddle({
    rotateZ: isOpen.value ? -45 : 0,
    transition: {
      type: "spring",
      damping: 10,
    },
  });
};

const { apply: applyLower } = useMotion(lower, {
  enter: {
    opacity: 1,
  },
});

const toggleLower = async () => {
  await applyLower({
    opacity: isOpen.value ? 0 : 1,
  });
};

useMotions();
</script>
