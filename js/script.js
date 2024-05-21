// // Function to detect if the user is on a mobile device
// function isMobileDevice() {
//     return /Mobi|Android/i.test(navigator.userAgent);
// }

// // Redirect if not on a mobile device
// document.addEventListener('DOMContentLoaded', (event) => {
//     if (!isMobileDevice()) {
//         window.location.href = 'https://example.com/regular-website';
//     }
// });

var songs = [
    "airwaves.wav",
    "caterpillar.wav",
    "nosoap.wav",
    "santa.wav",
    "outro.wav"
];

var audio = new Audio(); 
var currentTrack = document.getElementById("current-track");
var isPlaying = false;
var currentIndex = -1;
var history = [];
var started = false;

function playPause() {
    if (!started){
        var nextSongIndex = Math.floor(Math.random() * songs.length);
        audio.src = songs[nextSongIndex];
        currentTrack.innerText = "Now Playing: " + songs[nextSongIndex];
    }
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
}

function skipSong() {
    var nextSongIndex = Math.floor(Math.random() * songs.length);
    audio.src = songs[nextSongIndex];
    currentTrack.innerText = "Now Playing: " + songs[nextSongIndex];
    audio.play();
    isPlaying = true;
    addToHistory(nextSongIndex);
}
function addToHistory(index) {
    currentIndex++;
    history[currentIndex] = index;
}

function previousSong() {
    if (currentIndex > 0) {
        currentIndex--;
        audio.src = songs[history[currentIndex]];
        currentTrack.innerText = "Now Playing: " + songs[history[currentIndex]];
        audio.play();
        isPlaying = true;
    }
}

audio.onplay = function() {
    isPlaying = true;
};

audio.onpause = function() {
    isPlaying = false;
};

audio.onended = function() {
    skipSong(); // Automatically play the next song when the current one ends
};