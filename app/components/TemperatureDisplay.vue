<script setup lang="ts">
    interface Props {
        type: string,
        temperature: number
    }
    defineProps<Props>()
</script>


<template>
    <div class="w-full h-24 p-2 block float-left">
        <div class="bg-secondary rounded p-5 h-full">
            <div class="w-16 block float-left">
                <Icon style="height: 52px; width: 52px;" v-if="type === 'outside'" name="mdi:thermometer"/>
                <Icon style="height: 52px; width: 52px;" v-if="type === 'engine'" name="mdi:coolant-temperature"/>
                <Icon style="height: 52px; width: 52px;" v-if="type === 'inside'" name="mdi:thermometer"/>
            </div>
            <div class="block float-left">
                <span class="font-bold text-lg">{{ temperature }}</span> °C
            </div>
        </div>
    </div>
</template>