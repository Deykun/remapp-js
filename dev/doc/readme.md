#global vars

scieski {
    default {
		color {
			legend {
				hours [],
				days [],
				months [],
				years []						// TD years.length + modulo % + startpoint int
			}
		},
		dev {
			perfomence,
			actions
		},
		language,
        upload {
            update,								// Aktualizacja % postępu
			simultaneously						// Ile tras jest przetwarzanych jednocześnie
        }  
    },
    tracks [
        track {
            id,
            name,
            type,
            points [
                {lat, lng}
            ],
            times [],
            date {start, middle, end},
            distance,
            time,
            hidden
        }
    ],
	
	method {
		show {
			distance(distance)
		},
		dev(type),
		tracks {
			basicStatistics(),
			sort(sortOrder),
			upload {
				createPoint(latitude, longitude),
				calculateDistance(points)
			}
		}
	}
	
	lang {
		legend {
			days { en [], pl []	},
			months { en [], pl [] }
			}
		}
	}
}

##track formats
	.tcx [ discipline*, Total Time, Total Distance ];
	.gpx [ discipline ]
	
	*walking as "other"