<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils/cn'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div
        :class="
            cn('rounded-lg bg-card text-card-foreground shadow-sm', props.class)
        "
    >
        <slot />
    </div>
</template>
