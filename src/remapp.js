trkpath = [], trk = [];

/* Aktualizowanie ścieżek do przetwarzanych tras z input[file] */
$("#add-tracks").change( function () {
	var tracks = $('#tracks');

	for (var i = 0, imax = this.files.length ; i < imax ; i+=1) {
		var trkid = trkpath.length;
		trkpath.push(this.files[i].name);
		$('#status-tracks').empty().append('<i class="flaticon-wait"></i> ładowanie...');
		tracks.prepend('<li id="track'+trkid+'"><h5>'+trkid+' : '+trkpath[trkid]+'</h5><i class="flaticon-pin2"></i> </li>');
		getPoints(trkid,trkpath[trkid],this.files[i]);
		}

});

function del(id) {
	trk.splice(id, 1);
	trkpath.splice(id, 1);
	$('#track'+id).remove();
}

var range = 3;
function changeRange() {
	$('.range').empty();
		if (range === 0) {
			range = 1;
			for (var i = 0 ; i<12 ; i+=1){
				$('.range').append('<div style="background-color:'+colors.month[i]+';">'+colors.monthName[i]+'</div>');
			}
		} else if (range === 1) {
			range = 2;
			for (var i = 0 ; i<24 ; i+=2){
				$('.range').append('<div style="background-color:'+colors.hour[i]+';">'+i+':00</div>');
			}
		} else if (range === 2) {
			range = 3;
			for (var i = 1 ; i<7 ; i+=1){
				$('.range').append('<div style="background-color:'+colors.day[i]+';">'+colors.dayName[i]+'</div>');
			}
			/* Dodatkowa linijka przenosząca niedziele na koniec listy */
			$('.range').append('<div style="background-color:'+colors.day[0]+';">'+colors.dayName[0]+'</div>');
		} else {
			range = 0;
			for (var i = 1 ; i<7 ; i+=1){
				$('.range').append('<div style="background-color:'+colors.year[i]+';">'+(i+2010)+'</div>');
			}
		}
		if (map !== 'start') {
			changeMap();
		} else if (trk[0]) {
			mapLoad();
			changeMap();
		}
}

function filesStatus() {
	if ($('li').length == $('li.complete').length) {
		$('#status-tracks').empty();
	}
}

/* Przetwarzanie trasy GPS */
var Point = function(longitude, latitude, time) {
	this.ptlocation = {lat: Number(latitude), lng: Number(longitude)};
	this.time = time;
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
					$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkdate.getFullYear()+' '+(trkdate.getMonth()+1)+' '+trkdate.getDate()+'<button onclick="del('+id+')"><i class="flaticon-remove"></i></button></button>');
					filesStatus();
		}
	} else if (title.slice(-4) === '.tcx') {
		reader.readAsText(data);

		reader.onloadend = function() {
		var xmldata = $(reader.result);
		$(xmldata).find('Trackpoint').each( function () {
				trkpt.push(new Point(
					$(this).find('LongitudeDegrees').text(),
					$(this).find('LatitudeDegrees').text(),
					$(this).find('Time').text().slice(0,-1)));
					}	);

					trk[id] = trkpt;
					$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkpt[0].time.split('T').pop()+' - '+trkpt[(trkpt.length-1)].time.split('T').pop()+'<button onclick="del('+id+')"><i class="flaticon-remove"></i></button>');
					filesStatus();
		}
	} else {
		$('#track'+id).addClass('complete').append('Zły format pliku. <button onclick="del('+id+')"><i class="flaticon-remove"></i></button>');
		filesStatus();
	}
}

$(document).ready(function(){

	$('#tr').click(function() {
		$('.options #tr').parent().toggleClass('selected');
	});

	$('#mp').click(function() {
		mapLoad();
		$('.options').removeClass('selected');
	});

	changeRange()

});
