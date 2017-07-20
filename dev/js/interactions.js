$("#add-tracks").on('change', function (e) {
    console.log('Dodanie pliku');
    files = this.files;
    filesNumber = this.files.length;
    
    /* List of tracks */
	var $tracks = $('#tracks');
    var newHTML = '';
    
    /* Upload progress */
    $('#status-tracks').empty().show().append('ładowanie...');
    var statusUpdateRate = scieski.default.upload.update;

    var allowedFormats = ['gpx','tcx'];
    
    /* Read only one file at time */
    function readFile(index) {
        if( index >= filesNumber ) {
            $('#status-tracks').empty().hide();
            $tracks.prepend(newHTML); 
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
                    
                	if (format === '.gpx') {
                        $(xmldata).find('trkpt').each( function () {
                            points.push( new Point( $(this).attr('lon'),	$(this).attr('lat')	) )
                            times.push( $(this).find('time').text().slice(0,-1) );
                        });
                    } else if (format === '.tcx') {
                        $(xmldata).find('Trackpoint').each( function () {
                            points.push( new Point( $(this).find('LongitudeDegrees').text(),	$(this).find('LatitudeDegrees').text() ) )
                            times.push( $(this).find('Time').text().slice(0,-1) );
                        });
                    }
                }
                
                /* Adding track */
                id = scieski.tracks.length;

                scieski.tracks.push({ 
                    id: id,
                    name: title,
                    type: '',
                    points: points,
                    times: times,
                    date: {
                        start: times[0]
                    },
                    distance: 0,
                    duration: 0,
                    hidden: false
                });

                newHTML = '<li id="track'+id+'"><h5>'+id+' : '+title+'</h5></li>'+newHTML;                     
            }
            
            if (index % statusUpdateRate === 0) {
                var progress = parseFloat(((index)/filesNumber)*100).toFixed(1);
                $('#status-tracks').empty().append(progress+'%');
                $tracks.prepend(newHTML); 
                newHTML = '';
            }

            /* Read next file */
            setTimeout(function (e) { readFile(index+1) }, 5);
        } 
        reader.readAsText(file);
    }
    readFile(0);
});     