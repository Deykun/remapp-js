/* Generowanie mapy */
mapbox = [[],[],[],[]];
map = 'start';
function mapLoad(box, col, row) {
	var center, zoom;
	if (trk[0]) {
		center = trk[0][0][0];
		zoom = 13;
	} else {
		center = {lat: 52.03, lng: 19.27};
		zoom = 6;
	}

	/* Mapa główna */
	if (box === 'cp') {
		mapbox[col][row] = new google.maps.Map(document.getElementById('cpb-'+col+'-'+row), {
			zoom: 11,
			center: center,
			disableDefaultUI: true,
			styles: mapStyle
		});
		markers[col+'-'+row] = [col+'-'+row];
		changeMap(col+'-'+row);
	} else {
		if (map === 'start') {
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: zoom,
				center: center,
				mapTypeControl: false,
				styles: mapStyle
			});
		}
		markers['map'] = ['map'];
		changeMap('map');
	}
}

/* Funkcja odpowiedzialna za zmiane mapy */
markers = [], marker = [], polyline = [];
function changeMap(mapid, datetype, daterange) {
	var chmap = map;
	marker = markers[mapid];
	/* Jeżeli zmieniana będzie mapa z kompozycji */
	if (mapid !== 'map') {
		chmap = mapbox[mapid.split('-')[0]][mapid.split('-')[1]];
	}

	/* Usuwa obecne na mapie markery */
	for (var i = 1, imax = marker.length ; i < imax ; i+=1)	{
		marker[i].setMap(null);
	}
	marker = [mapid];

	/* Ustawia nowe markery na mapie */
	for (var i = 0, newmarker, imax = trk.length ; i < imax ; i+=1) {
		if (daterange !== 'all' && (datetype === 'm' || datetype === 'd')) {
			/* Ustalenie sąsiadujących miesięcy */
			var prevrange = daterange-1;
			var nextrange = daterange+1;

			switch (datetype) {
				case 'm':
					trkrange = Number(new Date(trk[i][1][0]).getMonth());
					color = strokes.color.month[new Date(trk[i][1][0]).getMonth()];
					switch (daterange) {
						case 0: prevrange = 11;
							break;
						case 11: nextrange = 0;
							break;
					}
					break;
				case 'd':
					trkrange = Number(new Date(trk[i][1][0]).getDay());
					color = strokes.color.month[new Date(trk[i][1][0]).getDay()];
					switch (daterange) {
						case 0: prevrange = 6;
							break;
						case 6: nextrange = 0;
							break;
					}
					break;
			}

			if ( trkrange === daterange ) {
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
				marker[idm].setMap(chmap);

				/* Jeżeli włączono tryb szukania */
				if (finder) {
					marker[idm].addListener('click', pickPolyline);
				}
			} else if ( trkrange === prevrange || trkrange === nextrange ) {
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
				marker[idm].setMap(chmap);

				/* Jeżeli włączono tryb szukania */
				if (finder) {
					marker[idm].addListener('click', pickPolyline);
				}
			}
		}	else {
			/* Tryb domyślny pokazujący wszystkie trasy */
			/* Ustalanie koloru linii dla wybranego zakresu */
			var color;
			switch (range) {
				case 'y': color = strokes.color.year[(new Date(trk[i][1][0]).getFullYear()-2010)];
					break;
				case 'm': color = strokes.color.month[new Date(trk[i][1][0]).getMonth()];
					break;
				case 'd': color = strokes.color.day[new Date(trk[i][1][0]).getDay()];
					break;
				case 'h': color = strokes.color.hour[new Date(trk[i][1][0]).getHours()];
					break;
				default: color = '#000';
			}

			newmarker = new google.maps.Polyline({
				path: trk[i][0],
				geodesic: true,
				strokeColor: color,
				strokeOpacity: strokes.opacity.default,
				strokeWeight: strokeStyle,
				label: i
			});

			idm = marker.length;
			marker.push(newmarker);
			marker[idm].setMap(chmap);
		}

		/* Jeżeli włączono tryb szukania */
		if (finder) {
			marker[idm].addListener('click', pickPolyline);
		}
	}

	/* Zapisanie markerków mapy w tablicy */
	markers[mapid] = marker;
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
		changeMap('map');
	} else {
		strokeStyle = strokes.weight.finder;
		finder = true;
		changeMap('map');
	}
}

function pickPolyline() {
	var id = $('#track'+$(this)[0].label), y;

	/* Oznaczenie wybranej trasy */
	$('li').removeClass('chosen');
	id.addClass('chosen');

	/* Otwieranie zakładki z trasami jeśli jest ona zamknięta */
	if (!$('.menu').hasClass('show'))	{
		$('.menu, header').addClass('show');
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

	if (datetype === 'm' || datetype === 'd'){
		var i = 0, imax = 0;
		switch (datetype) {
			case 'm': imax = 12;
				break;
			case 'd': imax = 7;
				break;
		}
		/* Wybranie zakresu animacji i mapy */
		changeRange(datetype, i);
		changeMap('map', datetype, i);

		anMap = setInterval( function() {
			i++;
			if (i === imax) {
				i = 0;
			}

			changeRange('animation', i);
			changeMap('map', datetype, i);
		}, anTime);
	}
}

/* Zatrztrzymaie animacji */
function mapAnimationStop() {
	clearInterval(anMap);
}
