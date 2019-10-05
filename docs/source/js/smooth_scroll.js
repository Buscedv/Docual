$('a[href^="#"]').on('click',function (e) {
	let actives = document.getElementsByClassName('active');
	let i;
	for (i = 0; i < actives.length; i++) {
		actives[i].classList.toggle('active');
	}
	this.classList.toggle('active');

	let target = this.hash,
			$target = $(target);

	$('html, body').stop().animate({
		'scrollTop': $target.offset().top-80
	}, 1, 'swing', function () {
		window.location.hash = target;
	});
});