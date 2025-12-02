// عناصر DOM
let cover = document.getElementById("music-cover");
let title = document.getElementById("music-title");
let artist = document.getElementById("music-artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const seekBar = document.getElementById("seek-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
let audioElem = document.querySelector('.audio')
let bodyElem = document.querySelector('body')
let playIcon = document.querySelector('.play')
let pauseIcon = document.querySelector('.pause')

// لیست آهنگ ها
const songs = [
    {
        title: "تعــــــــــــــلیم",
        artist: "مولوی عبدالصمد صمیم",
        src: "./audio/تعلیم.mp3",
        cover: "./image/1.jpg"
    },
    {
        title: "د جانان کلی",
        artist: "مولوی عبدالصمد صمیم",
        src: "./audio/د جانان کلی.mp3",
        cover: "./image/2.jpg"
    },
    {
        title: "د چا هجر",
        artist: "احسان الله حقیار",
        src: "./audio/د چا هجر.mp3",
        cover: "./image/3.jpg"
    },
    {
        title: "tukisch song",
        artist: "ozga trur",
        src: "./audio/turkish song.mp3",
        cover: "./image/4.jpg"
    },
    {
        title: "شهـــــــــــــادت",
        artist: "مولوی فقیر محمحد درویش",
        src: "./audio/شهادت.mp3",
        cover: "./image/5.jpg"
    },
    {
        title: "arabic song",
        artist: "abdulqasem",
        src: "./audio/arabic song.mp3",
        cover: "./image/6.jpg"
    }

];

let isPlaying = false;


function playSong() {
    isPlaying = true
    audioElem.play()
}

function pauseSong() {
    isPlaying = false
    audioElem.pause()
}

playBtn.addEventListener('click', function () {
    if (isPlaying) {
        pauseSong()
        pauseIcon.style.display = "none"
        playIcon.style.display = "block"
    } else {
        playSong()
        pauseIcon.style.display = "block"
        playIcon.style.display = "none"
    }
})

function loadSong(song) {
    cover.src = song.cover
    audioElem.src = song.src
    title.innerHTML = song.title
    artist.innerHTML = song.artist
}
let songIndex = 0

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
    pauseIcon.style.display = "block"
    playIcon.style.display = "none"
}
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
    pauseIcon.style.display = "block"
    playIcon.style.display = "none"
}

audioElem.addEventListener("timeupdate", () => {
    seekBar.value = (audioElem.currentTime / audioElem.duration) * 100;
    currentTimeEl.textContent = formatTime(audioElem.currentTime);
    totalTimeEl.innerHTML = formatM(audioElem.duration)
});

seekBar.addEventListener("input", () => {
    audioElem.currentTime = (seekBar.value / 100) * audioElem.duration;
});

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function formatM(sec){
    if(isNaN(sec)){
        return "00:00"
    }
    const minutes = Math.floor( sec/ 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

loadSong(songs[songIndex])

nextBtn.addEventListener('click', nextSong)
audioElem.addEventListener('ended', nextSong)
prevBtn.addEventListener('click', prevSong)








