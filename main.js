import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';

document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="leading">Images from the <span class="mars">Mars</span> Plane</h1>
    <p class="title">NASA REEL</p>
    <div id="photos-container"></div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'DEMO_KEY'; // Use 'DEMO_KEY' for testing, replace with your own key if needed
    const sol = 1000; // Mars sol number
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const photos = data.photos;
            const photosContainer = document.getElementById('photos-container');

            if (photos.length === 0) {
                photosContainer.innerHTML = '<p>No photos available for this sol.</p>';
                return;
            }

            // Create a container for each photo and its information
            photos.forEach(photo => {
                const photoWrapper = document.createElement('div');
                photoWrapper.classList.add('photo-wrapper');

                const img = document.createElement('img');
                const info = document.createElement('p');
                
                img.src = photo.img_src;
                img.alt = `Mars photo taken by rover Curiosity on sol ${sol}`;
                img.classList.add('photo');
                
                info.textContent = `Date: ${photo.earth_date}, Rover: ${photo.rover.name}`;
                info.classList.add('photo-info');

                photoWrapper.appendChild(img);
                photoWrapper.appendChild(info);
                photosContainer.appendChild(photoWrapper);
            });

            // Apply flexbox styling to the container
            photosContainer.style.display = 'flex';
            photosContainer.style.flexWrap = 'wrap'; // Allows wrapping of items
            photosContainer.style.gap = '10px'; // Adds space between items
            photosContainer.style.overflowY = 'auto'; // Makes container scrollable if needed
            photosContainer.style.height = '600px';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('photos-container').innerHTML = '<p>Failed to load photos.</p>';
        });
});
