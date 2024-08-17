import { LocaleType } from '@/i18n/settings';

export const weightFaqs: Record<LocaleType, Array<{ question: string; answer: string }>> = {
  tr: [
    {
      question: '1 ton kaç gramdır?',
      answer: '1 ton 1.000.000 gramdır.',
    },
    {
      question: '1 pound kaç gram eder?',
      answer: '1 pound yaklaşık olarak 453.592 gram eder.',
    },
    {
      question: 'Bebeklerin kilosu nasıl ölçülür?',
      answer: 'Bebeklerin kilosu özel bir bebek terazisi ile ölçülür.',
    },
    {
      question: 'Vücut kitle indeksi (VKİ) nasıl hesaplanır?',
      answer: 'VKİ, kilonuzun boyunuzun karesine bölünmesiyle hesaplanır. VKİ = Kilo / (Boy x Boy)',
    },
    {
      question: 'Ideal kiloyu nasıl hesaplayabilirim?',
      answer:
        'Ideal kilo hesaplamak için birçok farklı yöntem vardır. En yaygın yöntemlerden biri vücut kitle indeksi (VKİ) kullanmaktır.',
    },
    {
      question: 'Aşırı kilolu olmak sağlığı nasıl etkiler?',
      answer: 'Aşırı kilo, kalp hastalıkları, diyabet, yüksek tansiyon gibi birçok sağlık sorununa yol açabilir.',
    },
    {
      question: 'Zayıflamak için ne yapmalıyım?',
      answer: 'Zayıflamak için sağlıklı beslenmeli ve düzenli egzersiz yapmalısınız.',
    },
    {
      question: 'Kiloyu korumak için nelere dikkat etmeliyim?',
      answer:
        'Kiloyu korumak için sağlıklı beslenme alışkanlıklarını sürdürmeli ve düzenli fiziksel aktivite yapmalısınız.',
    },
    {
      question: 'Hamilelikte kilo alımı nasıl olmalıdır?',
      answer:
        'Hamilelikte kilo alımı, annenin ve bebeğin sağlığı için önemlidir. Doktorunuz size uygun kilo alımı hakkında bilgi verecektir.',
    },
    {
      question: '1 kilo kaç gram eder?',
      answer: '1 kilo 1000 gram eder.',
    },
    {
      question: '1 ton kaç kilogramdır?',
      answer: '1 ton 1000 kilogramdır.',
    },
    {
      question: '1 pound kaç kilogram eder?',
      answer: '1 pound yaklaşık olarak 0,453592 kilogram eder.',
    },
    {
      question: '1 ons kaç gramdır?',
      answer: '1 ons yaklaşık olarak 28,35 gramdır.',
    },
    {
      question: 'Kilogramı pounda nasıl çeviririm?',
      answer: 'Kilogramı pounda çevirmek için kilogram değerini 2,20462 ile çarpın.',
    },
    {
      question: '1 taş kaç kilogramdır?',
      answer: '1 taş yaklaşık olarak 6,35029 kilogramdır.',
    },
    {
      question: '1 kilogram kaç ons eder?',
      answer: '1 kilogram yaklaşık olarak 35,274 ons eder.',
    },
    {
      question: 'Kilogramı gram cinsinden nasıl hesaplarım?',
      answer: 'Kilogram değerini 1000 ile çarparak gram değerini bulabilirsiniz.',
    },
  ],
  en: [
    {
      question: 'How many pounds in a kilogram?',
      answer: 'There are approximately 2.20462 pounds in a kilogram.',
    },
    {
      question: 'How many grams in an ounce?',
      answer: 'There are approximately 28.35 grams in an ounce.',
    },
    {
      question: 'How to convert pounds to kilograms?',
      answer: 'To convert pounds to kilograms, multiply the pound value by 0.453592.',
    },
    {
      question: 'How many kilograms in a ton?',
      answer: 'There are 1000 kilograms in a ton.',
    },
    {
      question: 'How to convert kilograms to pounds?',
      answer: 'To convert kilograms to pounds, multiply the kilogram value by 2.20462.',
    },
    {
      question: 'How many stones in a kilogram?',
      answer: 'There are approximately 0.157473 stones in a kilogram.',
    },
    {
      question: 'How many ounces in a kilogram?',
      answer: 'There are approximately 35.274 ounces in a kilogram.',
    },
    {
      question: 'How to convert grams to kilograms?',
      answer: 'To convert grams to kilograms, divide the gram value by 1000.',
    },
  ],
  de: [
    {
      question: 'Wie viele Pfund sind ein Kilogramm?',
      answer: 'Ein Kilogramm entspricht ungefähr 2,20462 Pfund.',
    },
    {
      question: 'Wie viele Gramm sind eine Unze?',
      answer: 'Eine Unze entspricht ungefähr 28,35 Gramm.',
    },
    {
      question: 'Wie rechne ich Pfund in Kilogramm um?',
      answer: 'Um Pfund in Kilogramm umzuwandeln, multiplizieren Sie den Pfundwert mit 0,453592.',
    },
    {
      question: 'Wie viele Kilogramm sind eine Tonne?',
      answer: 'Eine Tonne entspricht 1000 Kilogramm.',
    },
    {
      question: 'Wie rechne ich Kilogramm in Pfund um?',
      answer: 'Um Kilogramm in Pfund umzuwandeln, multiplizieren Sie den Kilogrammwert mit 2,20462.',
    },
    {
      question: 'Wie viele Steine sind ein Kilogramm?',
      answer: 'Ein Kilogramm entspricht ungefähr 0,157473 Steinen.',
    },
    {
      question: 'Wie viele Unzen sind ein Kilogramm?',
      answer: 'Ein Kilogramm entspricht ungefähr 35,274 Unzen.',
    },
    {
      question: 'Wie rechne ich Gramm in Kilogramm um?',
      answer: 'Um Gramm in Kilogramm umzuwandeln, teilen Sie den Grammwert durch 1000.',
    },
  ],
};
export const squareMeterConverterFAQs: Record<LocaleType, Array<{ question: string; answer: string }>> = {
  en: [
    {
      question: 'How to convert square feet to square meters?',
      answer: 'Multiply the square feet by 0.092903 to get the equivalent in square meters.',
    },
    {
      question: 'What is the difference between square meters and square yards?',
      answer:
        'A square meter is slightly larger than a square yard. There are approximately 1.196 square yards in a square meter.',
    },
    {
      question: 'How to calculate the area of a rectangle in square meters?',
      answer: 'Multiply the length and width of the rectangle to get the area in square meters.',
    },
    {
      question: 'How many square meters is a typical living room?',
      answer:
        'The size of a living room varies greatly, but an average living room might be around 20 to 30 square meters.',
    },
    {
      question: 'How do I calculate square meters for carpet or flooring?',
      answer:
        'Measure the length and width of the room in meters, then multiply them to find the area in square meters.',
    },
    {
      question: 'How to convert square meters to hectares?',
      answer: 'Divide the square meters by 10,000 to get the equivalent in hectares.',
    },
    {
      question: 'How to calculate square meters for a circular room?',
      answer: 'Use the formula: Area = π * radius^2. The radius is half the diameter of the circle.',
    },
    {
      question: 'What is a good square meter to person ratio for a crowded room?',
      answer: 'A general guideline is around 2 to 4 square meters per person for comfortable indoor spaces.',
    },
    {
      question: 'How to calculate square meters for a triangular room?',
      answer:
        'Use the formula: Area = (base * height) / 2. The base is the length of one side, and the height is the perpendicular distance to the opposite side.',
    },
    {
      question: 'How to estimate square meters for irregular shaped rooms?',
      answer:
        'Divide the room into regular shapes (rectangles, squares, triangles) and calculate the area of each shape separately. Then add the areas together.',
    },
    // ... more English FAQs
  ],
  tr: [
    // ... previous Turkish FAQs
    {
      question: 'Balkonun metrekaresi nasıl hesaplanır?',
      answer: 'Balkonun genişliği ile uzunluğunu çarparak metrekare değerini bulabilirsiniz.',
    },
    {
      question: 'Eğimli bir zeminin metrekaresi nasıl hesaplanır?',
      answer: 'Eğimli zemini dikdörtgenlere bölerek her bir dikdörtgenin alanını hesaplayın ve toplamı bulun.',
    },
    {
      question: 'Bir dairenin metrekaresi nasıl hesaplanır?',
      answer: 'Dairenin yarıçapını kare alarak Pi sayısı ile çarpın.',
    },
    {
      question: 'Bir odanın taban alanı nasıl hesaplanır?',
      answer: 'Odanın uzunluğu ile genişliğini çarparak taban alanını bulabilirsiniz.',
    },
    {
      question: 'Bir evin toplam metrekaresi nasıl hesaplanır?',
      answer: 'Evin tüm odalarının ve alanlarının metrekare değerlerini toplayın.',
    },
    {
      question: 'Metrekare ile dönüm arasındaki fark nedir?',
      answer: 'Dönüm, metrekareye göre daha büyük bir alan birimidir. 1 dönüm 1000 metrekareye eşittir.',
    },
    {
      question: 'Bir arsa kaç metrekaredir?',
      answer: 'Arsanın büyüklüğüne bağlıdır. Arsa metrekare olarak ifade edilir.',
    },
    {
      question: 'Bir dairenin brüt ve net metrekaresi arasındaki fark nedir?',
      answer: 'Brüt metrekare dairenin tüm alanını kapsar, net metrekare ise sadece oturum alanlarını içerir.',
    },
    {
      question: 'Bir garaj kaç metrekare olmalıdır?',
      answer:
        'Garajın büyüklüğü araç sayısına ve boyutlarına bağlıdır. Ortalama bir araba için 15-20 metrekare yeterli olabilir.',
    },
    {
      question: 'Bir terasın metrekaresi nasıl hesaplanır?',
      answer: 'Terasın uzunluğu ile genişliğini çarparak metrekare değerini bulabilirsiniz.',
    },
  ],
  de: [
    {
      question: 'Wie berechnet man die Quadratmeter eines Balkons?',
      answer: 'Multiplizieren Sie die Breite und Länge des Balkons, um den Quadratmeterwert zu erhalten.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter einer schrägen Fläche?',
      answer:
        'Teilen Sie die schräge Fläche in Rechtecke auf, berechnen Sie die Fläche jedes Rechtecks und summieren Sie sie.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter eines Kreises?',
      answer: 'Quadrieren Sie den Radius des Kreises und multiplizieren Sie ihn mit Pi.',
    },
    {
      question: 'Wie berechnet man die Grundfläche eines Raumes?',
      answer: 'Multiplizieren Sie die Länge und Breite des Raums, um die Grundfläche zu erhalten.',
    },
    {
      question: 'Wie berechnet man die Gesamtquadratmeter einer Wohnung?',
      answer: 'Addieren Sie die Quadratmeter aller Räume und Flächen der Wohnung.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter einer Terrasse?',
      answer: 'Multiplizieren Sie die Länge und Breite der Terrasse, um die Quadratmeterzahl zu erhalten.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter eines Gartens?',
      answer:
        'Die Berechnung hängt von der Form des Gartens ab. Bei rechteckigen Gärten multiplizieren Sie Länge und Breite.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter eines Parkplatzes?',
      answer: 'Multiplizieren Sie die Länge und Breite des Parkplatzes, um die Quadratmeterzahl zu erhalten.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter einer Baustelle?',
      answer:
        'Die Berechnung hängt von der Form der Baustelle ab. Bei rechteckigen Baustellen multiplizieren Sie Länge und Breite.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter eines Dachbodens?',
      answer: 'Die Berechnung kann komplex sein und erfordert oft eine genaue Messung der Fläche.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter eines Kellers?',
      answer: 'Multiplizieren Sie die Länge und Breite des Kellers, um die Quadratmeterzahl zu erhalten.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter einer Wandfläche?',
      answer: 'Multiplizieren Sie Höhe und Breite der Wand, um die Quadratmeterzahl zu erhalten.',
    },
    {
      question: 'Wie viel Quadratmeter Bodenbelag benötigt man für einen Raum?',
      answer: 'Die benötigte Quadratmeterzahl entspricht der Bodenfläche des Raums.',
    },
    {
      question: 'Wie viel Quadratmeter Teppich benötigt man für einen Raum?',
      answer: 'Die benötigte Quadratmeterzahl entspricht der Bodenfläche des Raums.',
    },
    {
      question: 'Wie berechnet man die Quadratmeter einer Dachschräge?',
      answer: 'Die Berechnung erfordert trigonometrische Funktionen und genaue Maße.',
    },
  ],
};
export const lengthFaqs: Record<LocaleType, Array<{ question: string; answer: string }>> = {
  tr: [
    {
      question: '1 metre kaç santimetre eder?',
      answer: '1 metre 100 santimetre eder.',
    },
    {
      question: '1 kilometre kaç metredir?',
      answer: '1 kilometre 1000 metredir.',
    },
    {
      question: '1 mil kaç kilometredir?',
      answer: '1 mil yaklaşık olarak 1,60934 kilometredir.',
    },
    {
      question: '1 inç kaç santimetre eder?',
      answer: '1 inç yaklaşık olarak 2,54 santimetre eder.',
    },
    {
      question: 'Metreyi inç olarak nasıl çeviririm?',
      answer: 'Metreyi inç olarak çevirmek için metre değerini 39,3701 ile çarpın.',
    },
    {
      question: '1 fit kaç santimetredir?',
      answer: '1 fit yaklaşık olarak 30,48 santimetredir.',
    },
    {
      question: '1 yard kaç metredir?',
      answer: '1 yard yaklaşık olarak 0,9144 metredir.',
    },
    {
      question: 'İnç ile santimetre nasıl çevrilir?',
      answer: 'İnç değerini 2.54 ile çarparak santimetreye dönüştürebilirsiniz.',
    },
    {
      question: 'Feet ve metre arasındaki fark nedir?',
      answer: 'Bir metre bir fitten biraz daha uzundur. Yaklaşık olarak 3.28 feet bir metreye eşittir.',
    },
    {
      question: 'Mil ile kilometre nasıl çevrilir?',
      answer: 'Mil değerini 1.609 ile çarparak kilometreye dönüştürebilirsiniz.',
    },
  ],
  en: [
    {
      question: 'How to convert inches to centimeters?',
      answer: 'Multiply the number of inches by 2.54 to get the equivalent in centimeters.',
    },
    {
      question: 'What is the difference between feet and meters?',
      answer: 'A meter is slightly longer than a foot. There are approximately 3.28 feet in a meter.',
    },
    {
      question: 'How to convert miles to kilometers?',
      answer: 'Multiply the number of miles by 1.609 to get the equivalent in kilometers.',
    },
    {
      question: 'How many centimeters in a meter?',
      answer: 'There are 100 centimeters in a meter.',
    },
    {
      question: 'How many meters in a kilometer?',
      answer: 'There are 1000 meters in a kilometer.',
    },
    {
      question: 'How many kilometers in a mile?',
      answer: 'There are approximately 1.60934 kilometers in a mile.',
    },
    {
      question: 'How many centimeters in an inch?',
      answer: 'There are approximately 2.54 centimeters in an inch.',
    },
    {
      question: 'How to convert meters to inches?',
      answer: 'To convert meters to inches, multiply the meter value by 39.3701.',
    },
    {
      question: 'How many centimeters in a foot?',
      answer: 'There are approximately 30.48 centimeters in a foot.',
    },
    {
      question: 'How many meters in a yard?',
      answer: 'There are approximately 0.9144 meters in a yard.',
    },
  ],
  de: [
    {
      question: 'Wie viele Zentimeter sind ein Meter?',
      answer: 'Ein Meter entspricht 100 Zentimetern.',
    },
    {
      question: 'Wie viele Meter sind ein Kilometer?',
      answer: 'Ein Kilometer entspricht 1000 Metern.',
    },
    {
      question: 'Wie viele Kilometer sind eine Meile?',
      answer: 'Eine Meile entspricht ungefähr 1,60934 Kilometern.',
    },
    {
      question: 'Wie viele Zentimeter sind ein Zoll?',
      answer: 'Ein Zoll entspricht ungefähr 2,54 Zentimetern.',
    },
    {
      question: 'Wie rechne ich Meter in Zoll um?',
      answer: 'Um Meter in Zoll umzuwandeln, multiplizieren Sie den Meterwert mit 39,3701.',
    },
    {
      question: 'Wie viele Zentimeter sind ein Fuß?',
      answer: 'Ein Fuß entspricht ungefähr 30,48 Zentimetern.',
    },
    {
      question: 'Wie viele Meter sind ein Yard?',
      answer: 'Ein Yard entspricht ungefähr 0,9144 Metern.',
    },
    {
      question: 'Wie wandelt man Zoll in Zentimeter um?',
      answer: 'Multiplizieren Sie die Anzahl der Zoll mit 2,54, um den Wert in Zentimeter zu erhalten.',
    },
    {
      question: 'Was ist der Unterschied zwischen Fuß und Meter?',
      answer: 'Ein Meter ist etwas länger als ein Fuß. Etwa 3,28 Fuß entsprechen einem Meter.',
    },
    {
      question: 'Wie wandelt man Meilen in Kilometer um?',
      answer: 'Multiplizieren Sie die Anzahl der Meilen mit 1,609, um den Wert in Kilometer zu erhalten.',
    },
  ],
};
