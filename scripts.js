

// var url = "http://api.openweathermap.org/data/2.5/forecast/city?zip=30325,us=524901&units=imperial&APPID=" + apiKey;

$(document).ready(function(){
var apiKey = '2a82e246ffc84e99ca6a64b25ddc61f1';
var canvas = document.getElementById('current-temp');
var context = canvas.getContext('2d');
var currentTemp = 0;

	$('.weather-form').submit(function(){
		// keep the form from submitting
		event.preventDefault();
		// get the user input
		var cityText = $('.city').val();
		// build the url form the user input and our api key
		var url = "http://api.openweathermap.org/data/2.5/forecast/city?q="+cityText+",US&units=imperial&APPID=" + apiKey;

		// go get the JSON form the constructed URL
		$.getJSON(url, function(weatherData){
			// set up a viaralble for the users city temp
			currentTemp = weatherData.list[0].main.temp;
			console.log(weatherData);
			backImage = weatherData.list[0].weather[0].id;
			var id = backImage.toString()[0];
			console.log(id);
			if(id == '2'){
				$('#bodyImage').css("background-image", "url(images/thunderstorm.jpg)");  
			}
			if(id == '3'){
				$('#bodyImage').css("background-image", "url(images/drizzle.jpg)");  
			}
			if(id == '5'){
				$('#bodyImage').css("background-image", "url(images/rain.jpg)");  
			}
			if(id == '6'){
				$('#bodyImage').css("background-image", "url(images/snow.jpg)");  
			}
			if(id == '7'){
				$('#bodyImage').css("background-image", "url(images/fog.jpg)");  
			}
			if(id == '8'){
				$('#bodyImage').css("background-image", "url(images/sunny.jpg)");  
			}
			if(id == '9'){
				$('#bodyImage').css("background-image", "url(images/windy.jpg)");  
			}
			animate(0);
		});
	});

	function animate(current){
		context.clearRect(0,0,500,500);


		var tempColor = "#ff0000";
		context.strokeStyle = tempColor;
		context.lineWidth = 10;

		context.beginPath();
		context.arc(155, 155, 60, Math.PI * 1.5, Math.PI*3);
		context.fillStyle = "#ddd";
		context.fill();

		context.beginPath();

		context.arc(155, 155, 70, Math.PI * 1.5, (current/100) * (Math.PI * 2) + (Math.PI * 1.5));
		context.stroke();

		context.fillText(currentTemp, 200, 200);

		current++;
		if(current < currentTemp){
			requestAnimationFrame(function(){
				animate(current);
			})
		}
	}

});

