#global vars

scieski {
    default {
		dev {
			perfomence
		}
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
		show: {
			distance
		}
		upload {
			createPoint,
			calculateDistance
		}
	}
}

##track formats
	.tcx [ discipline*, Total Time, Total Distance ];
	.gpx [ discipline ]
	
	*walking as "other"