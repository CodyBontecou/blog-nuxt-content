<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const { locales, locale, setLocale } = useI18n()

const language = computed({
    get: () => locale.value,
    set: newLang => {
        setLocale(newLang)
        // Remove the current locale prefix and get the route name/params
        const pathWithoutLocale = route.path.replace(`/${locale.value}`, '')
        const newPath = `/${newLang}${pathWithoutLocale}`
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
