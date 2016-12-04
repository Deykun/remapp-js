# scieski

### http://deykun.boo.pl/lab/scieski/ - **wersja 0.7**

## Cel
W założeniu skrypt ma na podstawie pobranych i skopiowanych do wskazanego folderu tras Endomondo generować mapy których domyślnie serwis ten nie generuje.

### Wersja 0.7
- dodanie zakładk "animacja" z opcją "miesiące" która pokazuje trasy z wybranego miesiąca (z zarysem poprzedniego i następnego miesiąca)
- możliwość ustawienia szybkości animacji od 0,15s do 5s.
- dodanie zakładki "legenda" pozwalającej wybrać bezpośrednio jej zakres na miesiąc lub godzine

![](http://deykun.boo.pl/lab/ilustracje/scieski/0.7/animacja.gif)

## Wcześniejsze wersje

#### Wersja 0.6
- całkowita zmiana GUI
- zmiana nazwy z remapp na scieski
- dodanie przycisku ładującego 20 przykładowych tras

![](http://deykun.boo.pl/lab/ilustracje/scieski/0.6/legenda.gif)

![](http://deykun.boo.pl/lab/ilustracje/scieski/0.6/finder.gif)

#### Wersja 0.5
- tryb lokalizacji w którym trasy można wybierać bezpośrednio na mapie

#### Wersja 0.4
- poprawa wyglądu, optymalizacja
- legenda mapy

![](http://deykun.boo.pl/lab/remapp/log/04/trasy.gif)

#### Wersja 0.3
- wersja demonstracyjna online
- możliwość generowania map z kolorami tras zależnymi od roku, miesiąca i godziny (przedział 2 godzin)
- komunikat o złym formacie pliku

#### Wersja 0.2
- pobieranie danych o położeniu tras dodanych przy pomocy elementu input[file] -lokalnie bez przesyłania plików na serwer
- generowanie mapy z wszystkimi dodanymi trasami (kolor trasy zależy od roku)

#### Wersja 0.1
- pobieranie danych o położeniu (czas oraz długość i szerokość geograficzna) z tras w formatach .gpx i .tcx znajdujących się folderze **tracks**
- pobranie mapy Google dla punktów startowych tras
