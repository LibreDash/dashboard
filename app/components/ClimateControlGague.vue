<script setup lang="ts">
    interface Props {
        title: string,
        maxTemperature: number,
        minTemperature: number
    }
    defineProps<Props>()

    // TODO fetch this from somewhere
    const temperature = ref<number>(25)
    
    const defaultIncrementAmount = 0.5
    
    function increase() {
        temperature.value += defaultIncrementAmount
    }

    function decrease() {
        temperature.value -= defaultIncrementAmount
    }
</script>

<template>
    <div class="w-1/2 p-2 h-52 block float-left">
        <div class="bg-secondary rounded h-full">
            <div class="relative text-center h-full">
                <Button class="absolute left-0 h-full w-20 z-10 focus:ring-0 focus-visible:ring-0" @click="decrease">
                    <span class="font-bold text-xl">-</span>
                </Button>
                <div class="absolute flex justify-center items-center left-0 right-0 bottom-0 top-0 z-0 w-full">
                    <span class="font-bold text-lg">{{ temperature }}</span> °C
                </div>
                <Button class="absolute right-0 h-full w-20 z-10 focus:ring-0 focus-visible:ring-0" @click="increase">
                    <span class="font-bold text-xl">+</span>
                </Button>
            </div>
        </div>
    </div>
</template>