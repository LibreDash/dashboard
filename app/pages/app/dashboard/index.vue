<script setup lang="ts">
const temperatures = ref({
  outside: 0,
  inside: 0,
  engine: 0,
});
const speed = ref<number>(0);
const maxSpeed = ref<number>(0);
const revs = ref<number>(0);
const maxRevs = ref<number>(0);

const { data, status } = useWebSocket("ws://localhost:3000/_ws", {
  autoReconnect: true,
});

watch(data, async (val) => {
  let vehicleDataJsonString = await val.text();
  let vehicleData = JSON.parse(vehicleDataJsonString);
  speed.value = Number(vehicleData.speed);
  maxSpeed.value = Number(vehicleData.maxSpeed);
  revs.value = Number(vehicleData.revs);
  maxRevs.value = Number(vehicleData.maxRevs);
  temperatures.value = {
    outside: vehicleData.temperature.outside,
    inside: vehicleData.temperature.inside,
    engine: vehicleData.temperature.engine,
  };
});
</script>

<template>
  <div class="container whitespace-nowrap">
    <div class="inline-block w-full">
      <div class="float-start block w-8/12">
        <TemperatureControlToggle type="airConditioning" />
        <TemperatureControlToggle type="backScreen" />
        <ClimateControlGague
          title="Driver Seat"
          :max-temperature="30"
          :min-temperature="15"
        />
        <VentilationModeSwitch />
      </div>
      <div class="float-end block w-4/12">
        <TemperatureDisplay
          v-for="(temperature, type) in temperatures"
          :type="type"
          :temperature="temperature"
        />
      </div>
    </div>
    <div class="inline-block w-full">
      <RadialDisplay type="speed" :max="maxSpeed" :currentValue="speed" />
      <RadialDisplay type="revs" :max="maxRevs" :currentValue="revs" />
    </div>
  </div>
</template>
