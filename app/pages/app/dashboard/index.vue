<script lang="ts" setup>
const count = ref<number>(0);

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <h1>Test</h1>
    <div>Count: {{ count }}</div>

    <div class="w-20 border">Test</div>

    <Button @click="increment">Increment</Button>
    <TestComponent />
    <Input />
  </div>
</template>
