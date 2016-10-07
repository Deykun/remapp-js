/* Generowanie mapy */
map = 'start';
function mapLoad() {
	if (map === 'start') {
		var center, zoom;
		if (trk[0]) {
			center = trk[0][0].ptlocation;
			zoom = 13;
		} else {
			center = {lat: 52.03, lng: 19.27};
			zoom = 6;
		}
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: zoom,
			center: center,
			styles: mapstyle
		});
	}
	changeMap();
}

marker = [], polyline = [];
function changeMap() {
	/* Usuwa obecne na mapie markery */
	for (var i = 0, imax = marker.length ; i < imax ; i+=1)	{
		marker[i].setMap(null);
	}

	/* Ustawia nowe markery na mapie */
	for (var i = 0, imax = trk.length ; i < imax ; i+=1) {
		polyline = [];

		/* Ustalanie koloru linii dla wybranego zakresu*/
		var color;
		switch (range) {
			case 0: color = colors.year[(new Date(trk[i][0].time).getFullYear()-2010)];
				break;
			case 1: color = colors.month[new Date(trk[i][0].time).getMonth()];
				break;
			case 2: color = colors.hour[new Date(trk[i][0].time).getHours()];
				break;
			case 3: color = colors.day[new Date(trk[i][0].time).getDay()];
				break;

			default: color = '#000';
		}

		for (var j = 0, jmax = trk[i].length ; j < jmax ; j+=1) {
		polyline.push(trk[i][j].ptlocation);
		}
		marker[i] = new google.maps.Polyline({
			path: polyline,
			geodesic: true,
			strokeColor: color,
			strokeOpacity: 0.8,
			strokeWeight: 1,
			label: 'ID:'+i
		});

		marker[i].setMap(map);
	}
}
