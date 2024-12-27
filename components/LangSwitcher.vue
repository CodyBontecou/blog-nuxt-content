<script setup lang="ts">
const { locales, locale, setLocale } = useI18n()
const localePath = useLocalePath()

const language = computed({
    get: () => locale.value,
    set: value => {
        setLocale(value)
        navigateTo(localePath('/', value))
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
