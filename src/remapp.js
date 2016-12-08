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
var range = 'h', legend = 'start';
function changeRange(chrange, selected) {

	/* Przerwanie animacji jeśli była włączona, a zmiana legendy nie wynika z jej działania */
	if (chrange !== 'animation') {
	mapAnimationStop();
	}

	/* Zmiana zakresu legendy */
	if (chrange !== 'animation') {

		/* Jeżeli zakres ma zostać zmieniony na kolejny */
		if (chrange === 'auto') {
			switch (range) {
				case 'y':	chrange = 'm';
					break;
				case 'm':	chrange = 'd';
					break;
				case 'd':	chrange = 'h';
					break;
				case 'h':	chrange = 'y';
					break;
			}
		}

		/* Sprawdzenie czy nowy zakres nie jest taki sam jak już ustawiony */
		if (chrange !== range) {
			range = chrange;
			$range = $('.range');
			$range.empty();

			switch (chrange) {
				case 'y':
					for (var i = 1 ; i<7 ; i+=1){
						$range.append('<div style="background-color:'+strokes.color.year[i]+';">'+(i+2010)+'</div>');
					}
					break;
				case 'm':
					for (var i = 0 ; i<12 ; i+=1){
						$range.append('<div style="background-color:'+strokes.color.month[i]+';">'+strokes.color.monthName[i]+'</div>');
					}
					break;
				case 'd':
					for (var i = 1 ; i<7 ; i+=1){
						$range.append('<div style="background-color:'+strokes.color.day[i]+';">'+strokes.color.dayName[i]+'</div>');
					}
					$range.append('<div style="background-color:'+strokes.color.day[0]+';">'+strokes.color.dayName[0]+'</div>');
					break;
				case 'h':
					for (var i = 0 ; i<24 ; i+=2){
						$range.append('<div style="background-color:'+strokes.color.hour[i]+';">'+i+':00</div>');
					}
					break;
			}
		}
	}

	/* Sprawdzenie czy mapa została załadowana i ewentualne jej załadowanie */
	if (legend !== 'start') {
		if (map === 'start') {
			mapLoad();
		}
		changeMap();
	}
	/* Zapobiegniecie niepotrzebnemu wywołaniu mapy przy pierwszym wyświetleniu mapy */
	legend = 'started';

	/* Wybranie elementu z wybranego zakresu */
	if (selected !== 'all') {
		$('.range div').removeClass('selected');
		$('.range div:nth-child('+(selected+1)+')').addClass('selected');
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
			$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkdate.getFullYear()+' '+(trkdate.getMonth()+1)+' '+trkdate.getDate()+'<section class="trackmenu"><button onclick="del('+id+')"><i class="flaticon-remove"></i></button></section>');
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
			$('#track'+id).addClass('complete').append(trkpt.length+'pkt | '+trkdate.getFullYear()+' '+(trkdate.getMonth()+1)+' '+trkdate.getDate()+'<section class="trackmenu"><button onclick="del('+id+')"><i class="flaticon-remove"></i></button></section>');
			filesStatus();
		}
	} else {
		$('#track'+id).addClass('complete').append('Zły format pliku. <button onclick="del('+id+')"><i class="flaticon-remove"></i></button>');
		filesStatus();
	}
}

/* Dodawanie opcji w zakładce legendy */
function legendMenu() {
	var list = '';
	for (var i = 0; i < 12 ; i++)	{
		list += '<option value="'+i+'">'+strokes.color.monthName[i]+'</option>';
	}
	$('select[name="m"]').append(list);

	list = '';
	for (var i = 1; i < 7 ; i++)	{
		list += '<option value="'+ (i-1) +'">'+strokes.color.dayName[i]+'</option>';
	}
	list += '<option value="6">'+strokes.color.dayName[0]+'</option>';
	$('select[name="d"]').append(list);
}
legendMenu();

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

	/* Wyświetlanie wybranego miesiąca */
	$('select[name="m"], select[name="d"]').change( function () {
		var selectedrange = $(this).attr('name');
		var selected = Number($(this).val());
		changeRange(selectedrange, selected);
		changeMap(selectedrange, selected);
	})

	/* Zmiana prędkości animacji */
	$("#antime").change( function () {
		mapAnimationStop();
		if (anLast !== '') {
			mapAnimation( anLast );
		}
	});

	changeRange('auto', 'all');
});
