$("#add-tracks").on('change', function (e) {
	$(this).prop('disabled', true );
	
	/* Upload progress */
    $('#status-tracks').empty().show().append('ładowanie...');
	
    var statusUpdateRate = scieski.default.upload.update,
		processedAtOnce = scieski.default.upload.simultaneously,
		disabledCount = processedAtOnce;
	
    var files = this.files,
		filesNumber = this.files.length,
		filesProcessed = 0;
	
	/* Methods */	
	var createPoint = scieski.method.upload.createPoint,
		calculateDistance = scieski.method.upload.calculateDistance,
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
				$('#status-tracks').empty().hide();
            	$tracks.prepend(newHTML); 
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
					
					var distance = 0;
					var testdistance = 0;
                    
                	if (format === 'gpx') {
                        $(xmldata).find('trkpt').each( function () {						
							var formatPoint = createPoint( $(this).attr('lat'),  $(this).attr('lon')	);
							var formatTime = $(this).find('time').text().slice(0,-1);

                            points.push( formatPoint );
                            times.push( formatTime );
                        });
						
						distance = calculateDistance(points);
						
                    } else if (format === 'tcx') {
                        $(xmldata).find('Trackpoint').each( function () {
							var formatPoint = createPoint( $(this).find('LatitudeDegrees').text(), $(this).find('LongitudeDegrees').text() );
							var formatTime = $(this).find('Time').text().slice(0,-1);

                            points.push( formatPoint );
                            times.push( formatTime );
                        });
						
						$(xmldata).find('Lap > DistanceMeters').each( function () {
							addToTotalDistance = (Number( $(this).text() ) / 1000); //in km
							distance += addToTotalDistance;
                        });
						
						testdistance = calculateDistance(points);
                    }

                
					/* Adding track */
					var id = index+baseID;

					scieski.tracks[id] = { 
						id: id,
						name: title,
						type: '',
						points: points,
						times: times,
						date: {
							start: times[0]
						},
						distance: distance, 
						duration: 0,
						hidden: false
					};

					newHTML += '<li class="track" id="track'+id+'" data-id="'+id+'" data-distance="'+distance+'"><h3>'+title+'</h3><p><strong>'+showDistance(distance)+'</strong></p></li>';                     
				}
			}
            
			if (index % statusUpdateRate === 0) {
				var progress = parseFloat(((filesProcessed)/filesNumber)*100).toFixed(1);
				$('#status-tracks').empty().append(progress+'%');
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