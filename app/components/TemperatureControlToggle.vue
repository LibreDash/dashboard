<script setup lang="ts">
    interface Props {
        type: string
    }
    defineProps<Props>()
    
    const buttonColor: string = 'bg-secondary'
    const currentButtonColor = ref<string>(buttonColor)
    function toggle() {
        currentButtonColor.value = currentButtonColor.value === '' ? buttonColor : ''
    }
</script>

<template>
    <div class="w-1/2 p-2 h-52 inline-block">
        <div class="relative text-center h-full">
            <Button :class="['absolute', 'z-10', 'left-0', 'bottom-0', 'size-full', 'p-0', currentButtonColor]" @click="toggle">
                <Icon v-if="type === 'airConditioning'" style="height: 52px; width: 52px;" name="mdi:air-conditioner" />
                <Icon v-if="type === 'backScreen'" style="height: 52px; width: 52px;" name="mdi:car-defrost-rear" />
            </Button>
        </div>
    </div>
</template>