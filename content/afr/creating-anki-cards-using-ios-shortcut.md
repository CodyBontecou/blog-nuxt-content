---
title: Skep Anki kaarte met behulp van iOS kortpad
slug: skep-anki-kaarte-met-behulp-van-ios-kortpad
draft: false
ignore: false
topics:
  - anki
  - ios
  - shortcut
date: 2024-12-08T12:45
created_at: 2024-12-08T12:45
last_modified: 2025-01-07T13:30
lang: afr
translate: false
---
Hierdie artikel is vertaal deur AI. [Sien die oorspronklike artikel wat in Engels geskryf is hier](/creating-anki-cards-using-ios-shortcut)

[Anki](https://apps.ankiweb.net/) Dit is 'n moderne benadering tot die klassieke flash kaarte, en dit is 'n uitstekende manier om te gebruik. [Gespaseerde herhaling](https://en.wikipedia.org/wiki/Spaced_repetition) Die .

In plaas daarvan om 'n dek kaarte te neem en dit van bo tot onder te bestudeer, bied Anki 'n manier om kaarte op die oppervlak te kry, net op die regte tyd, net op die oomblik dat dit jou geheue bank verlaat.

Dit is 'n baie kragtige vorm van studie en word toenemend gewild in velde soos medisyne en taal waar memorisering noodsaaklik is.

Die doel hier is om 'n Apple-kortpad te skep wat my in staat stel om inhoud uit die inheemse Boeke-toepassing te onttrek en Anki-kaarte te skep wat my help om die inhoud wat ek lees, te bestudeer.

Hier is 'n voorbeeld van die iOS Shortcut loop:

![Converting copied Books text to Anki card](https://i.imgur.com/EVpwhVY.gif)

## Uitdagings

Daar was 'n paar verrassende uitdagings wat saam met hierdie kortpad gekom het.

1. iOS laat nie ' n kortpad binne die deel vel van Boeke
2. "Die kopie van inhoud van boeke voeg 'n string by wat sê: ""Uittreksel uit BOEKNAAM. Hierdie materiaal kan deur kopiereg beskerm word."""

Ek het gehoop om 'n deelblad met hierdie kortpad te gebruik. Dit maak die stuur van insette na 'n kortpad vinnig en maklik. Maar, ek het nie 'n oplossing vir die deelblad probleem gevind nie.

So, ek het besluit ek sal eenvoudig moet skoonmaak die "Expert ..." teks wat saam met 'n kopie kom voordat die inhoud in Anki kaarte ingevoeg word.

### Skoonmaak van Boek app se teks

Ek het die teks skoonmaak in sy eie kortpad. [skakel](https://www.icloud.com/shortcuts/9f9cfa9c71e24dee901590d185951323) Dit is die enigste manier om dit te doen as jy dit wil installeer.

Dit bestaan uit die ontvangs van die teks insette, skeiding weg die "Uitgawe ..." string met behulp van 'n`Split`Die proses is om die teks te verwyder en dan die teks te verwyder, soos in die voorbeeld hieronder.`\n`Die,`" "`Die,`"`, en`“`Jy moet sterf.

Dit URL dan kodeer die teks as gevolg van die aard van ons Anki oplossing.

### Die skep van die Anki-kaart

Hier is 'n[skakel](https://www.icloud.com/shortcuts/29bb096aaed54e0ca4236f8c1008d9d9) Hierdie kortpad is die enigste manier om dit te installeer.

Gegewe die deel vel beperking, het ek besluit om die klembord te gebruik vir insette.

Wanneer die aksie is uitgevoer, sal dit die inhoud in jou klempaneel neem en dit te stoor in die`Front`Die volgende is die eerste kaart van jou nuwe Anki-kaart.

Die volgende keer as jy jou kortpad oopmaak, sal die kortpad enige waarde aanvaar wat in jou klempie is vir die boek.`Back`Die waarde van die veranderlike is die waarde wat op die agterkant van die Anki-kaart geplaas word.

So, in hierdie geval, beveel ek aan dat jy 'n nuwe waarde kopieer uit die boek wat jy lees en teruggaan na die Shortcut-app.

Op hierdie punt, sal dit skoon te maak beide`Front`en`Back`Strings, en die toevoeging van hierdie waardes aan die volgende teks waarde:

```
anki://x-callback-url/addnote?profile=bonteq&type=Basic&deck=shortcut&fldFront=CleanedFront&fldBack=CleanedBack
```

Die aksie sal hierdie URL oopmaak, wat Anki oopmaak en die kaart by die dek voeg.

In hierdie geval, my profiel naam is`bonteq`Ek het 'n dek met die naam`shortcut`Jy moet sterf.**Jy sal wil om hierdie string aan te pas by jou persoonlike instellings.**

Ek het nog nie gevind myself nodig iets meer as 'n`Basic`Die kaart is ook 'n tipe, en die URL is ook 'n tipe.

## Gevolgtrekking

Hierdie waardes kan aangepas word om 'n bietjie meer dinamies te wees, maar ek persoonlik wil nie invoer velde te bestuur elke keer as ek wil 'n kaart te skep.

Die kortpad-opstel is wat ek gevind het om die beste vir my te werk: skep Anki-kaarte van inhoud wat ek lees met so min ontwrigting as moontlik aan my lees.

Ek hoop jy vind dit waardevol en dit is in staat om jou te help! Asseblief, moenie huiwer om veranderinge aan die kortpad te stel nie. Ek is redelik nuut om hulle te skep en wil graag dink daar is 'n beter manier.
