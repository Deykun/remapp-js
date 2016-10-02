# Mapy GPS na dysku

## Cel
W założeniu skrypt ma na podstawie pobranych i skopiowanych do wskazanego folderu tras Endomondo generować mapy których domyślnie serwis ten nie generuje.

### Wersja 0.1
- pobieranie danych o położeniu (czas oraz długość i szerokość geograficzna) z tras w formatach .gpx i .tcx znajdujących się folderze **tracks**
- pobranie mapy Google dla punktów startowych tras
![](http://deykun.boo.pl/lab/remapp/v01.gif)

## Generowane mapy
Docelowo skrypt ma generować:
- mapę wyświetlającą położenie od danej godzinie dla wszystkich tras wraz z możliwością odtworzenia dnia w przyśpieszeniu
- mapę wyświetlającą informację o tym jak często użytkownik był w danym miejscu
