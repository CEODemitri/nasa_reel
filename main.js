import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="leading">Images from the <span class="mars">Mars</span> Plane</h1>
    <p class="title">NASA REEL</p>
    <div id="photos-container"></div>
  </div>
`

// use nasa api
// nasa image and video library
// 4 endpoints GET https://images-api.nasa.gov
// endpoints
// /search
// /asset/{nasa_id}
// /metadata/{nasa_id}
// /captions/{nasa_id}
// /album/{album_name}


// this below works, saving it for not overcalling
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'DEMO_KEY'; // Use 'DEMO_KEY' for testing, replace with your own key if needed
    const sol = 1000; // Mars sol number
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
          // grab first ten photos
            const photos = data.photos;
            const photosContainer = document.getElementById('photos-container');

            if (photos.length === 0) {
                photosContainer.innerHTML = '<p>No photos available for this sol.</p>';
                return;
            }

            // Create image elements for each photo and append to the container
            photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.img_src;
                img.alt = `Mars photo taken by rover Curiosity on sol ${sol}`;
                img.classList.add('photo');
                photosContainer.appendChild(img);
                // add flex to container and center elements
                photosContainer.style.display = 'flex';
                photosContainer.style.justifyContent = 'center';
                photosContainer.style.alignItems = 'center';
                // make scrollable
                photosContainer.style.overflowY ='scroll';
                photosContainer.style.height = '600px';
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('photos-container').innerHTML = '<p>Failed to load photos.</p>';
        });
});
