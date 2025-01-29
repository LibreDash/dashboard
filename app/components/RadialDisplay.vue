<script setup lang="ts">
    interface Props {
        type: string,
        max: number,
        currentValue: number
    }
    const props = defineProps<Props>()

    // All relating to rotation
    const maxDialRotation = ref<number>(270)
    const minDialRotation = ref<number>(0)
    const rotationStyle = ref<string>()

    function setDialRotation(rotation: number) {
        if (rotation <= maxDialRotation.value && rotation >= minDialRotation.value)
        {
            rotationStyle.value = 'transform: rotate(' + rotation + 'deg)'            
        }
    }

    // Translation from value to rotation
    const maxValue = ref<number>(props.max)
    const minValue = ref<number>(0)
    const value = ref<number>(props.currentValue)

    function setRadialDisplayValue(value: number)
    {
        let valueRange: number = maxValue.value + minValue.value
        let rotationRange: number = maxDialRotation.value + minDialRotation.value

        let factor: number = rotationRange / valueRange

        setDialRotation(Math.round(value * factor))
    }

    const unitLabels: { [key: string]: string } = {
        revs: 'RPM',
        speed: 'KM/H'
    }

    setRadialDisplayValue(value.value)
</script>
<template>
    <div class="w-full p-2 h-[32rem] block float-left">
        <div class="bg-secondary rounded h-full relative">
            <div class="h-[24rem] w-[24rem] absolute z-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div id="radial-container" class="relative h-full w-full">
                    <div 
                        id="dial" 
                        :style="rotationStyle"
                        class="h-full w-full rounded-full absolute z-10"
                        ></div>
                    <div class="bg-white h-full w-full rounded-full absolute z-0 border-secondary border-solid border-2"></div>
                    <div class="bg-secondary h-4/5 w-4/5 rounded-full absolute z-30 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
                    <div class="bg-secondary h-1/2 w-1/2 rounded-tl-full absolute z-40 origin-bottom-right rotate-[225deg]"></div>
                </div>
            </div>
            <div class="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <span class="italic text-6xl">{{ value }}</span><span>{{ unitLabels[type] }}</span>
            </div>
        </div>
    </div>
</template>
<style lang="css">
    #dial {
        background-image:
            linear-gradient(134deg, transparent 50%, hsl(var(--primary)) 50%), 
            linear-gradient(137deg, hsl(var(--primary)) 50%, transparent 50%)
    }
</style>