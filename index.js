
const options = {
    method: 'GET',
    headers: { accept: 'application/json' }

};


const apiKey = "fDlWzaajm0HXSGLEzOGpdJT18Mf2hyWT"



function fetchdata (location){

    fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${apiKey}`, options)
    .then(response => response.json())
    .then(response => {
        console.log(response); // Log the full response to inspect its structure

        const data = response.data;
        const location = response.location;

        // Check if data and location exist
        if (!data || !location) {
            console.error("API response is missing expected data or location information:", response);
            return;
        }

        const { temperature, humidity, windSpeed } = data.values;

        // Update the DOM with the data
        document.querySelector(".city").innerHTML = location.name || "N/A";
        document.querySelector(".temp").innerText = `${Math.round(temperature) || "N/A"} °C`;
        document.querySelector(".humidity").innerHTML = `${humidity || "N/A"}%`;
        document.querySelector(".wind").innerHTML = `${windSpeed || "N/A"} km/hr`;



       
    })
    .catch(err => console.error(err)); 
}

fetchdata("New Delhi")

document.querySelector('.search button').addEventListener('click', () => {
    const city = document.querySelector('.search input').value;

    if(city) {
        fetchdata(city)
    }
})




