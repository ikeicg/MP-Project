// MVC - Model Section 


let playPauseBtn = document.querySelector('#play-pause')
let musicBar = document.querySelector('#smallmp')
let bigTrackImg = document.querySelector('.bigtrackimage img')
let playlistSection = document.querySelector(".bigplaylist .playlistrender2")
let smallTrackImg = document.querySelector(".trackimg img")
let trackName = document.querySelector("#trackname")
let trackArtiste = document.querySelector("#trackartiste")
let trackAudio = document.querySelector("#trackaudio audio")
let nextBtn = document.querySelector(".trackcontrols #skipnext")
let prevBtn = document.querySelector(".trackcontrols #skipprev")
let progressBar = document.querySelector("#progressbar")
let progressArea = document.querySelector("#progressarea")
let currentTimeSpan = document.querySelector("#currenttime")
let durationTimeSpan = document.querySelector("#duration")
let playbackControls = document.querySelector(".controls2 .playlistcontrols")
let showMore = document.querySelector(".controls2 .showmore")
let bigMp = document.querySelector("#bigmp")
let wholeMp = document.querySelector("#mpfooter")





// MVC - View Section



function playMusic(){
    musicBar.classList.remove('paused')
    trackAudio.play()
    playPauseBtn.textContent = 'pause'
}

function pauseMusic(){
    musicBar.classList.add('paused')
    trackAudio.pause()
    playPauseBtn.textContent = 'play_arrow'
}

function loadMusic(){
    let playlist = currentlyPlaying[1]
    let songIndex = currentlyPlaying[0]

    bigTrackImg.src = `.${playlist[songIndex].image}`
    smallTrackImg.src = `.${playlist[songIndex].image}`
    trackName.textContent = playlist[songIndex].name 
    trackArtiste.textContent = playlist[songIndex].artiste
    trackAudio.src = `.${playlist[songIndex].source}`
    wholeMp.style.display = 'block'

    playlistSection.innerHTML = ''
    for(i = 0; i < playlist.length; i++){

        playlistSection.innerHTML += `
        <div class="playitem2">
            <div class="playitem-img2">
                <img src=".${playlist[i].image}" alt="">
                <span class="cardicons2">
                    <i class="material-icons playsrc" pltindex= ${i} >play_arrow</i>
                </span>
            </div>
            <div class="playitem-index2">
                ${i+1}
            </div>
            <div class="playitem-details2">
                <div class="songname">
                    ${playlist[i].name}
                </div>
                <div class="songmeta">
                    Song &bull; ${playlist[i].artiste}
                </div>
            </div>
        </div>
        `
    }

    document.querySelectorAll('#bigmp .playsrc').forEach(
        x => {
            x.addEventListener('click', () => {
                currentlyPlaying[0] = x.getAttribute('pltindex')
                loadMusic()
                playMusic()
            })
        }
    )


    document.querySelectorAll('#bigmp .playsrc')[currentlyPlaying[0]].textContent = 'volume_up'
    document.querySelectorAll('#bigmp .cardicons2')[currentlyPlaying[0]].style.opacity = '1'


}


// MVC Controller Section 




// play and pause music 

playPauseBtn.addEventListener('click', () => {
    let musicPaused = musicBar.classList.contains('paused');
    musicPaused ? playMusic()  : pauseMusic()
})


// play next and prev song

prevBtn.addEventListener('click', () => {
    
    if(playbackControls.textContent == 'shuffle'){
        let randIndex = Math.floor(Math.random() * currentlyPlaying[1].length)
        while(randIndex == currentlyPlaying[0]){
            randIndex = Math.floor(Math.random() * currentlyPlaying[1].length)
        }
        currentlyPlaying[0] = randIndex;
    }
    else{
        currentlyPlaying[0]-- ;
        currentlyPlaying[0] < 0 ? currentlyPlaying[0] = currentlyPlaying[1].length - 1 : currentlyPlaying[0] = currentlyPlaying[0]
    }
    loadMusic()
    playMusic()
} )

nextBtn.addEventListener('click', () => {

    if(playbackControls.textContent == 'shuffle'){
        let randIndex = Math.floor(Math.random() * currentlyPlaying[1].length)
        while(randIndex == currentlyPlaying[0]){
            randIndex = Math.floor(Math.random() * currentlyPlaying[1].length)
        }
        currentlyPlaying[0] = randIndex;
    }
    else{
        currentlyPlaying[0]++ ;
        currentlyPlaying[0] > currentlyPlaying[1].length - 1  ? currentlyPlaying[0] = 0 : currentlyPlaying[0] = currentlyPlaying[0]
    }

    loadMusic()
    playMusic()
} )



//adjust progress bar with song progress and current time

trackAudio.addEventListener('timeupdate', (e) => {
    let currentTime = e.target.currentTime
    let songDuration = e.currentTarget.duration;
    progressBar.style.width = `${(currentTime/songDuration)*100}%`

    let totMins = Math.floor(currentTime / 60)
    let totSecs = Math.floor(currentTime % 60)

    totSecs < 10 ? totSecs = `0${totSecs}` : totSecs = totSecs
    currentTimeSpan.innerHTML = `${totMins}:${totSecs}`

})


//set song duration

trackAudio.addEventListener('loadeddata', () => {
    let songDuration = trackAudio.duration
    let totMins = Math.floor(songDuration / 60)
    let totSecs = Math.floor(songDuration % 60)

    totSecs < 10 ? totSecs = `0${totSecs}` : totSecs = totSecs
    durationTimeSpan.innerHTML = `${totMins}:${totSecs}`
})

//Adjust song time with progress bar

progressArea.addEventListener('click', (e) => {
    clickedWidth = e.offsetX
    areaWidth = e.currentTarget.clientWidth
    trackAudio.currentTime = ((clickedWidth/areaWidth)*trackAudio.duration)
})


//Shuffle, repeatall, repeatone functionality

playbackControls.addEventListener('click', () => {
    let controlText = playbackControls.textContent;

    switch(controlText){

        case 'repeat':
            playbackControls.textContent = 'repeat_one'
            break;
        
        case 'repeat_one':
            playbackControls.textContent = 'shuffle'
            break;
        
        case 'shuffle':
            playbackControls.textContent = 'repeat'
            break;

    }
})

trackAudio.addEventListener('ended', () => {
    let controlText = playbackControls.textContent;

    switch(controlText){

        case 'repeat':
            currentlyPlaying[0]++ ;
            currentlyPlaying[0] > currentlyPlaying[1].length - 1  ? currentlyPlaying[0] = 0 : currentlyPlaying[0] = currentlyPlaying[0]
            loadMusic()
            playMusic()
            break;
        
        case 'repeat_one':
            trackAudio.currentTime = 0;
            playMusic()
            break;
        
        case 'shuffle':
            let randIndex = Math.floor(Math.random() * currentlyPlaying[1].length)
            while(randIndex == currentlyPlaying[0]){
                randIndex = Math.floor(Math.random() * currentlyPlaying[1].length)
            }
            currentlyPlaying[0] = randIndex;
            loadMusic()
            playMusic()
            break;

    }

})


//Open and close big player

showMore.addEventListener('click', () => {
    let controlText = showMore.textContent

    switch(controlText){
        
        case 'arrow_drop_down':
            showMore.textContent = 'arrow_drop_up'
            bigMp.style.display = 'flex'
            break;
        
        case 'arrow_drop_up':
            showMore.textContent = 'arrow_drop_down'
            bigMp.style.display = 'none'
            break;
    }
})
