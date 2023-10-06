<template>
    <div class="flex flex-col-reverse md:flex-col justify-between text-gray-900 mt-8 sm:mt-16 mx-8 md:mx-16">
        <div class="flex max-md:justify-between">
            <!-- Logo -->
            <img src="/logo.png" class="w-16 lg:w-24 order-3 md:order-1">

            <!-- Title -->
            <div class="flex-col lg:pl-8 mr-2 mt-2 md:mx-8 order-2">
                <h1 class="font-bold text-3xl lg:text-5xl">DÄRLIGEN</h1>
                <p class="lg:mt-4 sm:text-xl lg:text-2xl">Burgergemeinde am Thunersee</p>
            </div>
        </div>
        
        <!-- Weather widget 
        <div class="hidden md:flex flex-col font-medium py-2 uppercase">
            <span class="details">567 m ü. M.</span>
            <span class="details">46° 39′ 36″N 7° 48′ 32″O </span>
            <div class="flex gap-2 lg:gap-4 mt-4" v-if="weatherData">
                <span class="icon-pair details">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg>
                    {{ weatherData.weather[0].description }}
                </span>
                <span class="icon-pair">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg>
                    {{ weatherData.wind.speed }} km/h
                </span>
                <span class="icon-pair">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/></svg>
                    {{ weatherData.main.temp }}°
                </span>
            </div>
        </div>-->
        

        <!-- Mobile menu button -->
        <button class="flex md:hidden items-center z-10 mb-4 order-1" @click="toggle()">
            <div class="space-y-1">
                <span ref="upper" class="block h-0.5 w-6 bg-black"></span>
                <span ref="middle" class="block h-0.5 w-6 bg-black"></span>
                <span ref="lower" class="block h-0.5 w-6 bg-black"></span>
            </div>
            <span class="font-medium ml-4">Menu</span>
        </button>
    </div>
    
    <!-- Menu XL -->
    <!-- TODO: nav items could be made to list -->
    <hr class="mt-4 sm:mt-12">
    <div class="hidden md:flex uppercase my-6 mr-16 justify-between">
        <a href="/" class="menu-item">Startseite</a>
        <a href="/members" class="menu-item">Mitglieder</a>
        <a href="/about" class="menu-item">Über uns</a>
        <a href="/area" class="menu-item">Verwaltungskreis</a>
        <a href="/contact" class="menu-item">Kontakt</a>
    </div>
    <hr>

    <!-- Opened mobile menu -->
    <div
        v-motion
        :initial="{ opacity: 0, x: 0 }"
        :enter="{ opacity: 1, x: 0, scale: 1 }"
        class="md:hidden flex flex-col gap-16 uppercase fixed backdrop-blur-md bg-white/30 bottom-0 left-0 w-full h-screen items-center p-16"
        v-if="isOpen"
        >
            <a href="/">Startseite</a>
            <a href="/members">Mitglieder</a>
            <a href="/about">Über uns</a>
            <a href="/area">Verwaltungskreis</a>
            <a href="/contact">Kontakt</a>
    </div>
</template>

<style scoped>
    a:hover {
        color: #00579F;
    }

    .icon-pair {
        @apply flex items-center gap-2;
    }

    .menu-item {
        @apply relative ml-16;
    }

    .details {
        @apply hidden lg:flex;
    }
</style>

<script setup lang="ts">
    import { ref } from "vue";
    import { useMotions, useMotion } from '@vueuse/motion'
    import axios from 'axios';

    /* Weather widget, eventually move me out to seperate component 

    const API_KEY = "" // defineProps(['secret'])
    const CITY_NAME = 'Därligen,CH';
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}`;
    var response: any;
    var weatherData: any;

    // figure out why try-catch doesn't work on me
    if (API_KEY) {
        response = await axios.get(URL);
        weatherData = response.data;
    }*/
   
    /* Mobile menu, animations */

    var isOpen = ref<boolean>(false);
    const upper = ref<HTMLElement>()
    const middle = ref<HTMLElement>()
    const lower = ref<HTMLElement>()

    // TODO: Use css animations, this is odd

    const toggle = () => {
        
        isOpen.value = !isOpen.value;
        rotateUpper();
        rotateMiddle();
        toggleLower();
    }

    const { apply: applyUpper } = useMotion(upper, {
        enter: {
            rotateZ: 0
        },
    });
        
    const rotateUpper = async () => {
       await applyUpper({
          rotateZ: isOpen.value ? 45 : 0,
          y: isOpen.value ? 5 : 0,
          transition: {
              type: 'spring',
              damping: 10,
           },
        });
    }

    const { apply: applyMiddle } = useMotion(middle, {
        enter: {
            rotateZ: 0,
        },
    });
        
    const rotateMiddle = async () => {
       await applyMiddle({
          rotateZ: isOpen.value ? -45 : 0,
          transition: {
              type: 'spring',
              damping: 10,
           },
        });
    }
    
    const { apply: applyLower } = useMotion(lower, {
        enter: {
            opacity: 1,
        },
    });

    const toggleLower = async () => {
       await applyLower({
          opacity: isOpen.value ? 0 : 1,
        });
    }

    useMotions();
</script>