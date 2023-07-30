<template>
    <div>
      <h1>Weather in {{ CITY_NAME }}</h1>
      <p v-if="loading">Loading...</p>
      <p v-else>
         {{ weatherData.main.temp }}°C - {{ weatherData.weather[0].description }}
      </p>
  </div>
</template>
  
<script setup>
  import axios from 'axios';
    
  const API_KEY = import.meta.env.API_SECRET;
  const CITY_NAME = 'Därligen,CH';
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}`;

  // figure out why try-catch doesn't work on me
  var loading = true;
  const response = await axios.get(URL);
  const weatherData = response.data;
  loading = false;
</script>