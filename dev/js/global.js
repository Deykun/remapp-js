//
//
//				 .d8888b.        .d8888b.       d8b      8888888888       .d8888b.       888    d8P       d8b      
//				d88P  Y88b      d88P  Y88b      Y8P      888             d88P  Y88b      888   d8P        Y8P      
//				Y88b.           888    888               888             Y88b.           888  d8P                  
//				 "Y888b.        888             888      8888888          "Y888b.        888d88K          888      
//					"Y88b.      888             888      888                 "Y88b.      8888888b         888      
//					  "888      888    888      888      888                   "888      888  Y88b        888      
//				Y88b  d88P      Y88b  d88P      888      888             Y88b  d88P      888   Y88b       888      
//				 "Y8888P"        "Y8888P"       888      8888888888       "Y8888P"       888    Y88b      888      
//
//
//				@deykun							st.deykun[at]gmail.com							2016 - 2017
//				
//				https://github.com/Deykun/scieski-js
//				

scieski = {
    default: {
		color: {
			legend: {
				hours: ['#35165c', '#4d2a7a' ,'#684498' ,'#7d61a2', '#7e7b8e', '#7c976b', '#75b23f', '#74c31a', '#73c400', '#849700', '#9e4600', '#b80b00', '#cd0d07', '#dc561f', '#e9b93b', '#f0ec47', '#f1e63c', '#f1bf21', '#f18c08', '#e16800', '#bf500c', '#8f3921', '#5b223b', '#331250'],
				days: ['#f4960f', '#12bcd1', '#179d90', '#52ac57', '#8abd51', '#c4d33e', '#f4ba10'],
				months: ['#12bcd1', '#179d90', '#52ac57', '#8abd51', '#c4d33e', '#f4ba10', '#f4960f', '#f15b2a', '#e03b38', '#9d33b0', '#6c43b4', '#2a93e9'],
				years: ['#f4960f', '#0ba9cc', '#795046', '#9ec83e', '#f8971b', '#db4436', '#4186f0', '#7c3592']
			}	
		},
		dev: {
			perfomence: true,
			actions: true
		},
		language: 'pl',
        upload: {
            update: 100,
			simultaneously: 250
        }
    },
    tracks: []
};

/* Functions */
scieski.method = {
	show: {
		distance: function (distance) {
			var distance = parseFloat(distance).toFixed(2);
			
			if (distance >= 0.75) {
				return parseFloat(distance).toFixed(2)+'km';
			} else {
				return parseFloat(distance*1000).toFixed(0)+'m';
			}
		}
	},
	tracks: {
		basicStatistics: function() {
			var totalDistance = 0;
			$('#tracks > .track').each( function(e) {
				totalDistance += Number( $(this).attr('data-distance') );
			});
			
			$('#basicStatistics').empty().append('Całkowity dystans: <strong>'+scieski.method.show.distance(totalDistance)+'</strong>');		
		}, 
		sort: function(sortOrder) {
			if (scieski.default.dev.actions) {
				console.log('scieski.method.track.sort(sortOrder='+sortOrder+')');
			}
			
			var $tracks = $('#tracks');
			var trackToSort = $.makeArray($tracks.children('.track'));
			
			switch(sortOrder) {
				case 'distance': {
					trackToSort.sort(function(a, b) {
						var trackA = Number( $(a).attr('data-distance') );
						var trackB = Number( $(b).attr('data-distance') );

						if (trackA > trackB) return -1;
						if (trackA < trackB) return 1;

					return 0;
					});
					
					$tracks.empty();
					$.each(trackToSort, function() {
						$tracks.append(this);
					});
					break;
				}	
				case 'date': {
					trackToSort.sort(function(a, b) {
						var trackA = Number( $(a).attr('data-start-time') );
						var trackB = Number( $(b).attr('data-start-time') );

						if (trackA > trackB) return -1;
						if (trackA < trackB) return 1;

					return 0;
					});
					
					$tracks.empty();
					$.each(trackToSort, function() {
						$tracks.append(this);
					});
					break;
				}
				case 'reverse': {
					trackToSort.reverse();
					
					$tracks.empty();
					$.each(trackToSort, function() {
						$tracks.append(this);
					});
					break;
				}
				default: {
					/* Default sort function */
					scieski.method.tracks.sort('distance');
					return;
				}
			}
		},
		upload: {
			/* Google maps format of point */
			createPoint: function (latitude, longitude) {
				return { lat: Number(latitude), lng: Number(longitude) };
			},
			/* Track distance in km,  altitude is being ignored */
			calculateDistance: function (points) {
				if (points.length < 2) {
					return 0;
				}

				var totalDistance = 0,
					earthRadius = 6371; // mean in km

				for (var i = 1, imax = points.length ; i < imax ; i++) {
					var dLat = ( points[i].lat - points[(i-1)].lat ).toRad();
					var dLng = ( points[i].lng - points[(i-1)].lng ).toRad();

					var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
							Math.cos(points[(i-1)].lat.toRad()) * Math.cos(points[i].lat.toRad()) * 
							Math.sin(dLng/2) * Math.sin(dLng/2); 

					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					var pointsDistance = earthRadius * c; // in km
					totalDistance += pointsDistance;
				}

				return totalDistance;
			}
		}
	}
};

/* Translation */
scieski.lang = {
	legend: {
		days: {
			en: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
			pl: ['niedziela','poniedziałek','wtorek','środa','czwartek','piątek','sobota']
		},
		months: {
			en: [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
			pl: [ 'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']
		} 
	}
}