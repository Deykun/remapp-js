/* Generowanie mapy */
map = 'start';
function mapLoad() {
	if (map === 'start') {
		var center, zoom;
		if (trk[0]) {
			center = trk[0][0][0];
			zoom = 13;
		} else {
			center = {lat: 52.03, lng: 19.27};
			zoom = 6;
		}
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: zoom,
			center: center,
			mapTypeControl: false,
			styles: mapStyle
		});
	}
	changeMap();
}

/* Wybór markerów na mapie */
marker = [], polyline = [];
var changing = 0;
function changeMap(datetype, daterange) {
	/* Usuwa obecne na mapie markery */
	for (var i = 0, imax = marker.length ; i < imax ; i+=1)	{
		marker[i].setMap(null);
	}

	/* Ustawia nowe markery na mapie */
	for (var i = 0, newmarker, imax = trk.length ; i < imax ; i+=1) {
		if (datetype === 'm') {
			/* Ustalenie sąsiadujących miesięcy */
			var prevrange = daterange-1;
			var nextrange = daterange+1;
			switch (daterange) {
				case 0:
					prevrange = 11;
					break;
				case 11:
					nextrange = 0;
					break;
			}

			var trkmonth = Number(new Date(trk[i][1][0]).getMonth());
			color = strokes.color.month[new Date(trk[i][1][0]).getMonth()];
			if ( trkmonth === daterange) {
				/* Dokładnie ten miesiąc */
				newmarker = new google.maps.Polyline({
					path: trk[i][0],
					geodesic: true,
					strokeColor: color,
					strokeOpacity: strokes.opacity.animation,
					strokeWeight: strokes.weight.animation,
					label: i
				});

				idm = marker.length;
				marker.push(newmarker);
				marker[idm].setMap(map);

			} else if ( trkmonth === prevrange || trkmonth === nextrange ) {
				/* Sąsiedztwo wskazanego miesiąca */
				newmarker = new google.maps.Polyline({
					path: trk[i][0],
					geodesic: true,
					strokeColor: color,
					strokeOpacity: strokes.opacity.anNeighbor,
					strokeWeight: strokes.weight.anNeighbor,
					label: i
				});


				idm = marker.length;
				marker.push(newmarker);
				marker[idm].setMap(map);
			}

		}	else {
			/* Tryb domyślny pokazujący wszystkie trasy */
			/* Ustalanie koloru linii dla wybranego zakresu */
			var color;
			switch (range) {
				case 0: color = strokes.color.year[(new Date(trk[i][1][0]).getFullYear()-2010)];
					break;
				case 1: color = strokes.color.month[new Date(trk[i][1][0]).getMonth()];
					break;
				case 2: color = strokes.color.hour[new Date(trk[i][1][0]).getHours()];
					break;
				case 3: color = strokes.color.day[new Date(trk[i][1][0]).getDay()];
					break;

				default: color = '#000';
			}

			marker[i] = new google.maps.Polyline({
				path: trk[i][0],
				geodesic: true,
				strokeColor: color,
				strokeOpacity: strokes.opacity.default,
				strokeWeight: strokeStyle,
				label: i
			});

			marker[i].setMap(map);
		}


		/* Jeżeli włączono tryb szukania */
		if (finder) {
			marker[i].addListener('click', pickPolyline);
		}
	}

	/* Zmniejszenie licznika obecnie wywoływanych funkcji przeładowywania mapy */
	changing--;
}

finder = false;
function findMap() {
	/* Sprawdzenie czy mapa została załadowana */
	if (map === 'start') {
		mapLoad();
	}

	/* Przerwanie obecnych animacji */
	mapAnimationStop();

	/* Wyłączenie i włączenie lokalizacji na mapie */
	if (finder) {
		strokeStyle = strokes.weight.default;
		for (var i = 0, imax = marker.length ; i < imax ; i+=1)	{
				google.maps.event.clearListeners(marker[i], 'click');
		}
		$('li').removeClass('chosen');
		finder = false;
		changeMap();
	} else {
		strokeStyle = strokes.weight.finder;
		finder = true;
		changeMap();
	}
}

function pickPolyline() {
	var id = $('#track'+$(this)[0].label), y;

	/* Oznaczenie wybranej trasy */
	$('li').removeClass('chosen');
	id.addClass('chosen');

	/* Otwieranie zakładki z trasami jeśli jest ona zamknięta */
	if (!$('.remapp').hasClass('show'))	{
		$('.remapp, header').addClass('show');
	}
	if (!$('.tracks').hasClass('show'))	{
		$('.panel').removeClass('show');
		$('.tracks').addClass('show');
	}

	/* Animacja przewijania */
	y = id.position().top;
	$('.scroll').animate({ scrollTop: y }, 400);
}

/* Animacja według daty */
var anMap, anLast = '';
function mapAnimation(datetype) {
	/* Sprawdzenie czy mapa została załadowana */
	if (map === 'start') {
		mapLoad();
	}

	/* Przerwanie obecnych animacji */
	mapAnimationStop();

	/* Wyłąaczanie trybu lokalizacji */
	if (finder === true){
		findMap();
	}

	/* Pobieranie czasu animacji */
	var anTime = Number($('#antime').val());
	anLast = datetype;

	if (datetype === 'm'){
		var i = 0;

		/* Wybranie zakresu animacji i mapy */
		changeRange(1, i);
		changeMap('m', i);

		anMap = setInterval( function() {
			i++;
			if (i === 12) {
				i = 0;
			}

			changeRange('animation', i);
			changeMap('m', i);
		}, anTime);
	}
}

/* Zatrztrzymaie animacji */
function mapAnimationStop() {
	clearInterval(anMap);
}
