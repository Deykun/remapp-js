#global vars

scieski {
    default {
        upload {
            update
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
    ]
}