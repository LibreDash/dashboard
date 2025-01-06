<script setup lang="ts">
  const temperatures = ref({
    "outside": 18,
    "inside": 21,
    "engine": 85
  })
</script>

<template>

  <div class="container h-full mt-20">
    <div class="block w-8/12 float-start">
      <ClimateControlGague title="Driver Seat" :max-temperature="30" :min-temperature="15" />
      <VentilationModeSwitch />
      <TemperatureControlToggle type="airConditioning" />
      <TemperatureControlToggle type="backScreen" />
    </div>
    <div class="block w-4/12 float-end">
      <TemperatureDisplay v-for="(temperature, type) in temperatures" :type="type" :temperature="temperature"/>
    </div>
  </div>
</template>
