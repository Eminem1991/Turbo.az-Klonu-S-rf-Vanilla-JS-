Layihə: Turbo.az Klonu (Sırf Vanilla JS)
Əsas Şərtlər:
Vaxt məhdudiyyəti yoxdur. Əsas məqsəd tez bitirmək yox, yazılan hər sətir kodun məntiqini dərinləməsinə anlamaqdır.
AI istifadəsi minimum olmalıdır. Kodları AI-a yazdırmaq qadağandır. Tıxandığın hissədə sintaksisə və ya sənədləşməyə (MDN) baxa bilərsən.
Real məlumat lazım deyil (Mock Data): Arxa tərəfdə 15-20 elandan ibarət zəngin bir cars massivi (mock JSON data) istifadə edəcəksən.
Tapşırıq Öhdəlikləri (Sırf Pure JS, HTML, CSS)
Heç bir xarici kitabxana istifadə etmədən aşağıdakı funksionallıqları qurmalısan:
Elanların Siyahılanması (DOM Manipulyasiyası):
Mock məlumatları JavaScript ilə tutub HTML-də avtomobil kartları kimi dinamik göstərməlisən.
Axtarış və Filtrləmə (Array Methods & Events):
Marka/Model seçimi (select).
Qiymət aralığı (Min - Maks input-lar).
Yanacaq növü, Ban növü seçimləri.
"Axtar" düyməsinə basdıqda və ya anlıq yazdıqca siyahı filter() metodu ilə süzülməlidir.
Seçilmişlər / Seçilmişlərə əlavə et (Events & Storage):
Hər kartın üstündəki "Ürək" (Fav) düyməsinə basdıqda avtomobil seçilmişlərə keçməli, təkrar basdıqda çıxmalıdır.
Seçilmiş elanlar səhifə yenilənəndə (F5) localStorage sayəsində silinməməlidir.
Elan Yerləşdir (Form & Validation):
Yeni elan əlavə etmək üçün sadə bir form. Form doldurularkən daxil edilən məlumatların düzgünlüyü (məsələn: qiymət mənfi ola bilməz, telefon nömrəsi müəyyən formatda olmalıdır) JS ilə yoxlanmalıdır.
