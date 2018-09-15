var mydata; // global variable used to save the contents of the JSON data

// desc stores the start and end index of the crypto currencies in the data. This has been extracted using pandas in python.
desc = {'end': {0: 782, 1: 1565, 2: 2348, 3: 2562,4: 3345,5: 3489,6: 4020,7: 4803,8: 5039,9: 5822,10: 6605,11: 6859,12: 7642,13: 8220,14: 8382,15: 8566,16: 9253,17: 10036,18: 10158,19: 10432,20: 10655,21: 10773,22: 11254,23: 11591,24: 12374,25: 13049,26: 13832,27: 14044,28: 14269,29: 15051,30: 15610,31: 15749,32: 16532,33: 17162,34: 17401,35: 17512,36: 18187,37: 18970,38: 19236,39: 19415,40: 20098,41: 20841,42: 20953,43: 21143,44: 21402,45: 21515,46: 21984,47: 22170,48: 22681,49: 23063,50: 23400,51: 23631,52: 23752,53: 24018,54: 24046,55: 24829,56: 25027,57: 25810,58: 25986,59: 26120,60: 26314,61: 26395,62: 26458,63: 27241,64: 27261,65: 27412,66: 27505,67: 28245,68: 28336,69: 28797,70: 29219,71: 29346,72: 30129,73: 30324,74: 30361,75: 30580,76: 30822,77: 31123,78: 31906,79: 32019,80: 32167,81: 32299,82: 32539,83: 32694,84: 33198,85: 33411,86: 34194,87: 34340,88: 34472,89: 34688,90: 35471,91: 35720,92: 35883,93: 36666,94: 36883,95: 37008,96: 37791,97: 38031,98: 38814,99: 38885},
		'start': {0: 0,1: 783,2: 1566,3: 2349,4: 2563,5: 3346,6: 3490,7: 4021,8: 4804,9: 5040,10: 5823,11: 6606,12: 6860,13: 7643,14: 8221,15: 8383,16: 8567,17: 9254,18: 10037,19: 10159,20: 10433,21: 10656,22: 10774,23: 11255,24: 11592,25: 12375,26: 13050,27: 13833,28: 14045,29: 14270,30: 15052,31: 15611,32: 15750,33: 16533,34: 17163,35: 17402,36: 17513,37: 18188,38: 18971,39: 19237,40: 19416,41: 20099,42: 20842,43: 20954,44: 21144,45: 21403,46: 21516,47: 21985,48: 22171,49: 22682,50: 23064,51: 23401,52: 23632,53: 23753,54: 24019,55: 24047,56: 24830,57: 25028,58: 25811,59: 25987,60: 26121,61: 26315,62: 26396,63: 26459,64: 27242,65: 27262,66: 27413,67: 27506,68: 28246,69: 28337,70: 28798,71: 29220,72: 29347,73: 30130,74: 30325,75: 30362,76: 30581,77: 30823,78: 31124,79: 31907,80: 32020,81: 32168,82: 32300,83: 32540,84: 32695,85: 33199,86: 33412,87: 34195,88: 34341,89: 34473,90: 34689,91: 35472,92: 35721,93: 35884,94: 36667,95: 36884,96: 37009,97: 37792,98: 38032,99: 38815}};

function load() // function runs when the body of the page visualize.html has been loaded
{
	mydata = JSON.parse(data); // read JSON data
			
	var selectDropdown = $("#cryptosList"); // select the object with id "cryptosList"
	var selectDropdownPlotly = $("#cryptosListPlotly"); // select the object with id "cryptosListPlotly"
	// generating the dropdown menu for selecting the crypto-currency
	for (i=0; i<100; i++)
	{
		$(selectDropdown).append($("<option></option>").attr("value",i).text(mydata[parseInt(desc['start'][i])].name));
		$(selectDropdownPlotly).append($("<option></option>").attr("value",i).text(mydata[parseInt(desc['start'][i])].name));
		$(selectDropdown).material_select();
		$(selectDropdownPlotly).material_select();
	}   
}

function load_index() // function runs when the body of the page index.html has been loaded
{
	mydata = JSON.parse(data); // read JSON data
	
	var selectDropdown = $("#cryptosList"); // select the object with id "cryptosList"
	// generating the dropdown menu for selecting the crypto-currency
	for (i=0; i<100; i++)
	{
		$(selectDropdown).append($("<option></option>").attr("value",i).text(mydata[parseInt(desc['start'][i])].name));
		$(selectDropdown).material_select();
	}
}

function indexVals() // function called when the user chooses a crypto-currency from the index.html page and hits the update button to get the price and volume
{
	list = document.getElementById("cryptosList"); // select the object with id "cryptosList"
	var curr = list.options[list.selectedIndex].value; // getting the value of the crypto-currency that has been selected (returns rank)
	
	price = document.getElementById("priceP"); // select the object with id "priceP"
	vol = document.getElementById("volumeP"); // select the object with id "volumeP"
	price.innerHTML = mydata[parseInt(desc['end'][parseInt(curr)])]['close'] + "  USD"; // updating price value
	vol.innerHTML = mydata[parseInt(desc['end'][parseInt(curr)])]['volume']; // updating volume value
}

