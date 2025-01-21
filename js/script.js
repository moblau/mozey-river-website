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
    "Better Weather.mp3",
    "Carousel.mp3",
    "Dolby's Resistance.mp3",
    "Happy in a sea of doubt.mp3",
    "Hinges.mp3",
    "I know how you really feel.mp3",
    "Why not just let it all go.mp3",
    "Take me to the moon.mp3",
    "Somewhere, sometimes.mp3",
    "Takeoff.mp3",
    "What Else.mp3",
    "Tomorrow.mp3",
    "VIOLET LEAVES.mp3",
    "The Swings in 2023.mp3"
];

var audio = new Audio(); 
var currentTrack = document.getElementById("current-track");
var isPlaying = false;
var currentIndex = -1;
var history = [];
var started = false;
var playButton = document.querySelector('.play');

function playPause() {
    if (!started){
        var nextSongIndex = Math.floor(Math.random() * songs.length);
        audio.src = "music/" +songs[nextSongIndex];
        currentTrack.innerText = "Now Playing: " + songs[nextSongIndex];
        started = true;
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
    audio.src = "music/" + songs[nextSongIndex];
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
        audio.src = "music/" + songs[history[currentIndex]];
        currentTrack.innerText = "Now Playing: " + songs[history[currentIndex]];
        audio.play();
        isPlaying = true;
    }
}

audio.onplay = function() {
    isPlaying = true;
    playButton.classList.add('glow');

};

audio.onpause = function() {
    isPlaying = false;
    playButton.classList.remove('glow');

};

audio.onended = function() {
    skipSong(); // Automatically play the next song when the current one ends
};