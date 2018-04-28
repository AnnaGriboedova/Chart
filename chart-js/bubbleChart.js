(function(global) {
	var COLORS = [
		'rgb(170,142,255)',
		'rgb(254,28,142)',
		'rgb(254,28,142)',
		'#537bc4',
		'rgb(254,28,142)',
		'rgb(254,28,142)',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

	};

}(this));



var DATA_COUNT = 16;
		var MIN_XY = -150;
		var MAX_XY = 100;

		var utils = Samples.utils;

		utils.srand(110);

		function colorize(opaque, context) {
			var value = context.dataset.data[context.dataIndex];
			var x = value.x / 100;
			var y = value.y / 100;
			var r = x < 0 && y < 0 ? 75 : x < 0 ? 255 : y < 0 ? 254 : 0;
			var g = x < 0 && y < 0 ?  223 : x < 0 ? 231 : y < 0 ?  28 : 0;
			var b = x < 0 && y < 0 ?   290 : x > 0 &&      y > 0 ? 142 : 0;
			var a = opaque ? 1 : 0.7 * value.v / 1000;

			return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
		}

		function generateData() {
			var data = [];
			var i;

			for (i = 0; i < DATA_COUNT; ++i) {
				data.push({
					x: utils.rand(MIN_XY, MAX_XY),
					y: utils.rand(MIN_XY, MAX_XY),
					v: utils.rand(0, 1000)
				});
			}

			return data;
		}

		var data = {
			datasets: [{
				data: generateData()
			}, {
				data: generateData()
			}]
		};

		var options = {
			aspectRatio: 1,
			legend: false,
			tooltips: false,


			scales: {
				display: false,
			    xAxes: [{
			                gridLines: {
			                	drawBorder: false,
			                    display:false
			                },
			                ticks:{
			                	callback: function(value, index, values) {
					            	if (value !== 0 && value !== 500)
					                return '';                       
                    			}
			                }
			            }],
			    yAxes: [{
			                gridLines: {
			                	drawBorder: false,
			                    display:false
			                },
			                ticks:{
			                	callback: function(value, index, values) {
					            	if (value !== 0 && value !== 500)
					                return '';                       
                    			}
			                }  
			            }]
			},

			elements: {
				point: {
					backgroundColor: colorize.bind(null, false),

					borderColor: colorize.bind(null, true),

					borderWidth: function(context) {
						return Math.min(Math.max(1, context.datasetIndex + 1), 8);
					},

					hoverBackgroundColor: 'transparent',

					hoverBorderColor: function(context) {
						return utils.color(context.datasetIndex);
					},

					hoverBorderWidth: function(context) {
						var value = context.dataset.data[context.dataIndex];
						return Math.round(8 * value.v / 1000);
					},

					radius: function(context) {
						var value = context.dataset.data[context.dataIndex];
						var size = context.chart.width;
						var base = Math.abs(value.v) / 1000;
						return (size / 24) * base;
					}
				}
			}
		};


		var chart = new Chart('canvasBubble', {
			type: 'bubble',
			data: data,
			options: options
		});


