<script setup lang="ts">
  const temperatures = ref({
    "outside": 18,
    "inside": 21,
    "engine": 85
  })
  const speed = ref<number>(76)
  const revs = ref<number>(15600)
</script>

<template>

  <div class="container h-full mt-20">
    <div class="block w-8/12 float-start">
      <ClimateControlGague title="Driver Seat" :max-temperature="30" :min-temperature="15" />
      <VentilationModeSwitch />
      <TemperatureControlToggle type="airConditioning" />
      <TemperatureControlToggle type="backScreen" />
      <RadialDisplay type="speed" :max="240" :currentValue="speed"/>
      <RadialDisplay type="revs" :max="18000" :currentValue="revs"/>
    </div>
    <div class="block w-4/12 float-end">
      <TemperatureDisplay v-for="(temperature, type) in temperatures" :type="type" :temperature="temperature"/>
    </div>
  </div>
</template>
