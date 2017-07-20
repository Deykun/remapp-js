/* Przetwarzanie punktu GPS w formacie wymaganym przez Google Maps */
var Point = function (longitude, latitude) {
	return {lat: Number(latitude), lng: Number(longitude)};
}