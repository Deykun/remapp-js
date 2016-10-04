trkpath = [], trk = [];

/* Aktualizowanie ścieżek do przetwarzanych tras z input[file] */
$("#add-tracks").change( function () {
	var tracks = $('#tracks');

	for (var i = 0, imax = this.files.length ; i < imax ; i+=1) {
		var trkid = trkpath.length;
		trkpath.push(this.files[i].name);
		tracks.prepend('<li id="track'+trkid+'"><h5>'+trkid+' : '+trkpath[trkid]+'</h5></li>');
		getPoints(trkid,trkpath[trkid],this.files[i]);
		}
		$('#status-tracks').empty().append('ładowanie...');

});

function del(id) {
	trk.splice(id, 1);
	trkpath.splice(id, 1);
	$('#track'+id).remove();
}

var range = 0;
function changeRange() {
		if (range === 0) {
			range = 1;
		} else if (range === 1) {
			range = 2;
		} else {
			range = 0;
		}
}

function status() {
	if ($('li').length === $('li.complete').length) {
		$('#status-tracks').empty().append('Gotowe!');
	}
}

/* Przetwarzanie trasy GPS */
var Point = function(longitude, latitude, time) {
	this.lon = longitude; // np. 50.04355 | x
	this.lat = latitude; // np. 19.946976 | y
	this.time = time; // np. 2016-09-30T11:13:32Z
}


/* Pobieranie danych o lokalizacji GPS z tras .gpx i .tcx */
function getPoints(id, title, data)	{
	var reader = new FileReader();
	var trkpt = [];

	if (title.slice(-4) === '.gpx') {
		reader.readAsText(data);

		reader.onloadend = function() {
		var xmldata = $(reader.result);
		$(xmldata).find('trkpt').each( function () {
				trkpt.push(new Point(
					$(this).attr('lon'),
					$(this).attr('lat'),
					$(this).find('time').text().slice(0,-1)));
					}	);

					trk[id] = trkpt;
					var trkdate = new Date(trkpt[0].time);
					$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkdate.getFullYear()+' '+(trkdate.getMonth()+1)+' '+trkdate.getDate()+'<button onclick="del('+id+')">Usuń</button>');
					status();
		}
	} else if (title.slice(-4) === '.tcx') {
		reader.readAsText(data);

		reader.onloadend = function() {
		var xmldata = $(reader.result);
		$(xmldata).find('Trackpoint').each( function () {
				trkpt.push(new Point(
					$(this).find('LongitudeDegrees').text(),
					$(this).find('LatitudeDegrees').text(),
					$(this).find('Time').text()));
					}	);

					trk[id] = trkpt;
					$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkpt[0].time.split('T').pop()+' - '+trkpt[(trkpt.length-1)].time.split('T').pop()+'<button onclick="del('+id+')">Usuń</button>');
					status();
		}
	} else {
		console.log('zły format');
		$('#track'+id).addClass('complete').append('Zły format pliku. <button onclick="del('+id+')">Usuń</button>');
		status();
	}
}

	/* Generowanie mapy po wybraniu przycisku */
	function initMap() {
		var center = {lat: Number(trk[0][0].lat), lng: Number(trk[0][0].lon)};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: center,
			styles: mapstyle
		});

		var marker = [], polyline = [];
		for (var i = 0, imax = trk.length ; i < imax ; i+=1) {
			polyline = [];

			var color;

			if (range === 0) {
				var trkdate = new Date(trk[i][0].time).getFullYear();
				/* Kolor w zależności od roku */
				switch (trkdate) {
					case 2010: color = '#6c43b4';
						break;
					case 2011: color = '#2a93e9';
						break;
					case 2012: color = '#12bcd1';
						break;
					case 2013: color = '#179d90';
						break;
					case 2014: color = '#52ac57';
						break;
					case 2015: color = '#8abd51';
						break;
					case 2016: color = '#c4d33e';
						break;
					default:
						color = '#000';
				}
			} else if (range === 1) {
				var trkdate = new Date(trk[i][0].time).getMonth();
				/* Kolor w zależności od miesiąca */
				switch (trkdate) {
					case 0: color = '#6c43b4';
						break;
					case 1: color = '#2a93e9';
						break;
					case 2: color = '#12bcd1';
						break;
					case 3: color = '#179d90';
						break;
					case 4: color = '#52ac57';
						break;
					case 5: color = '#8abd51';
						break;
					case 6: color = '#c4d33e';
						break;
					case 7: color = '#f4ba10';
						break;
					case 8: color = '#f4960f';
						break;
					case 9: color = '#f15b2a';
						break;
					case 10: color = '#e03b38';
						break;
					case 11: color = '#9d33b0';
						break;
					default:
				 		color = '#000';
				}
			} else if (range === 2) {
				var trkdate = new Date(trk[i][0].time).getHours();
				/* Kolor w zależności od godziny */
				switch (trkdate) {
					case 0:	case 1: color = '#6c43b4';
						break;
					case 2: case 3: color = '#2a93e9';
						break;
					case 4: case 5: color = '#12bcd1';
						break;
					case 6: case 7: color = '#179d90';
						break;
					case 8: case 9: color = '#52ac57';
						break;
					case 10: case 11: color = '#8abd51';
						break;
					case 12: case 13: color = '#c4d33e';
						break;
					case 14: case 15: color = '#f4ba10';
						break;
					case 16: case 17: color = '#f4960f';
						break;
					case 18: case 19: color = '#f15b2a';
						break;
					case 20: case 21: color = '#e03b38';
						break;
					case 22: case 23: color = '#9d33b0';
						break;
					default:
				 		color = '#000';
				}
			}

			for (var j = 0, jmax = trk[i].length ; j < jmax ; j+=1) {
			polyline.push({lat: Number(trk[i][j].lat), lng: Number(trk[i][j].lon)});
			}
			marker[i] = new google.maps.Polyline({
				path: polyline,
				geodesic: true,
				strokeColor: color,
				strokeOpacity: 0.9,
				strokeWeight: 1,
				label: 'ID:'+i
			});

			marker[i].setMap(map);
		}
	}

$(document).ready(function(){

	$('#op').click(function() {
		$('.tracks').toggle();
		$('.options').toggleClass('selected');

	 });

});
