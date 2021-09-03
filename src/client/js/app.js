import dayjs from './plugin/dayjs';
import { nanoid } from 'nanoid';


// start app function

function app (){

// primary object with default placeholder
	const state = {
		trip: {
			id: 0,
			destination: '',
			pic: {},
			weather: [],
			date: {},
		},
		savedTrip: [],
	};
	const tripsList = document.querySelector('#trips-list');
	const submitBtn = document.querySelector('#submit-btn');
	
	
	// get input from user
	function getTripInfo() {
	  const city = document.querySelector('#city').value;
		const start = document.querySelector('#start').value;
		const end = document.querySelector('#end').value;
	
	  const info = {
	  input: city,
	  start: start,
	  end: end,
	};
	
	return info;
	}
	

	// validate_date function check if date input is vaild it use dayjs
	function validate_Date (start, end) {
		let validation = true;
		const { $y, $M, $D } = dayjs();
		const today = `${$y}-${$M + 1}-${$D}`;
	
		const tsToday = dayjs(today);
		const tsStart = dayjs(start);
		const tsEnd = dayjs(end);
	
		const validStart = tsStart.isSameOrAfter(today);
		const validEnd = tsStart.isSameOrBefore(tsEnd);
	
		// If ok then
		if (validStart && validEnd) {
			const countdown =
				tsToday.to(tsStart) === 'a few seconds ago'
					? 'in 0 day'
					: tsToday.to(tsStart);
	
			state.trip.date = {
				start: start,
				end: end,
				countdown: countdown,
			};
			return validation;
		}
	
		return !validation;
	};
	
	// start send data to server
	const sendData = async (url , data) => {
		const res = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		}).then((response) => response.json())
  		  .then((data) => {
			// after response assign data to state object
			state.trip.id =`a${nanoid()}`;
			state.trip.destination = data.destination;
			console.log(data.destination);
			state.trip.pic = {
				url: data.pic.webformatURL,
				alt: data.pic.tags,
			};
			state.trip.weather = data.weather.map(item => {
				return {
					date: item.datetime,
					icon: item.weather.icon,
					alt: item.weather.description,
					high: item.max_temp,
					low: item.min_temp,
					rain: item.pop,
				};
			});

  });
		//  .catch (err) {
		// 	throw err;
		// };
	}


	const updateStorage = () =>
	localStorage.setItem('trip', JSON.stringify(state.savedTrip));

	const addTrip = trip => {
		state.savedTrip.push({ ...trip });
		updateStorage();
		// location.reload();
	};



	//  create dynamic template for trip cards
	function createTripCard(trip) {
	return `
		<li class="trips-card" id="${trip.id}">
		<div class="trips-head">
			<div class="trips-info">
			<h3 class="trip-header">
				${trip.destination}
			</h3>
				<strong>${dayjs(trip.date.start).format('DD MMMM YYYY')}</strong>
			</div>
			<div class="trip-edit">
			<button class="btn del-btn" id="${trip.id}"><i class="fas fa-trash-alt"></i></button>
			</div>
		</div>
		<div class="trip-content">
			<div class="trip-image">
			<img src="${trip.pic.url}" alt="${trip.pic.alt}">
			</div>
			<div class="weather-container">
			<ul class="trip-weather">
			${trip.weather.map(createWeatherForecast).join('')}
			</ul>
			</div>
		</div>

		</li>
	`;
	}
	function createWeatherForecast(forecast) {

		return `
		<li class="weather-forecast">
		<span class="weather-forecast-date">${dayjs(forecast.date).format(
			'ddd, DD'
		)}</span>
		<div class="weather-forecast-icon">
			<img src="./media/${forecast.icon}.png" alt="${forecast.description}">
		</div>
		<div class="weather-forecast-meta">
			<span class="weather-forecast-temp">
			${Math.round(forecast.high)}° / ${Math.round(forecast.low)}°
			</span>
			<div class="weather-forecast-pop">
			<i class="umbrella icon"></i>
			<span class="weather-forecast-high">${forecast.rain}%</span>
			</div>
		</div>
		</li>
	`;
	}

	// combaine trips cards in one varible to assign it to trips list
	function upadateUi(trip) {
		let newTrip =  createTripCard(trip);
		return newTrip;
	}

	// event listener for submit button 
	submitBtn.addEventListener('click', (e) => {
		const tripInfo = getTripInfo();
		const { input, start, end } = tripInfo;
		const isValidDate = validate_Date(start, end);
		if(!isValidDate) {
			console.log('un vaild date')
			return;
		}
		
		const myPromise = new Promise ((resolve, reject)=>{
			resolve(
			sendData('/trip', tripInfo ),
			console.log('send data finshed'),

			)
			
		}).then(   //if ok then
			(resolve) => {
				addTrip(state.trip);
				location.reload();

			},
			(reject) => {//in not then
				console.log('promise rejected');
			}
		);


		
	});
	


	function reloadPage () {
		const localStorageTrips = JSON.parse(localStorage.getItem('trip'));
		if (localStorageTrips === null){
		state.savedTrip = [];

		} else {
			state.savedTrip = localStorageTrips;

			let fulList = state.savedTrip.map(upadateUi).join('');
			tripsList.innerHTML= fulList;
			createDelFun ();
		}

	console.log('reload finsh');
	}

	function delTrip (ID) {
		//get index that match id
		const removeIndex = state.savedTrip.findIndex( item => item.id === ID );
		//remove element with index remove
		state.savedTrip.splice( removeIndex, 1 );
		updateStorage();
	}


	//assign event for delete button
	function createDelFun () {
		let delBtns = document.querySelectorAll('.del-btn');
		let delBtnsArray = Array.from(delBtns);
		delBtnsArray.forEach(btn => {
			btn.addEventListener('click', () => {
			const delId = `#${btn.id}`;
			let tripsCard = document.querySelector(delId);
			delTrip(delId);
			tripsCard.remove();
			});
		});
	}

	window.onload = reloadPage;
	

}


export {
	app
}