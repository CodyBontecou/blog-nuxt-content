---
title: Construir un componente de tostada persistente y multilingüe Una guía paso a paso para i18n y LocalStorage en Nuxt
lang: es
ignore: false
draft: false
topics:
  - el siguiente
  - i18n
date: 2024-12-20T10:02
created_at: 2024-12-20T10:02
last_modified: 2024-12-19T11:30
---

Imagina esto: acabas de lanzar una nueva y emocionante función en tu aplicación. ¿Quieres anunciarla a tus usuarios, pero no quieres bombardearlos con el mismo mensaje cada vez que visitan?

Las notificaciones de tostadas son un patrón común de la interfaz de usuario para mostrar mensajes temporales a los usuarios, pero cuando necesitas que sean más inteligentes, que aparezcan sólo una vez, que hablen el idioma de tus usuarios y que sepan cuándo desaparecer con gracia, las cosas se ponen interesantes.

En este tutorial, construiremos un componente de tostada desde cero, añadiendo progresivamente características que realmente usarás en producción. Comenzaremos con una implementación básica, luego lo mejoraremos con soporte de internacionalización (i18n) para múltiples idiomas, y finalmente agregaremos persistencia de localStorage para que recuerde cuando se ha mostrado.

Al final de esta guía, usted tendrá:

- Un componente de tostada reutilizable con un patrón de función de renderización limpia - Soporte completo de internacionalización para mensajes multilingües - Gestión de estado persistente utilizando localStorage - Una comprensión profunda de cómo funcionan estas características juntas

¡[exhibición de fragmentos de código de brindis en el sitio web en blanco] (https: i.imgur.com/LRcasfm.gif)
## Instalación y configuración

Comenzaremos con la creación de una nueva aplicación Nuxt:

```bash
npx nuxi@latest init multilingual-toast-nuxt
```

Y luego añadamos algunos módulos usando los útiles comandos cli `nuxi module add`.

### i18n El

Instale el módulo [i18n] (https: nuxt.com/modules/i18n) para facilitar la adición de la internacionalización:

```bash
npx nuxi@latest module add i18n
```

### shadcn-nuxt

