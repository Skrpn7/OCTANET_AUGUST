console.log("welcome to spotify")

let songindex = 0;
let audioElement = new Audio('audio/0.mp3');
let masterplay = document.getElementById('masterplay');
let progressbar = document.getElementById("progressbar");
let gif = document.getElementById("gif");
let mastersongname = document.getElementById("mastersongname")
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songitemplay = Array.from(document.getElementsByClassName('songitemplay'))
console.log(songitemplay)


let song = [
    { songname: "Love & War", filePath: "audio/0.mp3", coverPath: "covers/lovewar.jpg" },
    { songname: "Shotgun", filePath: "audio/1.mp3", coverPath: "covers/shotgun.jpg" },
    { songname: "Till It Hurts", filePath: "audio/2.mp3", coverPath: "covers/till.jpg" },
    { songname: "Catch Me", filePath: "audio/3.mp3", coverPath: "covers/catch.jpg" },
    { songname: "Kaolo", filePath: "audio/4.mp3", coverPath: "covers/kaolo.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("Songname")[0].innerText = song[i].songname;
});


//play pause
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        //master to semi
        // songitemplay.forEach((element)=>{
        //     if(songindex==mm)
        // })

    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//event listener
audioElement.addEventListener('timeupdate', () => {
    //update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressbar.value = progress;
})

progressbar.addEventListener('change', () => {
    audioElement.currentTime = progressbar.value * audioElement.duration / 100;
})

const makeallplays = () => {

    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.add('fa-circle-play')
        element.classList.remove('fa-circle-pause')
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {

    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            songindex = parseInt(e.target.id);
            console.log(e.target)
            makeallplays();
            gif.style.opacity = 1;
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.currentTime = 0;
            mastersongname.innerText = song[songindex].songname;
            audioElement.src = `audio/${songindex}.mp3`;
            audioElement.play();
            masterplay.classList.add('fa-circle-pause')
            masterplay.classList.remove('fa-circle-play')
        }
        else {
            songindex = parseInt(e.target.id);
            makeallplays();
            gif.style.opacity = 1;
            e.target.classList.remove('fa-circle-pause')
            e.target.classList.add('fa-circle-play')
            audioElement.currentTime = 0;
            mastersongname.innerText = song[songindex].songname;
            audioElement.src = `audio/${songindex}.mp3`;
            masterplay.classList.add('fa-circle-play')
            masterplay.classList.remove('fa-circle-pause')
            audioElement.pause();
        }
    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 5) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.currentTime = 0;
    mastersongname.innerText = song[songindex].songname;
    audioElement.src = `audio/${songindex}.mp3`;
    audioElement.play();
    masterplay.classList.add('fa-circle-pause')
    masterplay.classList.remove('fa-circle-play')
})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex < 0) {
        songindex = 0;
    }
    else {
        songindex -= 1;
    }
    mastersongname.innerText = song[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.src = `audio/${songindex}.mp3`;
    audioElement.play();
    masterplay.classList.add('fa-circle-pause')
    masterplay.classList.remove('fa-circle-play')
})