trkpath = [], trk = [];

/* Aktualizowanie ścieżek do przetwarzanych tras z input[file] */
$("#add-tracks").change( function () {
	var tracks = $('#tracks');

	for (var i = 0, imax = this.files.length ; i < imax ; i+=1) {
		var trkid = trkpath.length;
		trkpath.push(this.files[i].name);
		getPoints(trkid,trkpath[trkid],this.files[i]);
		tracks.prepend('<li id="track'+trkid+'"><h5>'+trkid+' : '+trkpath[trkid]+'</h5></li>');
		}

});

function del(id) {
	trk.splice(id, 1);
	trkpath.splice(id, 1);
	$('#track'+id).remove();
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
			reader.readAsText(data);
			reader.onloadend = function(){
					var xmldata = $(reader.result);

					var trkpt = [];
					if (title.slice(-4) === '.gpx') {
						$(xmldata).find('trkpt').each( function () {
								trkpt.push(new Point(
									$(this).attr('lon'),
									$(this).attr('lat'),
									$(this).find('time').text()));
							}	);
					} else if (title.slice(-4) === '.tcx') {
						$(xmldata).find('Trackpoint').each( function () {
								trkpt.push(new Point(
									$(this).find('LongitudeDegrees').text(),
									$(this).find('LatitudeDegrees').text(),
									$(this).find('Time').text()));
							}	);
					}
					trk[id] = trkpt;
					$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkpt[0].time.split('T').pop()+' - '+trkpt[(trkpt.length-1)].time.split('T').pop()+'<button onclick="del('+id+')">Usuń</button>');
				}
		}

	/* Generowanie mapy po wybraniu przycisku */
	function initMap() {
		var center = {lat: Number(trk[0][0].lat), lng: Number(trk[0][0].lon)};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: center
		});

		var marker = [], polyline = [];
		for (var i = 0, imax = trk.length ; i < imax ; i+=1) {
			polyline = [];
			var date = trk[i][0].time.slice(0,4);
			var color = '#FF0000';

			console.log(date);
			switch (date) {
				case '2013':
					color = '#63a375';
					break;
				case '2014':
					color = '#edd0af';
					break;
				case '2015':
					color = '#d57a66';
					break;
				case '2016':
					color = '#704c60';
					break;
			}
			for (var j = 0, jmax = trk[i].length ; j < jmax ; j+=1) {
			polyline.push({lat: Number(trk[i][j].lat), lng: Number(trk[i][j].lon)});
			}
			marker[i] = new google.maps.Polyline({
				path: polyline,
				geodesic: true,
				strokeColor: color,
				strokeOpacity: 1.0,
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
