// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const fetch = require("node-fetch");

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cors());
// app.use(express.static('dist'));


// const geoUrl = 'http://api.geonames.org/searchJSON?q';
// const weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
// const pixUrl = 'https://pixabay.com/api/?';

// const geoKey = `ahmedmh_abo_thabet`;
// const wKey = `108b51a6ef7746739c9fd91d36562ccb`;
// const pKey = `22613073-65241989c0bfb452e733d0563`;

// let baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
// const apiKey = 'a5cb6b94184ba96f3ff1b4c1c232a94e';

// const getData = async (destination) => {
// let apiGeoUrl = `${geoUrl}=${destination}&maxRows=1&username=${geoKey}`;

// const resG = await fetch(apiGeoUrl);
// 		try {
// 		const resGeo = await resG.json();
// 		const { name, countryName, lat, lng } = resGeo.geonames[0];
// 		console.log(resGeo);
// 		console.log("getdata start");
		
// 		console.log(`name is ${name}`);

// 		const getRes = async (resGeo) => {

// 			const { name, countryName, lat, lng } = resGeo.geonames[0];
// 			const apiWeatherUrl = `${weatherUrl}&lat=${lat}&lon=${lng}&days=3&key=${wKey}`;
// 			console.log(apiWeatherUrl);
// 			const apiPix_1_Url = `${pixUrl}key=${pKey}&q=${name}&image_type=photo&orientation=horizontal&category=travel&order=popular&per_page=3&pretty=true`;
// 			const apiPix_2_Url = `${pixUrl}key=${pKey}&q=${countryName}&image_type=photo&orientation=horizontal&category=travel&order=popular&per_page=3&pretty=true`;
			

// 			let weather;
// 			let pix1;
// 			let pix2;

// 			const resW = await fetch(apiWeatherUrl)
// 				try{

// 					const resWeather = await resW.json();
// 					// console.log('resWeather');
// 					// console.log(resWeather);
// 					weather = resWeather;

// 				}catch{
// 					console.log('err');
// 				}
// 			const resP_1 = await fetch(apiPix_1_Url)
// 				try{

// 					const resPix1 = await resP_1.json();
// 					// console.log('resPix1');
// 					// console.log(resPix1);
// 					pix1 = resPix1;
					
// 				}catch{
// 					console.log('err');
// 				}
// 			const resP_2 = await fetch(apiPix_2_Url)
// 				try{

// 					const resPix2 = await resP_2.json();
// 					// console.log('resPix2');
// 					// console.log(resPix2);
// 					pix2 = resPix2;

// 				}catch{
// 					console.log('err');
// 				}
// 			// const resPix1 = await fetch(apiPix_1_Url);
// 			// const resPix2 = await fetch(apiPix_2_Url);


// 			return  [weather, pix1, pix2];
				
// 		}
// 		const all = await getRes(resGeo);
// 		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
// 		// console.log(all);
// 		const [weatherData, pixCity, pixCountry] = all;


// 		const pixData =
// 			pixCity.totalHits > 0
// 				? pixCity.hits[0]
// 				: pixCountry.hits[0];

// 		// console.log(pixData);

// 		const destionation =
// 			name === countryName 
// 			? countryName 
// 			: `${name}, ${countryName}`;

// 		// console.log(destionation);

// 		const apiData = {
// 			destination: destionation,
// 			weather: weatherData.data,
// 			pic: pixData,
// 		};

// 		// console.log(apiData);

// 		return apiData;
// 		} catch(error) {
// 			console.log("error", error);
// 		}
	
// };


// // Create trip data
// app.post('/trip', async (req, res) => {
// 	try {
// 		console.log("post func");
// 		console.log(req.body);
// 		const destination = encodeURI(req.body.input);
// 		const data = await getData(destination);
// 		// console.log("data res post");
// 		// console.log(data);
// 		res.send(data);
// 	} catch (err) {
// 		console.error(err);
// 	}
// });

// module.exports = app;



