<script setup lang="ts">
    interface Props {
        type: string,
        temperature: number
    }
    defineProps<Props>()
</script>

<template>
    <div class="w-full h-24 p-2 block float-left">
        <div class="bg-secondary rounded pl-5 h-full relative">
            <div class="absolute top-[50%] translate-y-[-50%]">
                <div class="w-16 inline-block align-middle">
                    <Icon style="height: 52px; width: 52px;" v-if="type === 'outside'" name="mdi:thermometer"/>
                    <Icon style="height: 52px; width: 52px;" v-if="type === 'engine'" name="mdi:coolant-temperature"/>
                    <Icon style="height: 52px; width: 52px;" v-if="type === 'inside'" name="mdi:thermometer"/>
                </div>
                <div class="inline-block align-middle">
                    <span class="font-bold text-3xl">{{ temperature }}</span><span class="text-3xl"> °C</span>
                </div>
            </div>
        </div>
    </div>
</template>