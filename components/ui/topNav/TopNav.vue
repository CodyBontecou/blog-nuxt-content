<template>
    <header class="flex justify-between items-center mb-16">
        <h1 class="">
            <NuxtLinkLocale to="/" class="hover:opacity-75">
                Cody Bontecou
            </NuxtLinkLocale>
        </h1>
        <nav class="flex gap-6 text-gray-600">
            <NuxtLinkLocale to="/">
                {{ $t('writing.writing') }}
            </NuxtLinkLocale>
            <NuxtLinkLocale to="/about">
                {{ $t('landing.learnMore') }}
            </NuxtLinkLocale>
            <LangSwitcher />
        </nav>
    </header>
</template>
