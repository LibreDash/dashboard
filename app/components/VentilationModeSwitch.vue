<script setup lang="ts">
    const ventilationModes = ref([
        'window',
        'faceAndFeet',
        'feet',
        'feetAndWindow'
    ])
    const selectedVentilationModeIndex = ref<number>(0)
    const selectedVentilationMode = ref(ventilationModes.value[selectedVentilationModeIndex.value])
    function toggle() {
        let newSelectedVentilationModeIndex = selectedVentilationModeIndex.value += 1
        if (ventilationModes.value.length === newSelectedVentilationModeIndex) {
            newSelectedVentilationModeIndex = 0
        }
        selectedVentilationModeIndex.value = newSelectedVentilationModeIndex
        selectedVentilationMode.value = ventilationModes.value[selectedVentilationModeIndex.value]
    }
</script>

<template>
    <div class="w-1/2 p-2 h-52 block float-left">
        <div class="rounded h-full">
            <div class="relative text-center h-full">
                <Button class="absolute left-0 bottom-0 w-full z-10 h-full focus:ring-0 focus-visible:ring-0" @click="toggle">
                    <Icon style="height: 52px; width: 52px;" v-if="selectedVentilationMode === 'window'" name="mingcute:front-windshield-defroster-line"/>
                    <Icon style="height: 52px; width: 52px;" v-if="selectedVentilationMode === 'faceAndFeet'" name="mdi:smoking"/>
                    <Icon style="height: 52px; width: 52px;" v-if="selectedVentilationMode === 'feet'" name="mdi:smoking"/>
                    <Icon style="height: 52px; width: 52px;" v-if="selectedVentilationMode === 'feetAndWindow'" name="mdi:smoking"/>
                </Button>
            </div>
        </div>
    </div>
</template>