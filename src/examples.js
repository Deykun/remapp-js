var examplesTracks = ['2014-04-04 318355564 Walking Endomondo.gpx', '2014-04-11 321810210 Walking Endomondo.gpx', '2014-04-13 322859853 Walking Endomondo.gpx', '2015-10-29 625038518 Walking Endomondo.gpx', '2015-11-02 626860069 Walking Endomondo.gpx', '2015-11-06 628785462 Walking Endomondo.gpx', '2015-11-08 629590117 Walking Endomondo.gpx', '2015-11-14 632429842 Walking Endomondo.gpx', '2015-11-19 634644105 Walking Endomondo.gpx', '2015-12-04 640209665 Walking Endomondo.gpx', '2015-12-19 645682289 Walking Endomondo.gpx', '2016-03-02 680799480 Walking Endomondo.gpx', '2016-03-11 685485952 Walking Endomondo.gpx', '2013-01-30 155238480 Walking Endomondo.gpx', '2013-02-13 158804610 Walking Endomondo.gpx', '2013-02-14 159071315 Walking Endomondo.gpx', '2013-02-15 159310979 Walking Endomondo.gpx', '2013-02-21 160990591 Walking Endomondo.gpx', '2013-03-05 164307286 Walking Endomondo.gpx', '2013-03-08 165189330 Walking Endomondo.gpx'];

$('.ex').click( function () {
	var tracks = $('#tracks');

	/* Usunięcie powitania */
	$('.introduction').remove();

	/* Otwarcie zakładki z trasami jeśli jest ona zamknięta*/
	if (!$('.tracks').hasClass('show'))	{
		$('.panel').removeClass('show');
		$('.tracks').addClass('show');
	}

	for (var i = 0, imax = examplesTracks.length ; i < imax ; i+=1) {
		var trkid = trkpath.length;
		trkpath.push(examplesTracks[i]);
		$('#status-tracks').empty().append('<i class="flaticon-wait"></i> ładowanie...');
		tracks.prepend('<li id="track'+trkid+'"><h5>'+trkid+' : '+trkpath[trkid]+'</h5><i class="flaticon-pin2"></i> </li>');

		$.ajax({
			id: trkid,
			url: 'przyklady\\'+examplesTracks[i],
			type: 'get',
			dataType: 'xml',
			success: function (data) {
				var trkpt = [], trktime = [];

				$(data).find('trkpt').each( function () {
					trkpt.push( new Point( $(this).attr('lon'),	$(this).attr('lat')	) )
					trktime.push( $(this).find('time').text().slice(0,-1) );
				}	);

				trk[this.id] = [trkpt, trktime];

				var trkdate = new Date(trk[this.id][1][0]);
				$('#track'+this.id).addClass('complete').append(trkpt.length+'pkt | '+trkdate.getFullYear()+' '+(trkdate.getMonth()+1)+' '+trkdate.getDate()+'<section class="trackmenu"><button><i class="flaticon-eye"></i></button> <button onclick="del('+this.id+')"><i class="flaticon-remove"></i></button></section>');
				filesStatus();
			}
		});
	}
});
