<script setup lang="ts">

  const temperatures = ref({
    "outside": 18,
    "inside": 21,
    "engine": 85
  })
  const speed = ref()
  const maxSpeed = ref()
  const revs = ref()
  const maxRevs = ref()

  const {} = useWebSocket("ws://localhost:3000/_ws")

  async function connect() {

    var ws = new WebSocket("ws://localhost:3000/_ws")
    ws.addEventListener("open", async (event) => {
      console.log("WS CONNECTED")
    })
    ws.addEventListener("message", async (event) => {
      let vehicleData = await event.data.text()
      console.log(vehicleData)
      speed.value = Number(vehicleData['speed'])
      maxSpeed.value = Number(vehicleData['maxSpeed'])
      console.log(speed.value)
      console.log(maxSpeed.value)
    })
  }

  // check if this is actually client side and not server :C
  if (typeof window !== 'undefined') {
    await connect()
  }
</script>

<template>
  <div class="container whitespace-nowrap">
    <div class="inline-block w-full">
      <div class="block w-8/12 float-start">
        <TemperatureControlToggle type="airConditioning" />
        <TemperatureControlToggle type="backScreen" />
        <ClimateControlGague title="Driver Seat" :max-temperature="30" :min-temperature="15" />
        <VentilationModeSwitch />
      </div>
      <div class="block w-4/12 float-end">
        <TemperatureDisplay v-for="(temperature, type) in temperatures" :type="type" :temperature="temperature"/>
      </div>
    </div>
    <div class="inline-block w-full">  
      <RadialDisplay type="speed" :max="maxSpeed" :currentValue="speed"/>
      <RadialDisplay type="revs" :max="maxRevs" :currentValue="revs"/>
    </div>
  </div>
</template>
