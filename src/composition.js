function makeGrid(col, row) {
	/* Ukrycie głównej mapy */
	$('.map').hide();
	$('#composition').empty().show();

	/* Wygenerowanie siatki */
	for (var i = 1 ; i <= col ; i++) {
			for (var j = 1; j <= row ; j++) {
				$('#composition').append('<div id="cpb-'+i+'-'+j+'" class="cpbox"></div>');
				if (i === 3 && j === 3) {
					$('#cpb-3-3').append('<h2>dni tygodnia</h2>');
				} else {
					mapLoad('cp', i, j);
				}
			}
		}
}

function days() {
	/* Wygenerowanie siatki */
	var x = 0;
	for (var i = 1 ; i <= 3 ; i++) {
			for (var j = 1; j <= 3 ; j++) {
				if(i === 3 && j === 3) {
				} else if (i === 3 && j === 2) {
					changeMap(i+'-'+j, 'd', 'all');
				} else {
					changeMap(i+'-'+j, 'd', x);
				}
				x++;
			}
		}
}
