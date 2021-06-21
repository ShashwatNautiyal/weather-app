const weatherAPI = () => {
	apiKey = '14fdec5bf6367e939e39d43cf46d35af';

	// Fetch Weather
	const fetchWeather = (city) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
		)
			.then((response) => response.json())
			.then((data) => displayWeather(data));
	};

	const displayWeather = (data) => {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;

		document.body.style.backgroundImage = `url(https://source.unsplash.com/1200x700/?${name})`;
		document.querySelector('.city').innerHTML = `Current Weather in ${name}`;
		document.querySelector('.temperature').innerHTML = `${Math.floor(temp)}°C`;
		document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${icon}.png`;
		document.querySelector('.description').innerHTML = `${description}`;
		document.querySelector('.humidity').innerHTML = `Humidity: ${humidity}%`;
		document.querySelector('.wind-speed').innerHTML = `Speed: ${speed} Km/s`;
		document.querySelector('.weather-info').classList.remove('loading');
	};

	const defaultWeather = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			const revApiKey = 'jkhgrt897lognn4vjhvtyf672l5wmhu5';

			fetch(
				`https://cors-anywhere.herokuapp.com/https://apis.mapmyindia.com/advancedmaps/v1/${revApiKey}/rev_geocode?lat=${latitude}&lng=${longitude}`
			)
				.then((response) => response.json())
				.then((data) => getCityName(data));
		});
	};

	const getCityName = (data) => {
		const { city } = data.results[0];
		fetchWeather(city);
	};

	const search = () => {
		fetchWeather(document.querySelector('.search-bar input').value);
	};

	document.querySelector('.button').addEventListener('click', () => {
		search();
	});

	document.querySelector('.search-bar input').addEventListener('keyup', (event) => {
		if (event.key === 'Enter') {
			search();
		}
	});

	defaultWeather();
};

weatherAPI();
