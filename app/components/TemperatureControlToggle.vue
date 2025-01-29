<script setup lang="ts">
    interface Props {
        type: string
    }
    defineProps<Props>()

    
    function getButtonColorByState(buttonState: boolean): string
    {
        return buttonState ? buttonColorEnabled : buttonColorDisabled
    }

    function toggle() {
        buttonState.value = !buttonState.value
        currentButtonColor.value = getButtonColorByState(buttonState.value)
    }

    const buttonState = ref<boolean>(false)
    const buttonColorEnabled: string = 'focus:bg-primary hover:bg-primary bg primary'
    const buttonColorDisabled: string = 'focus:bg-secondary hover:bg-secondary bg-secondary'
    const currentButtonColor = ref<string>(getButtonColorByState(buttonState.value))

</script>

<template>
    <div class="w-1/2 p-2 h-52 inline-block">
        <div class="relative text-center h-full">
            <Button :class="['absolute', 'z-10', 'left-0', 'bottom-0', 'size-full', 'p-0', 'focus-visible:ring-0', 'focus:ring-0', currentButtonColor]" @click="toggle">
                <Icon v-if="type === 'airConditioning'" style="height: 52px; width: 52px;" name="mdi:air-conditioner" />
                <Icon v-if="type === 'backScreen'" style="height: 52px; width: 52px;" name="mdi:car-defrost-rear" />
            </Button>
        </div>
    </div>
</template>