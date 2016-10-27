# remapp

### http://deykun.boo.pl/lab/remapp/ - **wersja 0.5**

*(do pracy ze stroną potrzebny jest plik w formacie .gpx lub .tcx - w repozytorium w folderze **przyklady** znajduje się 20 tras w formacie .gpx)*

## Cel
W założeniu skrypt ma na podstawie pobranych i skopiowanych do wskazanego folderu tras Endomondo generować mapy których domyślnie serwis ten nie generuje.

### Wersja 0.5
- tryb lokalizacji w którym trasy można wybierać bezpośrednio na mapie

## Generowane mapy
Docelowo skrypt ma generować:
- mapę wyświetlającą położenie od danej godzinie dla wszystkich tras wraz z możliwością odtworzenia dnia w przyśpieszeniu
- mapę wyświetlającą informację o tym jak często użytkownik był w danym miejscu

## Wcześniejsze wersje

### Wersja 0.4
- poprawa wyglądu, optymalizacja
- legenda mapy

![](http://deykun.boo.pl/lab/remapp/log/04/trasy.gif)

![](http://deykun.boo.pl/lab/remapp/log/04/legenda.gif)

### Wersja 0.3
- wersja demonstracyjna online
- możliwość generowania map z kolorami tras zależnymi od roku, miesiąca i godziny (przedział 2 godzin)
- komunikat o złym formacie pliku

### Wersja 0.2
- pobieranie danych o położeniu tras dodanych przy pomocy elementu input[file] -lokalnie bez przesyłania plików na serwer
- generowanie mapy z wszystkimi dodanymi trasami (kolor trasy zależy od roku)

### Wersja 0.1
- pobieranie danych o położeniu (czas oraz długość i szerokość geograficzna) z tras w formatach .gpx i .tcx znajdujących się folderze **tracks**
- pobranie mapy Google dla punktów startowych tras
