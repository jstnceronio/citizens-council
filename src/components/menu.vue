<template>
  <main>
    <div
      v-motion
      v-if="open"
      :initial="{ width: 0 }"
      :enter="{ width: 300, transition: { delay: 0.7, duration: 0.3 } }"
      :leave="{ width: 0, transition: { delay: 0.7, duration: 0.3 } }"
    >
      <div
        v-motion="'container'"
        :initial="{ ...sideVariants.closed }"
        :enter="{ ...sideVariants.open }"
        :leave="{ ...sideVariants.closed }"
      >
        <a
          v-motion="'link'"
          v-for="{ name, to, id } in links"
          :key="id"
          :href="to"
          :initial="{ ...itemVariants.closed }"
          :enter="{ ...itemVariants.open }"
          :leave="{ ...itemVariants.closed }"
          :hovered="{ scale: 1.1 }"
        >
          {{ name }}
        </a>
      </div>
    </div>
    <div class="btn-container">
      <button @click="cycleOpen">{{ open ? "Close" : "Open" }}</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMotions } from '@vueuse/motion'

const links = [
  { name: "Home", to: "#", id: 1 },
  { name: "About", to: "#", id: 2 },
  { name: "Blog", to: "#", id: 3 },
];

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};

const open = ref(false)
const cycleOpen = () => {
  open.value = !open.value
}

useMotions()
</script>