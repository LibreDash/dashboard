<script setup lang="ts">
    interface Props {
        type: string,
        temperature: number
    }
    defineProps<Props>()
</script>


<template>
    <div class="w-full h-24 p-2 block float-left relative">
        <div class="bg-secondary rounded pl-5 h-full">
            <div class="w-16 inline-block align-middle">
                <Icon style="height: 52px; width: 52px;" v-if="type === 'outside'" name="mdi:thermometer"/>
                <Icon style="height: 52px; width: 52px;" v-if="type === 'engine'" name="mdi:coolant-temperature"/>
                <Icon style="height: 52px; width: 52px;" v-if="type === 'inside'" name="mdi:thermometer"/>
            </div>
            <div class="inline-block align-middle">
                <span class="font-bold text-xl">{{ temperature }} °C</span>
            </div>
        </div>
    </div>
</template>