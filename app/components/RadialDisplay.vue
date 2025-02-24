<script setup lang="ts">
interface Props {
  type: string;
  max: number;
  currentValue: number;
}
const props = defineProps<Props>();

// All relating to rotation
const minDialRotation = ref<number>(0);
const maxDialRotation = ref<number>(270);
const rotation = ref<string>("rotate(0deg)");

// Translation from value to rotation
const value = ref<number>(props.currentValue);

watch(
  () => props.currentValue,
  (currentValue) => {
    value.value = currentValue;
    setRadialDisplayValue(currentValue);
  },
);

function setRadialDisplayValue(value: number) {
  let valueRange: number = props.max + 0;
  let rotationRange: number = maxDialRotation.value + minDialRotation.value;

  let factor: number = rotationRange / valueRange;

  setDialRotation(Math.round(value * factor));
}

function setDialRotation(setRotation: number) {
  if (
    setRotation <= maxDialRotation.value &&
    setRotation >= minDialRotation.value
  ) {
    rotation.value = "rotate(" + setRotation + "deg)";
  }
}

const unitLabels: { [key: string]: string } = {
  revs: "RPM",
  speed: "KM/H",
};
</script>
<template>
  <div class="float-left block h-[32rem] w-1/2 p-2">
    <div class="bg-secondary relative h-full rounded">
      <div
        class="absolute left-[50%] top-[50%] z-0 h-[24rem] w-[24rem] translate-x-[-50%] translate-y-[-50%]"
      >
        <div id="radial-container" class="relative h-full w-full">
          <div
            id="dial"
            :style="{ transform: rotation }"
            class="absolute z-10 h-full w-full rounded-full"
          ></div>
          <div
            class="border-secondary absolute z-0 h-full w-full rounded-full border-2 border-solid bg-white"
          ></div>
          <div
            class="bg-secondary absolute left-[50%] top-[50%] z-30 h-4/5 w-4/5 translate-x-[-50%] translate-y-[-50%] rounded-full"
          ></div>
          <div
            class="bg-secondary absolute z-40 h-1/2 w-1/2 origin-bottom-right rotate-[225deg] rounded-tl-full"
          ></div>
        </div>
      </div>
      <div
        class="absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%]"
      >
        <span class="text-6xl italic">{{ value }}</span
        ><span>{{ unitLabels[type] }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="css">
#dial {
  transition: all 0.2s;
  background-image: linear-gradient(
      134deg,
      transparent 50%,
      hsl(var(--primary)) 50%
    ),
    linear-gradient(137deg, hsl(var(--primary)) 50%, transparent 50%);
}
</style>
