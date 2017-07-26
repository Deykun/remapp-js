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
		dev: {
			perfomence: true	
		},
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
};