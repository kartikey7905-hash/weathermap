 // 1. Initialize the map with no default zoom controls and hide attribution
    // Starting coordinates are for Durgapur [23.484, 87.311]
    let map = L.map('map',{
        zoomControl : true,
        attributionControl : false // this also helps me to delete logo OSM/Link

    }).setView([23.484, 87.311], 12);

    // 2. Add Map Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // 3. Create a Marker
    let marker = L.marker([23.484, 87.311]).addTo(map);

    async function getWeatherData() {
        const apiKey = "97de47f506244cd5bd0201638261501";
        const query = document.getElementById('locInput').value;
        
        if (!query) return alert("Please enter a location!");

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                // Show info display
                document.getElementById('weatherDisplay').style.display = 'block';

                // Update Weather Details
                document.getElementById('resLoc').innerText = data.location.name;
                document.getElementById('resRegion').innerText = `${data.location.region}, ${data.location.country}`;
                document.getElementById('resTemp').innerText = `${data.current.temp_c}°C`;
                document.getElementById('resCondition').innerText = data.current.condition.text;
                document.getElementById('resIcon').src = "https:" + data.current.condition.icon;

                // Update Map Position
                const lat = data.location.lat;
                const lon = data.location.lon;
                map.setView([lat, lon], 13);
                marker.setLatLng([lat, lon]).bindPopup(`Weather at ${data.location.name}`).openPopup();

            } else {
                alert("Location not found. Please try again.");
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Error connecting to the weather service.");
        }
    }