# Mapy GPS na dysku

## Cel
W założeniu skrypt ma na podstawie pobranych i skopiowanych do wskazanego folderu tras Endomondo generować mapy których domyślnie serwis ten nie generuje.

### Wersja 0.2
- pobieranie danych o położeniu tras dodanych przy pomocy elementu input[file] (lokalnie bez przesyłania plików na serwer)
- generowanie mapy z wszystkimi dodanymi trasami (kolor trasy zależy od roku)

![ ](http://deykun.boo.pl/lab/remapp/trasy.png)

## Generowane mapy
Docelowo skrypt ma generować:
- mapę wyświetlającą położenie od danej godzinie dla wszystkich tras wraz z możliwością odtworzenia dnia w przyśpieszeniu
- mapę wyświetlającą informację o tym jak często użytkownik był w danym miejscu

## Wcześniejsze wersje

### Wersja 0.1
- pobieranie danych o położeniu (czas oraz długość i szerokość geograficzna) z tras w formatach .gpx i .tcx znajdujących się folderze **tracks**
- pobranie mapy Google dla punktów startowych tras
