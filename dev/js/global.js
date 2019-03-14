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
            hours: ['#35165c', '#4d2a7a' ,'#684498' ,'#7d61a2', '#7e7b8e', '#7c976b', '#75b23f', '#74c31a', '#73c400', '#849700', '#9e4600', '#b80b00', '#cd0d07', '#dc561f', '#e9b93b', '#f0ec47', '#f1e63c', '#f1bf21', '#f18c08', '#e16800', '#bf500c', '#8f3921', '#5b223b', '#331250'],
            days: ['#f4960f', '#12bcd1', '#179d90', '#52ac57', '#8abd51', '#c4d33e', '#f4ba10'],
            months: ['#12bcd1', '#179d90', '#52ac57', '#8abd51', '#c4d33e', '#f4ba10', '#f4960f', '#f15b2a', '#e03b38', '#9d33b0', '#6c43b4', '#2a93e9'],
            years: ['#f4960f', '#0ba9cc', '#795046', '#9ec83e', '#f8971b', '#db4436', '#4186f0', '#7c3592'],
            distances: ['#c4d33e', '#f4ba10', '#f4960f', '#f15b2a', '#e03b38', '#9d33b0', '#6c43b4', '#2a93e9', '#12bcd1', '#179d90', '#52ac57', '#8abd51']
		},
		dev: {
			perfomence: true,
			actions: true
		},
		language: 'pl',
        legend: {
			type: 'months',
            yearBase: 2010,
			year: {
				start: 0,
				end: 0
			},
			distance: {
				max: 0
			},
            distanceRanges: [0.5, 1, 2.5, 5, 7.5, 10, 15, 20, 35, 50, 75, 100]
        },
        upload: { 
            update: 35,
			simultaneously: 45
        },
		map: {
			element: false,   
			type: 'lines',
			bounds: {
				fit: false,
				min: {
					lat: 0,
					lng: 0
				},
				max: {
					lat: 0,
					lng: 0
				}
			},
			settings: {
				mapTypeControl: false,
				disableDefaultUI: true,
				zoom: 6,
				center: {
					/* Center of Poland */
					lat: 52.03,
					lng: 19.27
				},
				styles: [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#b0b0b0" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "administrative.neighborhood", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ]	
			},
			stroke: {
				normal: 1.0,
				pickable: 3.0,
				selected: 1.9
			},
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
				return parseFloat(distance).toFixed(2)+' km';
			} else {
				return parseFloat(distance*1000).toFixed(0)+' m';
			}
		}
	},
	config: {
		change: {
			legedType: function (newtype) {
				if (scieski.default.dev.actions) {
					console.log('scieski.method.config.change.legendType(newtype='+newtype+')');
				}
				
				scieski.default.legend.type = newtype;
				
				scieski.method.legend.reload(newtype);
			},
			mapCenter: function () {  
				if (scieski.default.dev.actions) {
					console.log('scieski.method.config.change.mapCenter()');
				} 
				
				if (scieski.default.map.element !== false ) { 
					scieski.default.map.settings.zoom = scieski.default.map.element.getZoom();
					scieski.default.map.settings.center.lat = scieski.default.map.element.getCenter().lat();
					scieski.default.map.settings.center.lng = scieski.default.map.element.getCenter().lng();
				} else {
					console.warn('Empty map element.');
				}
			},
			mapLocation: function (newtype) {
				if (scieski.default.dev.actions) {
					console.log('scieski.method.config.change.mapLocation(newtype='+newtype+')');
				}
				
				scieski.default.map.bounds.fit = !scieski.default.map.bounds.fit;
				
				if (scieski.default.map.bounds.fit === false) {	
					scieski.method.config.change.mapCenter();
				}
			},
			mapType: function (newtype) {
				if (scieski.default.dev.actions) {
					console.log('scieski.method.config.change.mapType(newtype='+newtype+')');
				}
				
				scieski.default.map.type = newtype;
			}
		}
	},
	dev: function(type) {
		if (scieski.default.dev.actions) {
			console.log('scieski.method.dev(type='+type+')');
		}
		
		if (scieski.default.dev.hasOwnProperty(type)) {
			scieski.default.dev[type] = scieski.default.dev[type] ? false : true;
			console.info('scieski.default.dev.'+type+' : '+scieski.default.dev[type]);
		} else {
			console.warn('Unknow dev property : '+type);
		}
	},
	legend: {
		addLabel: function($legend, name, color) {
			$legend.find('.range').append('<div style="background-color:'+color+';" data-label="'+name+'"></div>');
		},
		reload: function(newtype) {
			if (scieski.default.dev.actions) {
				console.log('scieski.method.legend.reload(newtype='+newtype+')');
			}
			
			if (typeof newtype == "undefined" ) {
				var newtype = scieski.default.legend.type;
			}
			
			var $mapLegend = $('#mainmap').next('.legend');
			$mapLegend.addClass('hide');
			
			
			var legendLanguage = scieski.default.language;
			var colors = [],
				labels = [];
			
			switch (newtype) {
				case 'years':
					/* Color repeat itself after yearBase + colorsLength */
					var yearColors = scieski.default.color.years;
					var colorsLength = yearColors.length;
					var yearBase = scieski.default.legend.yearBase;
					
					var yearStart = scieski.default.legend.year.start;
					var yearEnd = scieski.default.legend.year.end;
					
					var yearToCheck; 
					if (yearStart == 0) {
						yearStart = 2016; // first version of Scieski
						yearEnd = (new Date()).getFullYear();
					}
					
					for (var i = 0, imax = yearEnd - yearStart; i <= imax ; i++) {  
						yearToCheck = (yearStart + i) - yearBase;
						if ( yearToCheck >= 0 ) {                            
							colors.push( yearColors[yearToCheck % colorsLength] );
							labels.push(yearStart + i);
						} else {
							colors.push( yearColors[colorsLength + (yearToCheck % colorsLength)] ); // negative modulo
							labels.push(yearStart + i);
						}
					}
					
					/* TO DO min an*/
					break;
				case 'months':
					colors = scieski.default.color.months,
					labels = scieski.lang.legend.months[legendLanguage];
					
					break;
				case 'days':
					colorsDays = scieski.default.color.days,
					labelsDays = scieski.lang.legend.days[legendLanguage];
					
					for (var i = 0, imax = colorsDays.length ; i < imax ; i++) {
						colors.push( colorsDays[i] );
						labels.push( labelsDays[i] );
					}
					
					/* Sunday is last */				
					colors.push(colors[0]);
					colors.shift();
					labels.push(labels[0]);
					labels.shift();
					
					break;
				case 'hours':
					colors = scieski.default.color.hours;
					for (var i = 0, imax = colors.length ; i < imax ; i++) {
						labels.push(i+':00');
					}
					break;
				case 'distances':
					distanceColors = scieski.default.color.distances,
					distanceRanges = scieski.default.legend.distanceRanges;
					
					
					var distanceMax = scieski.default.legend.distance.max;
					var showDistance = scieski.method.show.distance;
					
					for (var i = 0, imax = distanceRanges.length ; i < imax ; i++) {
						if ( distanceRanges[i] <= distanceMax ) {
							labels.push(showDistance(distanceRanges[i]));
							colors.push(distanceColors[i]);
						} else {
							labels.push(showDistance(distanceRanges[i]));
							colors.push(distanceColors[i]);
							break;
						}
					}
					
					break;
			} 
			
			if (colors.length > 0) {
				$mapLegend.find('.range').empty();
				var addLabel = scieski.method.legend.addLabel;
				
				for (var i = 0, imax = colors.length ; i < imax ; i++) {
					addLabel($mapLegend, labels[i], colors[i]);
				}
			}
			
			setTimeout( function () {
				$mapLegend.removeClass('hide');
			}, 150);
		},
	},
	tracks: {
		basicStatistics: function() {
			var totalDistance = 0;
			$('#tracks > .track').each( function(e) {
				totalDistance += Number( $(this).attr('data-distance') );
			});
			
			$('#basicStatistics').empty().append('Całkowity dystans: <strong>'+scieski.method.show.distance(totalDistance)+'</strong>');		
		},
		filter: {
			check: function(textFromInput) {
				var filterQuery = textFromInput.replace(/ /g, '').split(':');
//				console.dir(filterQuery);
				if (filterQuery.length == 2) {
					switch (filterQuery[0]) {
						case 'min': 
							if (filterQuery[1].match(/^[0-9]?[\.[0-9]+]?km$/)) {
								console.log('kilometry');
								var filterValue = Number( filterQuery[1].replace('km', '') );
								console.info('#min'+filterValue+'km');
							}
							
							
							break;
						case 'lines':   
							break;
						default:
//							console.log('nieznana');
					} 
				}
			}
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
			createPoint: function (latitude, longitude, altitude, time) {				
				return { lat: Number(latitude), lng: Number(longitude), alt: Number(altitude), time: time };
			},
			/* Track distance in km,  altitude is being ignored */
			calculateDistance: function (points) {
				if (points.length < 2) {
					return 0;
				}
				
				/* Max and min latitude and longitude */
				var minLat = points[0].lat,
					maxLat = points[0].lat,
					minLng = points[0].lng,
					maxLng = points[0].lng;

				var totalDistance = 0,
					earthRadius = 6371; // mean in km

				for (var i = 1, imax = points.length ; i < imax ; i++) {
					if (points[i].lat == 0 && points[i].lng == 0) {
						points[i].lat = points[i-1].lat;
						points[i].lng = points[i-1].lng;
						continue;
					}
					var dLat = ( points[i].lat - points[(i-1)].lat ).toRad();
					var dLng = ( points[i].lng - points[(i-1)].lng ).toRad();

					var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
							Math.cos(points[(i-1)].lat.toRad()) * Math.cos(points[i].lat.toRad()) * 
							Math.sin(dLng/2) * Math.sin(dLng/2); 

					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					var pointsDistance = earthRadius * c; // in km
					totalDistance += pointsDistance;
					
					if (minLat > points[i].lat) { minLat = points[i].lat; }
					if (maxLat < points[i].lat) { maxLat = points[i].lat; }
					if (minLng > points[i].lng) { minLng = points[i].lng; }
					if (maxLng < points[i].lng) { maxLng = points[i].lng; }
				}

				scieski.method.tracks.upload.extendBorder(minLat, minLng);
				scieski.method.tracks.upload.extendBorder(maxLat, maxLng);
				return totalDistance;
			},
			extendBorder: function (latitude, longitude) {
				var minLat = scieski.default.map.bounds.min.lat;
				var maxLat = scieski.default.map.bounds.max.lat;
				var minLng = scieski.default.map.bounds.min.lng;
				var maxLng = scieski.default.map.bounds.max.lng;
				
				if (minLat === 0 || minLat > latitude) { scieski.default.map.bounds.min.lat = latitude; }
				if (maxLat < latitude) { scieski.default.map.bounds.max.lat = latitude; }
				if (minLng === 0 || minLng > longitude) { scieski.default.map.bounds.min.lng = longitude; }
				if (maxLng < longitude) { scieski.default.map.bounds.max.lng = longitude; }
			}			
		}
	},
	gmaps: {
		addMap: function(config) {
			if (scieski.default.dev.actions) {
				console.log('scieski.method.gmap.showMap(config='+JSON.stringify(config)+')');
			}
			
			/* Overides default mapconfiguration with paramater of the function */
			var mapConfiguration = $.extend({}, scieski.default.map.settings, config.settings);
			
			scieski.default.map.element = new google.maps.Map(document.getElementById('mainmap'), mapConfiguration);
			var map = scieski.default.map.element;
			
			/* Map borders */
			if ( scieski.default.map.bounds.fit === true ) {
				var bounds = new google.maps.LatLngBounds();
					bounds.extend({lat : scieski.default.map.bounds.min.lat, lng: scieski.default.map.bounds.min.lng })
					bounds.extend({lat : scieski.default.map.bounds.max.lat, lng: scieski.default.map.bounds.max.lng })
					map.fitBounds(bounds);
			}
			
			if ('tracks' in config) { var tracks = config.track; }
			else { var tracks = scieski.tracks; }
			
			if ( !('maptype' in config) ) { config.maptype = scieski.default.map.type; }
			
            switch (config.maptype) {
                case 'heatmap': 
                    scieski.method.gmaps.paintHeatmap(map, tracks);   
                    break;
                case 'lines': 
                    scieski.method.gmaps.drawTracks(map, tracks);   
                    break;
                default:
                    console.warn('Unknow map type :'+config.dataType)     
            }
			
			scieski.method.legend.reload();
		},
		drawTracks: function(map, tracks) {
            var pickColor = scieski.method.gmaps.helper.pickColor( scieski.default.legend.type ); // return function() {};
            
			for (var i = 0, imax = tracks.length ; i < imax ; i++) {
                var track = tracks[i];
                var trackColor = pickColor(track);
                
				var polyline = new google.maps.Polyline({
					path: track.points,
					geodesic: true,
					strokeColor: trackColor,
					strokeOpacity: 1,
					strokeWeight: 1,
					label: track.id
				});
				
				/*google.maps.event.addListenerOnce(this.map,'idle',callback)*/
				//marker.push(newmarker);
				polyline.setMap(map);
			}			
		},
        paintHeatmap: function(map, tracks) {  
            var heatmapPoints = [];
			for (var i = 0, imax = tracks.length ; i < imax ; i++) {
                for (var j = 0, jmax = tracks[i].points.length ; j < jmax ; j++) {
                    heatmapPoints.push( new google.maps.LatLng( tracks[i].points[j].lat , tracks[i].points[j].lng ) );
                }
            } 
            
            // var!
            heatmap = new google.maps.visualization.HeatmapLayer({
                map: map,
                data: heatmapPoints,
                radius: 5,
                maxIntensity: 40,
                gradient: [
                  'rgba(128, 255, 255, 0)',
                  'rgba(99, 155, 88, 0.6)',
                  'rgba(213, 116, 88, 0.9)',
                  'rgba(255, 0, 0, 1)'
                    ]
                });						
        },
        helper: {
            pickColor: function(range) {
                if (scieski.default.dev.actions) {
                    console.log('scieski.method.gmap.pickColor(range='+range+')');
                }

                switch (range) {
                    case 'years':
                        /* Color repeat itself after yearBase + colorsLength */
                        var colors = scieski.default.color.years,
                            colorsLength = colors.length,
                            yearBase = scieski.default.legend.yearBase;

                        return function(track) {
                            var yearTrack = Number(new Date( track.date.middle ).getFullYear()),
                                yearToCheck = yearTrack - yearBase;

                            if ( yearToCheck >= 0 ) {                            
                                return colors[yearToCheck % colorsLength];
                            } else {
                                return colors[colorsLength + (yearToCheck % colorsLength)]; // negative modulo
                            }
                        }
                        break;
                    case 'months':
                        var colors = scieski.default.color.months;

                        return function(track) {
                            var monthTrack = Number(new Date( track.date.middle ).getMonth());
                            return colors[monthTrack];
                        }
                        break;
                    case 'days':
                        var colors = scieski.default.color.days;

                        return function(track) {
                            var dayTrack = Number(new Date( track.date.middle ).getDay());
                            return colors[dayTrack];
                        }
                        break;
					case 'hours':
                        var colors = scieski.default.color.hours;

                        return function(track) {
                            var hourTrack = Number(new Date( track.date.middle ).getHours());
                            return colors[hourTrack];
                        }
                        break;
                    case 'distances':
                        var colors = scieski.default.color.distances,
                            distanceRanges = scieski.default.legend.distanceRanges;

                        return function(track) {
                            var distanceTrack = track.distance;

                            for (var i = 0, imax = distanceRanges.length ; i < imax ; i++) {
                                if (distanceTrack < distanceRanges[i]) {
                                    return colors[i];
                                }
                            }
                            return colors[ distanceRanges.length - 1 ];
                        }
                        break;
                }
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