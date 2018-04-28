window.chartColors = {
	red: 'rgb(250,99,104)',
	orange: 'rgb(255,181,0)',
	yellow: 'rgb(255,231,0)',
	green: 'rgb(98,224,148)',
	blue: 'rgb(75,223,251)',
	purple: 'rgb(170,142,255)',
	limeGreen: 'rgb(208,237,0)',
	pink: 'rgb(254,28,142)',
};

		var randomScalingFactor = function() {
			return Math.round(Math.random() * 100);
		};	
		
		
		function data_for_chart_circle() {

		  var data = {
		  	id: 'circleId',
		    datasets: [{

					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
					backgroundColor: [
						window.chartColors.red,
						window.chartColors.orange,
						window.chartColors.yellow,
						window.chartColors.green,
						window.chartColors.blue,
						window.chartColors.purple,
						window.chartColors.limeGreen,
						window.chartColors.pink,
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Dresses',
					'Sweaters',
					'Skirts',
					'Jeans',
					'Crushers',
					'Shoes',
					'Coat',
					'Backpacks'
				]
			};
			
		 

		  return data;

		};



		var configCircleChart = {
			type: 'doughnut',
			data: data_for_chart_circle(),
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				tooltips: { 

					titleFontFamily:"'Helvetica', 'Arial', 'Verdana', sans-serif",
					titleFontSize: 12,
					backgroundColor: '#fff', 
					titleFontColor: '#FB6C72', 
					bodyFontColor: '#704248', 
					bodyFontSize: 25,
					borderColor:  '#704248', 
					borderWidth: 1 ,
					bodyFontFamily: "'LatoBold', 'Helvetica', 'Arial', sans-serif",
			    	
					
					 
					intersect: true, 

					displayColors: false,
					yPadding: 10, 
					xPadding: 10, 
					caretSize: 7, 
					cornerRadius:0, 

					backgroundColor: '#fff', 
					
					
				}
			}
		};