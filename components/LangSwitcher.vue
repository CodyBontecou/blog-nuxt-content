<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const { locales, locale, setLocale } = useI18n()
const localePath = useLocalePath()

const language = computed({
    get: () => locale.value,
    set: newLang => {
        setLocale(newLang)
        const currentPath = route.path
        const newPath = localePath(currentPath, newLang)
        router.push(newPath)
    },
})
</script>
<template>
    <select v-model="language" class="cursor-pointer">
        <option v-for="item in locales" :key="item.code" :value="item.code">
            {{ item.flag }} {{ item.language }}
        </option>
    </select>
</template>
