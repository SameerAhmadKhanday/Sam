// Initialize the map with the default location set to Jammu and Kashmir (Srinagar)
var map = L.map('map').setView([34.0837, 74.7973], 8);
// Add an OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create an array of district markers with names and coordinates for 10 districts
var districtMarkers = [
    {
        name: 'Srinagar',
        location: [34.0837, 74.7973]
    },
    {
        name: 'Jammu',
        location: [32.7266, 74.8570]
    },
    {
        name: 'Udhampur',
        location: [32.9252, 75.1419]
    },
    {
        name: 'Pulwama',
        location: [33.8713, 74.8989]
    },
    {
        name: 'Anantnag',
        location: [33.7315, 75.1545]
    },
    {
        name: 'Baramulla',
        location: [34.1968, 74.3503]
    },
    {
        name: 'Kathua',
        location: [32.3700, 75.5167]
    },
    {
        name: 'Rajouri',
        location: [33.3870, 74.3024]
    },
    {
        name: 'Doda',
        location: [33.1389, 75.5493]
    },
    {
        name: 'Kupwara',
        location: [34.5274, 74.3779]
    }
];

// Add district markers to the map and set up click event handlers
districtMarkers.forEach(function(markerInfo) {
    var marker = L.marker(markerInfo.location).addTo(map);
    marker.bindPopup(markerInfo.name);

    marker.on('click', function(e) {
        // Fetch seller data from the JSON file
        fetch('sellers.json') // Replace 'sellers.json' with the path to your JSON file
            .then(response => response.json())
            .then(sellersData => {
                // Call the function to display sellers for a specific district
                const districtName = markerInfo.name; // Use the district name from the clicked marker
                displaySellersForDistrict(districtName, sellersData);
            })
            .catch(error => {
                console.error('Error fetching sellers data:', error);
            });
    });
});

// Function to display sellers for a specific district
function displaySellersForDistrict(districtName, sellersData) {
    if (!Array.isArray(sellersData)) {
        console.error('Invalid sellers data:', sellersData);
        return;
    }

    const sellersInDistrict = sellersData.filter(seller => seller.district === districtName);
    const sellersList = document.getElementById('sellers-list');
    sellersList.innerHTML = ''; // Clear previous results

    if (sellersInDistrict.length === 0) {
        sellersList.innerHTML = '<p>No sellers found for this district.</p>';
    } else {
        sellersInDistrict.forEach(seller => {
            const sellerElement = document.createElement('div');
            sellerElement.classList.add('seller');

            const sellerName = document.createElement('p');
            sellerName.textContent = `Seller: ${seller.name}`;

            const products = document.createElement('p');
            products.textContent = `Products: ${seller.products.join(', ')}`;

            sellerElement.appendChild(sellerName);
            sellerElement.appendChild(products);

            sellersList.appendChild(sellerElement);
        });
    }
}
