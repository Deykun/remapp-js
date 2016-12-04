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

/* Funkcja odpwiedzialna za zmiane legendy mapy */
var range = 3;
function changeRange(chrange) {
	if (chrange !== 'auto') {
		if (chrange !== 3) {
			range = chrange-1;
		} else {
			range = 0;
		}
	}
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

/* Status ładowanych plików */
function filesStatus() {
	if ($('li').length == $('li.complete').length) {
		$('#status-tracks').empty();
	}
}

/* Przetwarzanie punktu GPS w formacie wymaganym przez Google Maps */
var Point = function (longitude, latitude) {
	return {lat: Number(latitude), lng: Number(longitude)};
}


/* Pobieranie danych o lokalizacji GPS z tras .gpx i .tcx */
function getPoints(id, title, data)	{
	var reader = new FileReader();
	var trkpt = [], trktime = [];

	if (title.slice(-4) === '.gpx') {
		reader.readAsText(data);

		reader.onloadend = function() {
			var xmldata = $(reader.result);

			$(xmldata).find('trkpt').each( function () {
				trkpt.push( new Point( $(this).attr('lon'),	$(this).attr('lat')	) )
				trktime.push( $(this).find('time').text().slice(0,-1) );
			}	);

			trk[id] = [trkpt, trktime];

			var trkdate = new Date(trk[id][1][0]);
			$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkdate.getFullYear()+' '+(trkdate.getMonth()+1)+' '+trkdate.getDate()+'<section class="trackmenu"><button><i class="flaticon-eye"></i></button> <button onclick="del('+id+')"><i class="flaticon-remove"></i></button></section>');
			filesStatus();
		}
	} else if (title.slice(-4) === '.tcx') {
		reader.readAsText(data);

		reader.onloadend = function() {
			var xmldata = $(reader.result);
			$(xmldata).find('Trackpoint').each( function () {
				trkpt.push( new Point( $(this).find('LongitudeDegrees').text(),	$(this).find('LatitudeDegrees').text() ) )
				trktime.push( $(this).find('Time').text().slice(0,-1) );
			}	);

			trk[id] = [trkpt, trktime];

			var trkdate = new Date(trk[id][1][0]);
			$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkdate.getFullYear()+' '+(trkdate.getMonth()+1)+' '+trkdate.getDate()+'<section class="trackmenu"><button><i class="flaticon-eye"></i></button> <button onclick="del('+id+')"><i class="flaticon-remove"></i></button></section>');
			filesStatus();
		}
	} else {
		$('#track'+id).addClass('complete').append('Zły format pliku. <button onclick="del('+id+')"><i class="flaticon-remove"></i></button>');
		filesStatus();
	}
}

$(document).ready(function(){

	/* Wysuniecie menu */
	$('header').click( function() {
		$('.remapp, header').toggleClass('show'); });

	/* Ukrycie wiadomości powitalnej */
	$('.in').click( function() {
		$('.introduction').hide(); });

	/* Wysunięcie panelu tras */
	$('.tr').click( function() {
			$('.panel:not(.tracks)').removeClass('show');
			$('.tracks').toggleClass('show'); });

	/* Wysunięcie panelu legendy */
	$('.lg').click( function() {
			$('.panel:not(.legends)').removeClass('show');
			$('.legends').toggleClass('show'); });

	/* Wysunięcie panelu legendy */
	$('.an').click( function() {
			$('.panel:not(.animation)').removeClass('show');
			$('.animation').toggleClass('show'); });

	/* Odświeżenie mapy */
	$('.mp').click(	function() {
			mapLoad();
			$('.remapp, header').toggleClass('show'); });

	/* Wybieranie tras na mapie */
	$('.fm').click(	findMap );

	changeRange()

});
