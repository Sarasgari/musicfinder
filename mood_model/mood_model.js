// mood_model.js
import * as tf from '@tensorflow/tfjs';

const moodModel = await tf.loadLayersModel('https://path/to/mood_model/model.json');

function analyzeMood(input) {
  // Preprocess the input
  const inputData = preprocessInput(input);

  // Make a prediction
  const prediction = moodModel.predict(inputData);

  // Get the mood label with the highest probability
  const moodLabel = getMoodLabel(prediction);

  return moodLabel;
}

function preprocessInput(input) {
  // Preprocess the input here
}

function getMoodLabel(prediction) {
  // Get the mood label with the highest probability here
}

export { analyzeMood };

// script.js
import { analyzeMood } from './mood_model.js';

const accessToken = 'YOUR_ACCESS_TOKEN';
const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const playlist = document.getElementById('playlist');

searchButton.addEventListener('click', () => {
  const moodLabel = analyzeMood(searchInput.value);
  searchSongs(moodLabel);
});

function searchSongs(moodLabel) {
  const query = `mood:${moodLabel} track`;

  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
    headers: headers
  })
  .then(response => response.json())
  .then(data => {
    displaySearchResults(data.tracks.items);
  })
  .catch(error => {
    console.error(error);
  });
}

function displaySearchResults(results) {
  searchResults.innerHTML = '';
  for (let i = 0; i < results.length; i++) {
    const song = results[i];
    const songElement = document.createElement('li');
    songElement.textContent = song.name;
    songElement.addEventListener('click', () => {
      addToPlaylist(song);
    });
    searchResults.appendChild(songElement);
 
