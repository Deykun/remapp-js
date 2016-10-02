trkpath = [], trk = [];

/* Aktualizowanie ścieżek do przetwarzanych tras z input[file] */
$("#add-tracks").change( function () {
	var tracks = $('#tracks');
	for (var i = 0, imax = this.files.length ; i < imax ; i+=1) {
		trkpath[i] = this.files[i].name;
		tracks.prepend('<li id="track'+i+'"><h5>'+this.files[i].name+'</h5></li>');
		getPoints(i, 'tracks\\'+this.files[i].name);
	}
});

/* Przetwarzanie trasy GPS */
var Point = function(longitude, latitude, time) {
	this.lon = longitude; // np. 50.04355 | x
	this.lat = latitude; // np. 9.946976 | y
	this.time = time; // np. 2016-09-30T11:13:32Z
}


/* Pobieranie danych o lokalizacji GPS z tras .gpx i .tcx */
function getPoints(id, trackpath)	{
	$.ajax({
		url: trackpath,
		type: 'get',
    dataType: 'xml',
		success: function (data) {
			var trkpt = [];

			if (trackpath.slice(-4) === '.gpx') {
				$(data).find('trkpt').each( function () {
						trkpt.push(new Point(
							$(this).attr('lon'),
							$(this).attr('lat'),
							$(this).find('time').text()));
					}	);
			} else if (trackpath.slice(-4) === '.tcx') {
				$(data).find('Trackpoint').each( function () {
						trkpt.push(new Point(
							$(this).find('LongitudeDegrees').text(),
							$(this).find('LatitudeDegrees').text(),
							$(this).find('Time').text()));
					}	);
			}
			trk[id] = trkpt;
			$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkpt[0].time.split('T').pop()+' - '+trkpt[(trkpt.length-1)].time.split('T').pop());
		}
	});
}

	function initMap() {
		var myLatLng = {lat: Number(trk[0][0].lat), lng: Number(trk[0][0].lon)};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: myLatLng
		});

		var marker = [];
		for (var i = 0, imax = trk.length ; i < imax ; i+=1) {
			myLatLng = {lat: Number(trk[i][0].lat), lng: Number(trk[i][0].lon)};

			marker[i] = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Hello World!'
			});
		}
		}

$(document).ready(function(){


});
