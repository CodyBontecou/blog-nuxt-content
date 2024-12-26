---
title: Anki kartlarını iOS qısa yolu ilə yaratmaq
draft: false
ignore: false
topics:
  - anki
  - ios
  - shortcut
date: 2024-12-08T12:45
created_at: 2024-12-08T12:45
last_modified: 2024-12-24T16:16
lang: azj
translate: false
---
Bu məqalə AI tərəfindən tərcümə edilmişdir. [İngilis dilində yazılmış orijinal məqaləyə burada baxın](/creating-anki-cards-using-ios-shortcut)

[Anki](https://apps.ankiweb.net/) Bu, klassik flash kartların müasir bir yanaşmasıdır. [Aralıklı təkrarlama](https://en.wikipedia.org/wiki/Spaced_repetition) .

Bir kart dəstini götürmək və yuxarıdan aşağıya qədər öyrənmək əvəzinə, Anki, yaddaş bankınızı tərk etmək üçün doğru vaxtda kartları üzə çıxarmaq üçün bir yol təqdim edir.

Bu, öyrənmənin çox güclü bir forması olduğunu sübut etdi və yadda saxlamağın vacib olduğu tibb və dil kimi sahələrdə getdikcə populyarlaşır.

Bu, Apple-ın bir qısa yolunu yaratmaqdır ki, bu da mənə yerli Kitablar tətbiqindən məzmun çıxarmağa imkan verir, oxuduğum məzmunu öyrənməyimə kömək edən Anki kartları yaratmağa imkan verir.

Budur iOS Shortcut-un işləməsinin bir nümunəsi:

![Converting copied Books text to Anki card](https://i.imgur.com/EVpwhVY.gif)

## Çətinliklər

Bu qısa yolla birlikdə bir neçə təəccüblü çətinlik də ortaya çıxdı.

1. iOS, Kitabların paylama vərəqində bir qısa yolun olmasına icazə vermir
2. "Kitablar""dan məzmun kopyalamaq, ""Kitab adından alınan hissə""ni ifadə edən bir simli əlavə edir.Bu material müəllif hüququ ilə qorunub saxlanıla bilər."

Bu qısa yolla bir pay vərəqi istifadə etməyi ümid edirdim. Bu, qısa yolla giriş göndərməyi sürətli və asan edir. Amma pay vərəqi probleminə bir həll tapmadım.

Beləliklə, Anki kartlarına məzmunu daxil etməzdən əvvəl bir nüsxə ilə birlikdə gələn "Mütəxəssis ..." mətnini təmizləməyimə qərar verdim.

### Kitab tətbiqetməsinin mətnini təmizləmək

Bu, mətn təmizləmə üçün istifadə olunan qısa yollardan biridir. [bağlantı](https://www.icloud.com/shortcuts/9f9cfa9c71e24dee901590d185951323) Əgər siz onu quraşdırmaq istəyirsinizsə.

Mətn girişini qəbul etməkdən ibarətdir, "Excerpt"... simgesini bir istifadə edərək bölmək`Split`Tətbiqdə, əlavə olaraq, mətnin bəzi hissələrini təmizləmək üçün bir neçə addım atın.`\n`,`" "`,`"`və`“`.

URL kodlaşdırma, Anki-nin əsas həllini təmin edən bir kodlaşdırma proqramıdır.

### Anki kartının yaradılması

Budur bir[bağlantı](https://www.icloud.com/shortcuts/29bb096aaed54e0ca4236f8c1008d9d9) Bu qısa yolun istifadəçiləri üçün, bu qısa yolun istifadəçiləri üçün istifadə etmək üçün istifadə edə biləcəyiniz bir çox qısa yol var.

Paylaşılan vərəq məhdudiyyətini nəzərə alaraq, giriş üçün klipborddan istifadə etməyə qərar verdim.

Bu əməliyyatın yerinə yetirilməsi üçün, siz clipboard-da olan hər şeyi götürüb, onu bir qovluğa saxlayacaqsınız.`Front`Bu, yeni Anki kartınızın ön kartı olacaqdır.

Bu, kitabların yenidən açılmasını təmin edir və növbəti dəfə qısa yolunuzu açanda, qısa yolunuzun kitablarınızın qapaq panosunda olan hər hansı bir dəyəri qəbul edəcəkdir.`Back`Bu dəyişən, yeni Anki kartınızın arxasında yerləşdirilən dəyər olacaqdır.

Beləliklə, bu vəziyyətdə, oxuduğunuz kitabdan yeni bir dəyər kopyalamağı və qısa yol tətbiqetməsinə qayıtmağı məsləhət görürəm.

Bu nöqtədə, hər ikisini təmizləyəcək`Front`və`Back`Stringlər və bu dəyərləri aşağıdakı mətn dəyərinə əlavə etmək:

```
anki://x-callback-url/addnote?profile=bonteq&type=Basic&deck=shortcut&fldFront=CleanedFront&fldBack=CleanedBack
```

Fəaliyyət bu URL-i açacaq, bu da Anki-ni açacaq, kartı göyərtəyə əlavə edəcəkdir.

Bu vəziyyətdə, mənim profil adım`bonteq`Və mənim də bir göyərtəm var.`shortcut`.**Bu simli şəxsi parametrlərinizə uyğunlaşdırmaq istəyəcəksiniz.**

Hələ özümü bir şeyə ehtiyac duyduğumu tapmadım.`Basic`Kartın növü, URL-də göstərilən kimi, bu URL-də də göstərilir.

## Nəticə

Bu dəyərlər bir az daha dinamik olmaq üçün tənzimlənə bilər, amma şəxsən mən hər dəfə bir kart yaratmaq istədiyim zaman giriş sahələrini idarə etmək istəmirəm.

Bu qısa yol quruluşu mənim üçün ən yaxşı işlədiyini tapdım: Anki kartlarını oxuduğum məzmundan mümkün qədər az pozğunluqla yaratmaq.

Ümid edirəm ki, bu faydalı olacaq və sizə kömək edə bilər! Zəhmət olmasa, qısa yolda dəyişikliklər təklif etməkdən çəkinməyin. Onları yaratmaq üçün olduqca yeniyəm və daha yaxşı bir yol olduğunu düşünmək istəyirəm.
