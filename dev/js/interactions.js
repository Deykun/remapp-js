$('#add-tracks').on('change', function(e) {
	$(this).prop('disabled', true );
	
	/* Upload progress */
	var $statusTracks = $('#status-tracks');
	var $statusProgressbar = $('#status-progressbar');
    $statusTracks.empty().show().append('ładowanie...');
	$statusProgressbar.show();
	$statusProgressbar.attr('data-procent', '0%');
	
	
    var statusUpdateRate = scieski.default.upload.update,
		processedAtOnce = scieski.default.upload.simultaneously,
		disabledCount = processedAtOnce;
	
    var files = this.files,
		filesNumber = this.files.length,
		filesProcessed = 0;
	
	/* Methods */	
	var createPoint = scieski.method.tracks.upload.createPoint,
		calculateDistance = scieski.method.tracks.upload.calculateDistance,
		showDistance = scieski.method.show.distance;
	
	console.info('Adding '+ filesNumber +' files...');
	if (scieski.default.dev.perfomence) {
		var startTime = performance.now();
	}
    
    /* List of tracks */
	var $tracks = $('#tracks');
    var newHTML = '';

    var allowedFormats = ['gpx','tcx'];
	var baseID = scieski.tracks.length;
    
    function readFile(index) {
        if( index >= filesNumber ) {

			if (disabledCount == 1){
				if (scieski.default.dev.perfomence) {
					var endTime = performance.now();
					console.info('Files added in ' + (Math.round((endTime - startTime) * 100) / 100) + 'ms.');
				} else {
					console.info('Files added.');
				}
				
				$statusProgressbar.css('width', 0).hide();
				$statusProgressbar.attr('data-procent', '');
				$statusTracks.empty().hide();
            	$tracks.prepend(newHTML); 
				
				scieski.method.tracks.basicStatistics();
				
				$("#add-tracks").prop('disabled', false );
			} else {
				disabledCount--;
			}
			
            return;
        }
        
        var file = files[index];
        var title = files[index].name;
        var format = title.substr(title.lastIndexOf('.') + 1);
        
        var reader = new FileReader();

        reader.onload = function(e) {
            var points = [],
                times = [];
            
            if ( allowedFormats.indexOf(format) > -1 ) {
                
                reader.onloadend = function() {
                    var xmldata = $(reader.result);
					
					var distance = 0,
						testdistance = 0,
						type = '';
                    
                	if (format === 'gpx') {
                        $(xmldata).find('trkpt').each( function () {						
							var formatPoint = createPoint($(this).attr('lat'), //latitude
                                                          $(this).attr('lon'), //longitude 
                                                          $(this).find('ele').text(), //altitude
                                                          $(this).find('time').text() ); //time

                            points.push( formatPoint );
                        });
						
						distance = calculateDistance(points);
						type = $(xmldata).find('type').text().toLowerCase();
						
                    } else if (format === 'tcx') {
                        $(xmldata).find('Trackpoint').each( function () {
							var formatPoint = createPoint($(this).find('LatitudeDegrees').text(), //latitude
                                                          $(this).find('LongitudeDegrees').text(), //longitude
                                                          $(this).find('AltitudeMeters').text(), //altitude
                                                          $(this).find('Time').text() ); //time
                    
                            points.push( formatPoint );
                        });
						
						$(xmldata).find('Lap > DistanceMeters').each( function () {
							var tcxFileDistance = (Number( $(this).text() ) / 1000); //in km
							distance += tcxFileDistance;
                        });
						
						type = ($(xmldata).find('Activity').attr('Sport')).toLowerCase();
                    }

                
					/* Adding track */
					var id = index+baseID;
					var startTimeInSeconds = Math.round(new Date( points[0].time ) / 1000);
                    
                    var midPoint = Math.floor(points.length / 2);
                    var endPoint = points.length - 1;
                    
					scieski.tracks[id] = { 
						id: id, 
						name: title,
						type: type,
						points: points, 
						date: {
							start: points[0].time,
                            middle: points[ midPoint ].time, 
                            end: points[ endPoint ].time 
						},
						distance: distance, 
						duration: 0,
						hidden: false
					};

					newHTML += '<li class="track" id="track'+id+'" data-id="'+id+'" data-distance="'+distance+'" data-start-time="'+startTimeInSeconds+'"><h3>'+title+'</h3><p><strong>'+showDistance(distance)+' - '+type+'</strong></p></li>';                     
				}
			}
            
			if (index % statusUpdateRate === 0) {
				var progress = parseFloat(((filesProcessed)/filesNumber)*100).toFixed(1);
				$statusProgressbar.css('width', progress+'%');
				$statusProgressbar.attr('data-procent', progress+'%');
				$tracks.prepend(newHTML); 
				newHTML = '';
			}

			/* Read next file */
			filesProcessed++;
			setTimeout(function (e) { readFile(index+processedAtOnce) }, 5);
		} 
		reader.readAsText(file);
	}

	for (var i = processedAtOnce-1 ; i >= 0 ; i--) { 
		readFile(i);	
	}
});

$('[data-action]').on('click', function(e) {
	$this = $(this);
	
	var action = $this.attr('data-action');
	
	switch(action) {   
		case 'dev': {
			var type = $this.attr('data-a-type');
			scieski.method.dev(type);
			break;
		}   
		case 'map': {
			scieski.method.gmaps.addMap({});
			break;
		}
		case 'sort': {
			var sortOrder = $this.attr('data-a-sortorder');
			scieski.method.tracks.sort(sortOrder);
			break;
		}
		default: {
			console.warn('Nieznana akcja.');
			return;
		}
	}
});

$('[data-switch]').on('change', function(e) { 
	$this = $(this);
	
	var action = $this.attr('data-switch');
	
	switch(action) {   
		case 'config': {
			var type = $this.attr('data-s-type');
			
			switch(type) {   
				case 'maptype': {
					var maptype = $this.val();
					scieski.method.config.change.mapType(maptype);
					
					break;
				}   
				default: {
					console.warn('Nieznana akcja.');
					return;
				}
			}
			break;
		}
		default: {
			console.warn('Nieznana akcja.');
			return;
		}
	}
})