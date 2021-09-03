require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require("node-fetch");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));


const geoUrl = 'http://api.geonames.org/searchJSON?q';
const weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const pixUrl = 'https://pixabay.com/api/?';

const geoKey = `ahmedmh_abo_thabet`;
const wKey = `108b51a6ef7746739c9fd91d36562ccb`;
const pKey = `22613073-65241989c0bfb452e733d0563`;

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'a5cb6b94184ba96f3ff1b4c1c232a94e';


// start defin getData function this function pring data from api and return them

const getData = async (destination) => {
let apiGeoUrl = `${geoUrl}=${destination}&maxRows=1&username=${geoKey}`;
const resG = await fetch(apiGeoUrl);
		try {
            const resGeo = await resG.json();
            const { name, countryName, lat, lng } = resGeo.geonames[0];
            const getRes = async (resGeo) => {

                const { name, countryName, lat, lng } = resGeo.geonames[0];
                // save urls in varaiables
                const apiWeatherUrl = `${weatherUrl}&lat=${lat}&lon=${lng}&days=3&key=${wKey}`;
                const apiPix_1_Url = `${pixUrl}key=${pKey}&q=${name}&image_type=photo&orientation=horizontal&category=travel&order=popular&per_page=3&pretty=true`;
                const apiPix_2_Url = `${pixUrl}key=${pKey}&q=${countryName}&image_type=photo&orientation=horizontal&category=travel&order=popular&per_page=3&pretty=true`;
                
                let weather;
                let pix1;
                let pix2;
                // fetch data from weatherbit api
                const resW = await fetch(apiWeatherUrl)
                    try{
                        const resWeather = await resW.json();
                        weather = resWeather;
                    }catch{
                    	console.log("error", error);
                    }
                // fetch first res from pixaby api
                const resP_1 = await fetch(apiPix_1_Url)
                    try{
                        const resPix1 = await resP_1.json();
                        pix1 = resPix1;
                        
                    }catch{
                    	console.log("error", error);
                    }
                // fetch second res from pixaby api
                const resP_2 = await fetch(apiPix_2_Url)
                    try{
                        const resPix2 = await resP_2.json();
                        pix2 = resPix2;

			        }catch{
				    	console.log("error", error);
    		        }

			return  [weather, pix1, pix2];
				
	    	}
            // assign responses to variables
            const all = await getRes(resGeo);
            const [weatherData, pixCity, pixCountry] = all;


            const pixData =
                pixCity.totalHits > 0
                    ? pixCity.hits[0]
                    : pixCountry.hits[0];


            const destionation =
                name === countryName 
                ? countryName 
                : `${name}, ${countryName}`;


            const apiData = {
                destination: destionation,
                weather: weatherData.data,
                pic: pixData,
		}		

		return apiData;
		} catch(error) {
			console.log("error", error);
		}
	
};


// Create trip data
app.post('/trip', async (req, res) => {
	try {
		const destination = encodeURI(req.body.input);
		const data = await getData(destination);
		res.send(data);
	} catch (err) {
		console.error(err);
	}
});



const port = process.env.PORT || 8009;
app.listen(port, () => console.log(`Travel app listening on port ${port}`));


