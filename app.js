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

		document.body.style.backgroundImage = `url(https://source.unsplash.com/1920x1080/?${name})`;
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
			const revApiKey = 'pk.1f35a28001b9024ffb07a3be6b263ad7';

			fetch(
				`https://us1.locationiq.com/v1/reverse.php?key=${revApiKey}&lat=${latitude}&lon=
				${longitude}&format=json`
			)
				.then((response) => response.json())
				.then((data) => getCityName(data));
		});
	};

	const getCityName = (data) => {
		console.log(data.address.state);
		fetchWeather(data.address.city);
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
