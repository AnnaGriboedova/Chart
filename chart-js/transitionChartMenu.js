$(function() {
	$('.chart__menuLink').on('click', function(e) {
		e.preventDefault();
		$('.chart__chartOption').each(function() {
			$(this).css('display', 'none');
		});
		var block = $(this).attr('href');
		$(block).css('display', 'block');
	});
});
function chartMenuColor(idActive, idInactive1, idInactive2) {
	document.getElementById(idActive).style.background = '#4ADFFB';
	document.getElementById(idInactive1).style.background = '#fff';
	document.getElementById(idInactive2).style.background = '#fff';

	document.getElementById(idActive).firstChild.style.color = '#fff';
	document.getElementById(idInactive1).firstChild.style.color = 'black';
	document.getElementById(idInactive2).firstChild.style.color = 'black';

	document.getElementById(idActive).style.cssText= 'background: #4ADFFB;\  color: #fff;\  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);';
	document.getElementById(idInactive1).style.cssText = 'background: #fff;\  color: #black;\  box-shadow: 0 0 0;';
	document.getElementById(idInactive2).style.cssText = 'background: #fff;\  color: #black;\  box-shadow: 0 0 0;';
}