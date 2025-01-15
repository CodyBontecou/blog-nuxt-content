---
title: Building a Persistent, Multilingual Toast Component A Step-by-Step Guide to i18n and LocalStorage in Nuxt
slug: building-a-persistent-multilingual-toast-component-a-step-by-step-guide-to-i18n-and-localstorage-in-nuxt
ignore: false
draft: false
topics:
  - nuxt
  - i18n
date: 2024-12-14T10:02
created_at: 2024-12-14T10:02
last_modified: 2025-01-12T09:07
lang: mai
translate: false
translated_to:
  - afr
  - amh
  - arb
  - ary
  - arz
  - asm
  - azj
  - bel
  - ben
  - bos
  - bul
---
ई लेख कृत्रिम बुद्धिमत्ता द्वारा अनुवादित कएल गेल अछि।[मूल लेख अंग्रेजीमे लिखल गेल अछि](/building-a-persistent-multilingual-toast-component-in-nuxt)

ई एकटा एहन अनुप्रयोग अछि जे अहाँ अपन अनुप्रयोगक लेल एकटा विशेष सुविधा प्रदान करैत छी, मुदा अहाँ एकरा अपन प्रयोक्ताक लेल एकटा संदेशक संग बमबारी नहि करए चाहै छी, जखन ओ सभ एहिमे प्रवेश करैत अछि।

टोस्ट नोटिफिकेशन एकटा सामान्य यूआई पैटर्न अछि जे अस्थायी संदेशकेँ प्रयोक्ताकेँ प्रदर्शित करैत अछि. मुदा जखन अहाँकेँ ओकरासभकेँ बेसी स्मार्ट होएबाक आवश्यकता होएत अछि - मात्र एक बेर देखाबए, अपन प्रयोक्तासभक भाषा बाजए, आ जानए जखन सौन्दर्यपूर्वक गायब भ' जाए - चीजसभ रोचक भ' जाइत अछि.

एहि ट्यूटोरियल मे, हमसभ एकटा टोस्ट घटक बनाबए जा रहल छी, धीरे-धीरे एहन सुविधासभ जोड़ैत छी जे अहाँसभ वास्तवमे उत्पादनमे प्रयोग करब। हमसभ एकटा आधारभूत कार्यान्वयनसँ शुरू करब, फेर एकरा बहु भाषासभक लेल अन्तर्राष्ट्रियकरण (i18n) समर्थनसँ बढ़ाएब, आ अन्तमे localStorage दृढ़ता जोड़ब जाहिसँ ई याद राखत जखन ई देखाओल गेल अछि।

एहि गाइडक अंत धरि, अहाँ सभकेँ ई भेटत:

- एक पुनः प्रयोज्य टोस्ट घटक एकटा साफ रेंडर फंक्शन पैटर्नक संग
- बहुभाषी संदेशसभक लेल पूर्ण अन्तर्राष्ट्रियकरण समर्थन
- स्थानीय भण्डारण क उपयोग करैत लगातार राज्य प्रबंधन
- ई सभ विशेषता एक संग कोना काज करैत अछि तकर गहन समझ

