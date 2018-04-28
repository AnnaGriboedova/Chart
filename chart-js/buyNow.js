function onClickButtonNow(idElement) {
	var withOut = document.getElementById(idElement).innerHTML;
	document.getElementById("infoAlwaysPrice").innerHTML = '$'+ withOut;
	var withSale = withOut-0.30*withOut;
	document.getElementById("infoTodayPrice").innerHTML = '$'+ withSale;
	lineChart.destroy();
	config.data.datasets[1].data[2] = withOut;
	config.data.datasets[0].data[2] = withSale;
	var ctx = document.getElementById('canvasLine').getContext('2d'); 
	lineChart = new Chart(ctx, config); 
};

