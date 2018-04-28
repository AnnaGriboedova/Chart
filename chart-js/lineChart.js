Chart.pluginService.register({
  afterDraw: function (chart, easingDecimal) {
  
  	if(chart.data.id !== 'lineChart'){
  		return;
  	};
  	
    var yScale = chart.scales['y-axis-0'];
    var helpers = Chart.helpers;
    var chartArea = chart.chartArea;

    yScale.options.display = true;
    yScale.draw.apply(yScale, [chartArea]);
    yScale.options.display = false;

    yScale.ctx.save();
    yScale.ctx.globalCompositeOperation = 'destination-over';
    helpers.each(yScale.ticks, function (label, index) {
      if (label === undefined || label === null) {
        return;
      }

      var yLineValue = this.getPixelForTick(index);
      yLineValue += helpers.aliasPixel(this.ctx.lineWidth);

      this.ctx.lineWidth = this.options.gridLines.lineWidth;
      this.ctx.strokeStyle = 'rgba(184,184,184, 0.3)';

      this.ctx.beginPath();
      this.ctx.moveTo(chartArea.left + 40, yLineValue);
      this.ctx.lineTo(chartArea.right, yLineValue);
      this.ctx.stroke();

    }, yScale);
    yScale.ctx.restore();    
   
    
    yScale.ctx.save();
    yScale.ctx.fillStyle = '#4BDFFB';
    yScale.ctx.globalCompositeOperation = 'destination-over';
    yScale.ctx.fillRect(0, yScale.bottom, chartArea.right, chartArea.bottom);
    yScale.ctx.restore(); 
  }
});

Chart.defaults.global.pointHitDetectionRadius = 5;
window.count = 0; 

window.chartColors = { 
	red: 'rgb(247,99,105)',
	blue: 'rgb(75,223,251)',
}; 

var config = { 
	type: 'line', 
	data: { 
		id: 'lineChart',
		labels: ['', 'JUN 1', 'JUN 8', 'JUN 15', 'JUN 22', 'JUN 29', '|'], 
		datasets: [{ 
			label: '',			
			borderColor: window.chartColors.blue, 
			backgroundColor: window.chartColors.blue, 
			data: [1500, 1000, 2500, 2500, 1000, 3000, 3000],
			pointBorderColor: 'white', 
			pointBorderWidth: 0,	
			pointRadius: 0, 
			pointHitRadius: 0,
			fill: true,
			pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			pointHoverRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			intersect: true,			
		}, { 
			label: '', 
			fill: true,			
			backgroundColor: window.chartColors.red, 
			borderColor: window.chartColors.red, 
			data: [2500, 2000, 3500, 3500, 2000, 4000, 4000],
			pointBorderColor: 'white', 
			pointBorderWidth: 7,	
			pointRadius: 7,			
			pointRadius: [0, 0, 12, 0, 0, 0, 0],
			pointHoverRadius: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0],	
		}] 
	}, 
	options: { 
		responsive: true, 
		maintainAspectRatio: false,
		showLines: true,
		tooltips: { 			
			mode: 'x',			
			titleFontFamily:"'GothamBook', 'Arial', 'Verdana', sans-serif",
			titleFontSize: 12,
			backgroundColor: '#fff', 
			titleFontColor: '#FB6C72', 
			bodyFontColor: '#704248', 
			bodyFontSize: 25,
			borderColor:  '#704248', 
			borderWidth: 1 ,
			bodyFontFamily: "'GothamMedium', 'Helvetica', 'Arial', sans-serif",
		        callbacks: {      				
			        label: function(tooltipItem, data) {			        	
			          return ""+"$"+ tooltipItem.yLabel;
			        },			        
			        title: function(tooltipItem, data) {
			          return "without rebate";
			        }
			      },
			intersect: true, 
			displayColors: false,
			yPadding: 10, 
			xPadding: 10, 
			caretSize: 7, 
			cornerRadius:0, 
			backgroundColor: '#fff',			
		}, 
		legend:{ 
			fullWidth: true,
			labels: { 
			boxWidth:0, 
			fontColor: 'rgb(255, 99, 132)',
			}
		}, 
		scales: {
			xAxes: [{ 
				id: 'x-axis-0',
          	gridLines: {
            	display: false,
          	},
	         ticks: {
	           	beginAtZero: true,
	            fontFamily: "'GothamMedium', 'Helvetica', 'Arial', sans-serif",
	            fontColor: "rgba(255,255,255,1)",
	            fontSize: 14,
	          }

			}], 
			yAxes: [{
				id: 'y-axis-0',          
				display: false,
				ticks: { 
					fontFamily: "'GothamMedium', 'Helvetica', 'Arial', sans-serif",
		           	fontColor: "#999999",		          
					fontSize: 15,
					beginAtZero:true,
					mirror:true,
					min: 0, 
					max: 7000,					
		            callback: function(value, index, values) {
		            	if (value !== 0 && value !== 500)
		                return '   ' + value/1000 + ' K';                       
                    }
				}, 
				gridLines: { 					
					display: false,					
					color: "rgba(0,0,0, 0.8)", 					
				}, 
				afterBuildTicks: function(chart) {            
          		}
			}] 
		} ,
	} ,
}; 


var lineChart;
var circleChart;

window.onload = function() { 
	Papa.parse("../data.csv", {
        download: true,
		complete: function(results, file) {
            var csvData = results.data;

            console.log("Parsing complete:", csvData);

            var percentFromRedArr;
            var blueArr = [];

            for (var i = 0; i < csvData[1].length; i++) {
            	percentFromRedArr = csvData[1][i];
            	blueArr[i] = percentFromRedArr*0.7;            	
            }

            var redArr = csvData[1];
            
            config.data.labels = csvData[0];
            config.data.datasets[0].data = blueArr;            

            var ctx = document.getElementById('canvasLine').getContext('2d'); 
			lineChart = new Chart(ctx, config);
        }
	});

	/*var ctx = document.getElementById('canvasLine').getContext('2d'); 
	lineChart = new Chart(ctx, config);*/

	var ctx1 = document.getElementById('canvasCircle').getContext('2d');
	circleChart = new Chart(ctx1, configCircleChart);	
};