![toast code snippet showcase in blank website](https://i.imgur.com/LRcasfm.gif)

## स्थापना आ सेटअप

हमसभ एकटा नव Nuxt अनुप्रयोगक निर्माणक संग शुरू करब:

```bash
npx nuxi@latest init multilingual-toast-nuxt
```

आ फेर किछु मॉड्यूल जोड़ू एहि आसान उपकरणक उपयोग करैत`nuxi module add`क्लीन कमाण्ड

### i18n (इतिहास)

स्थापित करू[i18n (इतिहास) ](https://nuxt.com/modules/i18n) मॉड्यूल जे अन्तर्राष्ट्रीयकरण केँ जोड़ब आसान बनाबैत अछि:

```bash
npx nuxi@latest module add i18n
```

### shadcn-nuxt

ई सेहो स्थापित करू[shadcn-nuxt](https://nuxt.com/modules/shadcn) ई मोड्युल क उपयोग कएने अछि, आ ई सब कएने अछि, ई सब कएने अछि, ई सब कएने अछि, ई सब कएने अछि, ई सब कएने अछि, ई सब कएने अछि।

ई स्थापनामे किछु चरण अछि जे महत्वपूर्ण अछि. अहाँ प्रत्येक निर्भरताक बारेमे अपन[दस्तावेजसभ](https://www.shadcn-vue.com/docs/installation/nuxt) \[अध्याय २६, २९]

Shadcn मे एकटा बग अछि जकरा लेल मैन्युअल रूप सँ टाइपस्क्रिप्ट केँ डेव डिपेंडेंसी के रूप मे स्थापित करबाक आवश्यकता अछि:

```bash
npm install -D typescript
```

Shadcn Tailwindcss पर निर्भर करैत अछि:

```bash
npx nuxi@latest module add @nuxtjs/tailwindcss
```

आब shadcn-nuxt मॉड्यूल जोड़ू:

```bash
npx nuxi@latest module add shadcn-nuxt
```

**नोट:**&#x908; लेख लिखबाक समय (१४ दिसम्बर, २०२४) [ई](https://github.com/nuxt/nuxt/issues/29779) त्रुटि के साथ समस्या`Nuxt module should be a function: @nuxtjs/color-mode`यदि अहाँ एहि त्रुटि पर चलैत छी, एकटा सरल समाधान अछि अपन .`package.json`आ अपन फाइल केँ प्रतिस्थापित करैत छी`shadcn-nuxt`ई संस्करणक संग निर्भरता:`"shadcn-nuxt": "^0.10.4",`

स्थापना समाप्त करबाक लेल Shadcn init कमांड चलाउ:

```bash
npx shadcn-vue@latest init
```

### टोस्ट घटक आ उपयोगिता

हमसभ ई सब कएने छी जे ई सभटा सामग्री कएने छी, जे कि Shadcloud कएने छी, आ ई सभटा सामग्री कएने छी जे कि ई सभ सामग्री कएने अछि।[टोस्ट](https://www.shadcn-vue.com/docs/components/toast.html) घटक (क) घटक

```bash
npx shadcn-vue@latest add toast
```

ई अहाँक भीतर फाइल बनाओत`components/ui/toast`निर्देशिका आ निर्देशिका`utils.ts`अहाँक फाइलमे`lib`निर्देशिका.

अपन स्थान पर नेविगेट करू`app.vue`आ फाइल मे सभटा सामग्री केँ एहि कोड सँ प्रतिस्थापित करू:

```vue
// app.vue
<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
    <Toaster />
</template>
```

ई कोडक आधार-मात्रा अछि जे कोड प्राप्त करबाक लेल आवश्यक अछि`Toast`एहिमे एकटा महत्वपूर्ण बात ई अछि जे एहि ट्यूटोरियल मे हम सभ एकटा साधारण उदाहरणक प्रयोग करब आ सभटा कोड अपन-अपन जगह पर राखब।`app.vue`फाइल करैत अछि.

एहि कें ध्यान मे रखैत, एहि संहिता कें निम्नलिखित सं विस्तारित करू:

```vue
// app.vue
<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

onMounted(() => {
    toast({
        title: 'Hello toast',
        description: "Let's spread some butter on ya.",
    })
})
</script>

<template>
    <Toaster />
</template>
```

ई आयात करैत अछि`useToast`Composable: कम्पोजिटिबल, कम्पोजिटिबल, कम्पोजिटिबल`toast`एहिमे, हमसभ फलनकेँ सकैत क' छी`toast() `उदाहरणमे, हम एकरा एकटा एहि .`onMounted`ई सुविधाक लेल ई-मेल क' प्रयोग करू।

हम सामान्यतः एकर प्रयोग एहि तरहेँ करैत छी, मुदा ई अंततः एकटा फलन अछि जकरा आवश्यकतानुसार बजाओल जा सकैत अछि.

![toast code snippet showcase in blank website](https://i.imgur.com/LRcasfm.gif)

Shadcn घटकसभक बारेमे नीक बात ई अछि जे ई सभ हमेशा प्रतिक्रियाशील रहैत अछि। उपरोक्त उदाहरण मोबाइल उपकरणसभमे कोना देखाओल गेल अछि।

आ ई एकटा डेस्कटप पर अछि:

![toast shown on desktop view](https://i.imgur.com/57AKfMa.gif)

## अन्तर्राष्ट्रियकरण (i18n) जोड़ना

आइ-काल्हि एआई-एड-ऑन-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड-एड

i18n मे स्थापित कएने अछि[i18n (इतिहास) ](#i18n) अनुभाग, तँ चलू, मनोरंजक बात सभ पर चलू।

अपन विस्तार करू`nuxt.config.ts`ई फाइल i18n-विशिष्ट विन्यास केँ शामिल करबाक लेल अछि जाहिसँ ई निम्नानुसार देखाइ देत:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    i18n: {
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'nuxt_i18n',
        },
        defaultLocale: 'eng_Latn',
        locales: [],
    },
})
```

ई हमर गोट-टू-कॉन्फिगरेशन अछि।[i18n.nuxtjs.org द्वारा](https://i18n.nuxtjs.org/) यदि अहाँ उत्सुक छी त' प्रत्येक विकल्प केँ बेहतर ढंग सँ बुझबाक लेल डॉक्स.

### अंग्रेजी i18n फाइल

ई फाइलमे अंग्रेजी भाषाक शब्दसभ अछि जे अहाँ अपन वेबसाइटमे प्रयोग कए सकैत छी, आ ई फाइलमे अंग्रेजी भाषाक शब्दसभ अछि जे अहाँ अपन वेबसाइटमे प्रयोग कए सकैत छी।

व्यक्तिगत रूप सँ हम एकटा समर्पित`i18n`अनुवादक फाइलमे अनुवादक लेल आवश्यक जानकारी सेहो देल गेल अछि, जे एहिमे अनुवादक लेल आवश्यक जानकारी सेहो देल गेल अछि।`eng.json`हम बेसी पसंद करैत छी,`eng_Latn`विवरण अहाँ पर निर्भर अछि, ई त' हमर परियोजनाक आयोजन करबाक तरीका अछि.

हमर सभक टोस्ट मे दूटा स्ट्रिंग अछि:

```json
title: 'Hello toast',
description: "Let's spread some butter on ya.",
```

आब एकरा पुनः बनाउ`eng_Latn.json`फाइलः (फाइल)

```json
// i18n/eng_Latn.json
{
	"title": "Hello toast",
	"description": "Let's spread some butter on ya.",
}
```

i18n फाइल क' कस्टम क' सकैत अछि, एहि लेल हम अपन JSON क' कनेक बेसी स्पष्ट रूप सँ संरचना करैत छी. एहि मामला मे, हम ई स्ट्रिंग्स क' नेस्टेड क' क' राखब`toast`वस्तु:

```json
// i18n/eng_Latn.json
{
	"toast": {
		"title": "Hello toast",
		"description": "Let's spread some butter on ya."
	}
}
```

आब, हमरा सभक`nuxt.config.ts`फाइल, ई नव भाषा जोड़ू`locale`\[अध्याय २६, २९]

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    i18n: {
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'nuxt_i18n',
        },
        defaultLocale: 'eng_Latn',
        locales: [{ code: 'eng_Latn', title: 'English' }],
    },
})
```

कोनो भविष्यक भाषाक लेल जे अहाँ जोड़ैत छी, सुनिश्चित करू जे अहाँ एकटा समर्पित भाषा बनाबए छी`locales`एकर आपत्ति लेल।`nuxt.config.ts`ई एकटा टाइपस्क्रिप्ट फाइल अछि, एहि लेल अहाँ हमेशा रचनात्मक भ' सकैत छी जे अहाँ अपन i18n फाइल पर कोना पुनरावृत्ति करैत छी एहि ठाम एकटा सरणी उत्पन्न करबाक लेल।

### i18n.config.ts मे

NXT i18n मॉड्यूल[हुड](https://i18n.nuxtjs.org/docs/v8/getting-started/usage#translate-with-vue-i18n) हमसभ एकटा शामिल करब`i18n.config.ts`ई फाइलमे, हमसभ अपन प्रोग्रामक मूलमे स्थित फाइलकेँ देखब आ विउ18एन विकल्पकेँ विशेष रूपसँ कन्फिगर करब।

```ts
// i18n.config.ts
import eng_Latn from './i18n/eng_Latn.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'eng_Latn',
    messages: {
        eng_Latn: eng_Latn,
    },
}) )
```

एहि ठाम हमसभ आयात करैत छी`eng_Latn`जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) - जेएसओएन (जेएसओएन) `i18n`विन्यास।

### टेम्पलेट एकीकरण

आब हमसभ अपन टेम्पलेट फाइलमे अनुवादकेँ सीधा ला सकैत छी आब जखन हमसभ अपन Nuxt अनुप्रयोगमे i18n कन्फिगरेसन समाप्त कएने छी.

NXT i18n एक सुविधाजनक उपकरण`useI18n`कम्पोजिट क' लेल अनुवादक कें उपयोग क' लेल क' देल गेल अछि.`script setup`\[अध्याय २६, २९]

ई हमर सभक नव`app.vue`i18n (i18n) के साथ आवरण

```vue
// app.vue
<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()

onMounted(() => {
    toast({
        title: t('toast.title') ,
        description: t('toast.description') ,
    })
})
</script>

<template>
    <Toaster />
</template>
```

खराब नहि अछि, की?

## स्थानीय भण्डारणक उपयोग करैत स्थायी अवस्था

अहाँ (संभवतः) नहि चाहैत छी जे अहाँक टोस्ट प्रत्येक बेर देखाइ देब जखन अहाँक प्रयोक्ता अहाँक साइट पर नेविगेट करैत अछि.

ई एकटा सामान्य समाधान अछि कि किछु डाटा स्थानीय भण्डारणमे संग्रहीत कएल जाए, प्रयोक्ता सत्रसभक बीच स्थायी अवस्थामे। हम केवल टोस्ट देखाबए चाहैत छी जखन प्रयोक्ता पहिल बेर हमरासभक साइट पर नेविगेट करैत अछि।

### useLocalStorage उपयोगिता कार्यसभ

हम अपन ब्लॉग पर chatgpg.com क उपयोग कए रहल छी आ एहि मे एकटा ब्लॉग कए रहल छी।`useLocalStorage`स्थानीय भण्डारण सँ मान बनाबय, प्राप्त करए आ हटाबय लेल उपयोगिता फंक्शन:

```ts
// lib/useLocalStorage.ts
export const useLocalStorage = () => {
    const setValue = (key: string, value: any) : void => {
        if (process.client) {
            localStorage.setItem(key, JSON.stringify(value) )
        }
    }

    const getValue = <T>(key: string, defaultValue?: T) : T | null => {
        if (process.client) {
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : defaultValue || null
        }
        return defaultValue || null
    }

    const removeValue = (key: string) : void => {
        if (process.client) {
            localStorage.setItem(key, '')
        }
    }

    return {
        setValue,
        getValue,
        removeValue,
    }
}
```

### हमरा सभक टोस्टक स्थितिमे जिद्द करैत छी

आब हमसभ सम्पादन करए जा रहल छी`Toaster.vue`ई सब कंपाउण्डर Shadcloud मे स्थापित अछि आ ई सब कंपाउण्डर क' लेल अछि।`components/ui/toast`निर्देशिका.

`Toaster.vue`"एकरा ""स्थानीय भंडारण"" कहल जाएत अछि, जे ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थानीय भंडारण"" क लेल ""स्थ"`toast:shown`सत्यक लेल।

```ts
// Toaster.vue
<script setup lang="ts>
import { isVNode } from 'vue'
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '.'
import { useToast } from './use-toast'

const { toasts } = useToast()

const { setValue } = useLocalStorage()
const handleOpenEvent = async () => {
    setValue('toast:shown', true)
}
</script>
```

हमसभ एकर उपयोग करए जा रहल छी`@update:open`ई घटना`Toast`ई सभ पन्ना सम्बन्धित अछि[दस्तावेजसभ](https://www.radix-vue.com/components/toast#root) जँ अहाँ सभ एहिमे सँ कोनो घटनाक बारे मे जानए चाहै छी तँ हमरा सभक घटक एहिमे सँ प्रत्येक घटनाक समर्थन करैत अछि।

```vue
// Toaster.vue
<template>
    <ToastProvider>
        <Toast
            v-for="toast in toasts"
            :key="toast.id"
            v-bind="toast"
            @update:open="handleOpenEvent" <!--- Add this
        >
            <div class="grid gap-1">
                <ToastTitle v-if="toast.title">
                    {{ toast.title }}
                </ToastTitle>
                <template v-if="toast.description">
                    <ToastDescription v-if="isVNode(toast.description) ">
                        <component :is="toast.description" />
                    </ToastDescription>
                    <ToastDescription v-else>
                        {{ toast.description }}
                    </ToastDescription>
                </template>
                <ToastClose />
            </div>
            <component :is="toast.action" />
        </Toast>
        <ToastViewport />
    </ToastProvider>
</template>
```

**नोट:**&#x908; सब कूटशब्द क' उपयोग क' रहल अछि, जे कि Shadcnc क' उपयोग क' रहल अछि, जे कि एक UI लेयर अछि, जे कि एक कूटशब्द क' उपयोग क' रहल अछि, जे कि एक कूटशब्द क' उपयोग क' रहल अछि, जे कि एक कूटशब्द क' उपयोग क' रहल अछि।

### स्थानीय भण्डारण अवस्थाक आधारमे शो-हाइड टोस्ट

ठीक अछि, आब हमसभ सेटिंग कए रहल छी`toast:shown`"सत्य"" सँ जोड़बाक लेल, हमसभ ""सत्य"" केँ ""सत्य"" सँ जोड़ैत छी, आ ""सत्य"" केँ ""सत्य"" सँ जोड़ैत छी, आ एहि तरहेँ, ई ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"" सँ ""सत्य"""""""" सत्य"" सँ ""सत्य"" सत्य"" सँ ""सत्य"""" सत्य"" सँ ""सत्य"""" सत्य"""" सत्य ""सत्य"""""""""" सत्य ""सत्य"""""""""" सत्य ""सत्य"""""""""" सत्य ""सत्य"""""""

भाग्यवश, हमसभके लेल भारी भार उठाबएके समय समाप्त भ' गेल अछि आ हमरासभके अपन फोन करबासँ पहिने एकटा साधारण जाँच करैक आवश्यकता अछि ।`toast`फंक्शन.

```vue
// app.vue
<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()
const { getValue } = useLocalStorage()

onMounted(() => {
    const toastShown = getValue('toast:shown')

    if (!toastShown) {
        toast({
            title: t('toast.title') ,
            description: t('toast.description') ,
        })
    }
})
</script>

<template>
    <Toaster />
</template>
```

हमसभ जाँच करैत छी जे की`toast:shown`ई सत्य अछि, एकर अर्थ ई अछि जे ई हमरा सभक आधार पर देखाओल गेल अछि`Toaster.vue`तर्कसंगतता।

यदि ई अछि, त' टोस्ट नहि देखाउ. अन्यथा, एकरा देखाउ.

## निष्कर्ष

आ एतए अहाँ सभ लग अछि! एक बहुभाषी टोस्ट घटक जाहिमे दृढ़ता निर्मित अछि।

ई एकटा सामान्य पैटर्न अछि जे हम लगभग हमर सभ वेब एप्लिकेशन मे प्रयोग करैत छी आ किछु शक्तिशाली उपकरणक प्रदर्शन करैत अछि जेना कि i18n, Shadcn, आ स्थानीय भंडारण प्रबंधन।

हमरा आशा अछि जे अहाँ सभ केँ ई नीक लागल। जँ अहाँ सभ केँ कोनो सलाह, सुझाव, वा आलोचना अछि तँ हमरा सूचित करू!

अहाँ GitHub भण्डार पाबि सकैत छी[एहिठाम](https://github.com/CodyBontecou/multilingual-toast-nuxt) \[अध्याय २६, २९]