function pricesPlotlyViz() // function called when the user chooses a crypto-currency and hits the plot button in the last visualization in the visualize.html page
{
	var label = [];
	var dataClose = [];
	var dataHigh = [];
	var dataLow = [];
	var dataOpen = [];
	
	list = document.getElementById("cryptosListPlotly"); // select the object with id "cryptosListPlotly"
	var curr = list.options[list.selectedIndex].value;  // getting the value of the crypto-currency that has been selected (returns rank)
	
	// getting values for the selected crypto-currency
	for (i=parseInt(desc['start'][parseInt(curr)]); i<=parseInt(desc['end'][parseInt(curr)]); i++)
	{
		dataOpen.push(mydata[i]['open']);
		dataHigh.push(mydata[i]['high']);
		dataLow.push(mydata[i]['low']);
		dataClose.push(mydata[i]['close']);
		label.push(formatDate(mydata[i]['date']));
	}
	
	var dateStart = formatDate(mydata[parseInt(desc['start'][parseInt(curr)])]['date']);
	var dateEnd = formatDate(mydata[parseInt(desc['end'][parseInt(curr)])]['date']);
	var dateRange = [];
	dateRange.push(dateStart);
	dateRange.push(dateEnd);
	
	var trace1 = {
		x: label,
		close: dataClose,
		decreasing: {line: {color: '#7F7F7F'}}, 
		high: dataHigh,
		increasing: {line: {color: '#17BECF'}}, 
		line: {color: 'rgba(31,119,180,1)'}, 
		low: dataLow,
		open: dataOpen,
		type: 'candlestick',
		xaxis: 'Date',
		yaxis: 'Price in USD'
	}
	
	var data = [trace1];
	
	var layout = {
			dragmode: 'zoom',
			width: 1200,
			height: 600,
			margin: {
				r: 100,
				t: 5,
				b: 5,
				l: 100
			},
			showlegend: false,
			xaxis: {
				autorange: true,
				domain: [0,1],
				range: dateRange,
				rangeslider: {range: dateRange},
				title: 'Date',
				type: 'date'
			},
			yaxis: {
				autorange: true,
				domain: [0,1],
				range: [0.0, 500.0],
				type: 'linear'
			}
	}
	
	Plotly.newPlot('pricesPlotlyDiv', data, layout);  // visualization using plotly.js
}

function pricesViz() // function called when the user chooses a crypto-currency and the number of days and hits the plot button in the second visualization in the visualize.html page
{
	list = document.getElementById("cryptosList"); // select object with id "cryptosList"
	listdays = document.getElementById("numDaysPrice"); // select object with id "numDaysPrice"
	var label = [];
	var dataOpen = [];
	var dataHigh = [];
	var dataClose = [];
	var dataLow = [];
	
	var curr = list.options[list.selectedIndex].value; // getting the value of the crypto-currency selected by the user (returns rank)
	var numDays = listdays.options[listdays.selectedIndex].value; // get the number of days chosen by the user

	var startIndex = parseInt(desc['end'][parseInt(curr)]) - numDays;
	
	// getting values for the selected crypto-currency
	for (i=startIndex; i<=parseInt(desc['end'][parseInt(curr)]); i++)
	{
		dataOpen.push(mydata[i]['open']);
		dataHigh.push(mydata[i]['high']);
		dataLow.push(mydata[i]['low']);
		dataClose.push(mydata[i]['close']);
		label.push(mydata[i]['date']);
	}
	
	document.getElementById("pricesDiv").innerHTML = "";
	$('#pricesDiv').append('<canvas id="cryptoPriceChart"><canvas>');
	
	// line chart visualization using Chart.js
	var ctx = document.getElementById("cryptoPriceChart").getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: 	{
					labels: label,
					datasets: [{
									label: 'Open Price',
									fill: false,
									data: dataOpen,
									backgroundColor: 'rgba(255, 99, 132, 1)',
											
								},
								{
									label: 'Close Price',
									fill: false,
									data: dataClose,
									backgroundColor: 'rgba(54, 162, 235, 1)',
								},
								{
									label: 'High Price',
									fill: false,
									data: dataHigh,
									backgroundColor: 'rgba(255, 206, 86, 1)',
								},
								{
									label: 'Low Price',
									fill: false,
									data: dataLow,
									backgroundColor: 'rgba(153, 102, 255, 1)',
								}]
				},
				
				
		options:{
					responsive: true,
					tooltips: 	{
									mode: 'index',
									intersect: false,
								},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true,
								autoSkip: false
							}
						}]
					}
				}
	});

}

function topVolumesRecentViz()
{
	form = document.getElementById("topVolumesRecent");
	
	var label = [];
	var data = [];
	var colors = []
	
	// getting values for the selected number of days
	for (i=0; i<parseInt(form.group1.value); i++)
	{
		data.push(mydata[parseInt(desc['end'][i])]['volume']);
		label.push(mydata[parseInt(desc['end'][i])]['name']);
		colors.push(getRandomColor());
	}
	
	document.getElementById("topvolumesRecentDiv").innerHTML = "";
	$('#topvolumesRecentDiv').append('<canvas id="myChart"><canvas>');
	
	// doughnut chart visualization using Chart.js
	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'doughnut',
		data: 	{
					labels: label,
					datasets: [{
						label: 'Volume',
						data: data,
						borderWidth: 1,
						backgroundColor: colors
					}]
				},
				
		options:{
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true,
								autoSkip: false
							}
						}]
					}
				}
	});
}

function formatDate(date)  // function for formatting the date into a format acceptable by plotly
{
	var d = new Date(date);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; 
	var yyyy = d.getFullYear();
	if(dd<10) 
	{
		dd=`0${dd}`;
	} 
	if(mm<10) 
	{
		mm=`0${mm}`;
	} 
	finalDate = yyyy + "-" + mm + "-" + dd;
	return finalDate;
}

function getRandomColor() // returns a random color
{
	  var letters = '0123456789ABCDEF';
	  var color = '#';
	  for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
}
