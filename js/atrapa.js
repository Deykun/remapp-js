$(document).ready(function(){

	/* Wysuniecie menu */
	$('header').click( function() {
		$('.menu, header').toggleClass('show');
	});

	/* Wysuwanie paneli */
	$('nav button').on('click', function() {
		/* Wybranie panelu */
		var panel = $(this).attr('data-submenu');

		/* Sprawdzenie czy wybrano dobry panel */
		if (panel) {
			if ($('.'+panel).hasClass('show')) {
				$('.submenu').removeClass('show');
				$('nav > button.active').removeClass('active');
			} else {
				$('.submenu').removeClass('show');
				$('nav > button.active').removeClass('active');
				$('.submenu.'+panel).addClass('show');
				$('nav > button[data-submenu="'+panel+'"]').addClass('active');
			}
		}
	});

	/* Smooth hover */
	var pos = $('nav > button.active').first().position();

	$('#navhover').css('top', pos.top);

	$('nav > button').on('mouseover', function(e) {
		$('#navhover').stop(true).animate({
				top: $(this).position().top,
		}, 150);
	});

	$('nav > button').on('mouseout', function(e) {
		if ($('nav > button.active').length > 0) {
			$('#navhover').stop(true).animate({
					top: $('nav > button.active').first().position().top,
			}, 150);
		}
	});

});