También instale el módulo [shadcn-nuxt] (https://nuxt.com modules/shadcn). Utilizo este módulo a menudo para los componentes de la interfaz de usuario. También es así como voy a integrar el componente de tostada.

Esta instalación tiene algunos pasos que son importantes. Puede leer sobre cada dependencia en sus [docs] (https: www.shadcn-vue.com/docs/installation/nuxt).

Shadcn tiene un error que requiere instalar manualmente Typescript como una dependencia de desarrollo:

```bash
npm install -D typescript
```

Shadcn se basa en Tailwindcss:

```bash
npx nuxi@latest module add @nuxtjs/tailwindcss
```

Ahora agregue el módulo shadcn-nuxt:

```bash
npx nuxi@latest module add shadcn-nuxt
```

**Nota:** En el momento de escribir este artículo (dec. 14, 2024), hay [this](https: github.com/nuxt/nuxtissues/77:299) problema con el error `Nuxt module should be a function: @nuxtjs/color-mode`. Si se encuentra con este error, una solución simple es navegar a su archivo `package.json` y reemplazar su dependencia `shadcn-nuxt` con esta versión: __INLINE __CODE_3__

Ejecutar el comando Shadcn init para terminar la instalación:

```bash
npx shadcn-vue@latest init
```

### Componente de tostadas y servicios públicos

Ahora, usted debería ser capaz de instalar los componentes de Shadcn usando su cli. Para este tutorial, sólo vamos a usar su [toast] (https: www.shadcn-vue.com/docs/components/toast.html) componente.

```bash
npx shadcn-vue@latest add toast
```

Esto debería crear archivos dentro de su directorio `components/ui/toast`, así como un archivo `utils.ts` en su directorio `lib`.

Navegue a su archivo `app.vue` y reemplace todo el contenido dentro del archivo con este código:

```vue
// app.vue
<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
    <Toaster />
</template>
```

Esta es la cantidad base de código necesaria para que el componente `Toast` se muestre en otras áreas de su aplicación. Para este tutorial, vamos a usar un ejemplo simple y mantener todo el código dentro de nuestro archivo `app.vue`.

Teniendo esto en cuenta, amplíe este código con lo siguiente:

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

Esto importa el composible `useToast` y extrae la función `toast` de él. Luego llamamos `toast()`. En este ejemplo, lo ejecuto en una llamada `onMounted` para facilitar el uso.

Esta es típicamente la forma en que lo uso, pero en última instancia es sólo una función que se puede llamar según sea necesario.

¡[exhibición de fragmentos de código de brindis en el sitio web en blanco] (https: i.imgur.com/LRcasfm.gif)


Lo bueno de los componentes de Shadcn es que siempre responden. El ejemplo mostrado arriba es cómo se muestra en dispositivos móviles.

Y aquí está en un escritorio:

¡[toast mostrado en la vista del escritorio] (https: www.i.imgur.com 57AKfMa.gif)

## Añadir la internacionalización (i18n)

Con las modernas herramientas de IA, administrar archivos de traducción es fácil y algo que trato de incluir en cada aplicación que construyo.

Instalamos i18n antes en nuestra sección [i18n](#i18n), así que vamos a las cosas divertidas.

Extender su archivo `nuxt.config.ts` para incluir la configuración específica de i18n para que se vea como lo siguiente:

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

Esta es mi configuración preferida. Aquí están los documentos [i18n.nuxtjs.org] (https: https: i18n.nuxtjs.org/) para entender mejor cada opción si tienes curiosidad.

### El archivo i18n en inglés

Necesitamos crear el archivo que contendrá todas las palabras en inglés que nuestro sitio web va a usar. El patrón que implementamos aquí será reproducible y utilizado para cada idioma adicional que utilice.

Personalmente prefiero un directorio dedicado `i18n` que contenga mis archivos de traducción. Mis archivos de traducciones también contienen información explícita sobre su intención. Por ejemplo, en lugar de `eng.json`, prefiero `eng_Latn`. Estos detalles dependen de usted, así es como prefiero organizar mis proyectos.

Nuestro mensaje de brindis contiene dos cadenas:

```json
title: 'Hello toast',
description: "Let's spread some butter on ya.",
```

Vamos a recrear esto dentro de un archivo `eng_Latn.json`:

```json
// i18n/eng_Latn.json
{
	"title": "Hello toast",
	"description": "Let's spread some butter on ya.",
}
```

Los archivos i18n pueden agruparse a medida que el proyecto crece, así que estructuro mi JSON un poco más explícitamente. En este caso, colocaré estas cadenas anidadas dentro de un objeto `toast`:

```json
// i18n/eng_Latn.json
{
	"toast": {
		"title": "Hello toast",
		"description": "Let's spread some butter on ya."
	}
}
```

Ahora, en nuestro archivo `nuxt.config.ts`, añadamos este nuevo lenguaje `locale`:

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

Para cualquier lenguaje futuro que agregue, asegúrese de crear un objeto dedicado `locales` para él. `nuxt.config.ts` es un archivo de escritura, por lo que siempre puede ser creativo con la forma en que itera sobre sus archivos i18n para generar una matriz aquí.

### i18n.config.ts (configurado por el usuario)

El módulo i18n de Nuxt se basa en vueI18n bajo el [hood] (https: https: www.i18n.nuxtjs.org/docs/v8_getting-started/usage#translate-with-vue-i18n). Incluiremos un archivo `i18n.config.ts` en la raíz de nuestro proyecto para configurar específicamente las opciones de vueI18n.

```ts
// i18n.config.ts
import eng_Latn from './i18n/eng_Latn.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'eng_Latn',
    messages: {
        eng_Latn: eng_Latn,
    },
}))
```

Aquí es donde importamos el objeto JSON `eng_Latn` que creamos anteriormente, pasándolo a nuestra configuración `i18n`.

### Integración de las plantillas

Ahora podemos traer las traducciones directamente a nuestros archivos de plantilla ahora que hemos terminado la configuración i18n en nuestra aplicación Nuxt.

Nuxt i18n proporciona un práctico `useI18n` composable que nos permite administrar las traducciones dentro de nuestro `script setup`.

Aquí está nuestro nuevo `app.vue` con i18n en su lugar:

```vue
// app.vue
<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()

onMounted(() => {
    toast({
        title: t('toast.title'),
        description: t('toast.description'),
    })
})
</script>

<template>
    <Toaster />
</template>
```

No está mal, ¿verdad?

## Estado persistente utilizando el almacenamiento local

Probablemente no quieras que tu brindis aparezca cada vez que tu usuario navega a tu sitio.

Una solución común es almacenar algunos datos en almacenamiento local, en estado persistente entre las sesiones de usuario. Sólo quiero mostrar el brindis la primera vez que un usuario navega a nuestro sitio.

### funciones de utilidad useLocalStorage

Decidí pedir a chatGPT que creara una función de utilidad `useLocalStorage` para crear, obtener y eliminar valores del almacenamiento local:

```ts
// lib/useLocalStorage.ts
export const useLocalStorage = () => {
    const setValue = (key: string, value: any): void => {
        if (process.client) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    const getValue = <T>(key: string, defaultValue?: T): T | null => {
        if (process.client) {
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : defaultValue || null
        }
        return defaultValue || null
    }

    const removeValue = (key: string): void => {
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

### Persistiendo en el estado de nuestro brindis

Ahora vamos a editar el componente `Toaster.vue` que Shadcn instaló para nosotros. Usted puede encontrar el archivo del componente en su directorio `components/ui/toast`.

`Toaster.vue` es donde estableceremos el valor en nuestro valor. Estoy tomando un enfoque simple y simplemente diciendo, cuando la tostada está cerrada, establece un valor de almacenamiento local `toast:shown` a true.

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

Vamos a hacer uso del evento `@update:open` que `Toast` emite. Aquí están los [docs] (httpswww.radix-vue.com/components/toast#root) si quieres aprender sobre cada uno de los eventos que soporta nuestro componente.

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
                    <ToastDescription v-if="isVNode(toast.description)">
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

**Nota:** Enlazé a Radix Vue porque Shadcn está construido sobre Radix Vue. Shadcn es principalmente una capa de interfaz de usuario mientras que Radix es donde es posible que desee buscar para obtener una mejor comprensión del estado y los eventos que estos componentes soportan.

### Tostadas de exhibición o ocultación basadas en el estado de almacenamiento local

Está bien, ahora estamos estableciendo el valor `toast:shown` a true cuando cerramos nuestro brindis. Pero ahora, necesitamos comprobar este valor antes de mostrar nuestro brindis.

Afortunadamente para nosotros, el trabajo pesado ya se ha ido y sólo necesitamos hacer una simple comprobación antes de llamar a nuestra función `toast`.

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
            title: t('toast.title'),
            description: t('toast.description'),
        })
    }
})
</script>

<template>
    <Toaster />
</template>
```

Verificamos si `toast:shown` es cierto, lo que significa que ha sido mostrado basado en nuestra lógica `Toaster.vue`.

Si lo es, no muestres el brindis, de lo contrario, muéstralo.

## Conclusiones

Y ahí lo tienes, un componente de tostadas multilingüe que tiene persistencia incorporada.

Este es un patrón común que uso en casi todas mis aplicaciones web y muestra algunas herramientas poderosas como i18n, Shadcn y gestión de almacenamiento local.

Espero que lo hayas disfrutado. ¡Hágamelo saber si tienes algún consejo, sugerencia o crítica!

Puede encontrar el repositorio de Github [aquí] (https: github.com://CodyBontecou/multilingual-toast-nuxt).
