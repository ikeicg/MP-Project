//Banner Slides

let bannerGradients = [
    `linear-gradient(74.3deg, #44111c 17.4%, #5f1828 34.7%, #7a1f33 51.8%, #95263e 67.4%, #a32944 89.6%)`,
    `linear-gradient(111.4deg, rgb(246, 4, 26) 0.4%, rgb(251, 139, 34) 100.2%)`,
    `linear-gradient(177.9deg, rgb(58, 62, 88) 3.6%, rgb(119, 127, 148) 105.8%)`,
    `linear-gradient(75.7deg, rgb(34, 126, 34) 3.8%, rgb(99, 162, 17) 87.1%);`,
    `linear-gradient(to right, #c31432, #240b36)`,
    `linear-gradient(to right, #0f2027, #203a43, #2c5364)`,
    `linear-gradient(to right, #bbd2c5, #536976, #292e49)`,
]
    
let slideIndex = 0

function runSlides() {

    let slides = document.querySelectorAll('.bannerslide');

    if(slideIndex >= slides.length){ slideIndex = 0}

    for(i = 0; i < slides.length; i++){
        slides[i].style.display = 'none';
    }

    slides[slideIndex].style.background = bannerGradients[Math.floor(Math.random() * bannerGradients.length)]

    slides[slideIndex].style.display = 'flex';

    slideIndex++

    setTimeout(runSlides, 5000)

}

runSlides()


// Scroll Buttons

function scrollCard(arg){
    card = document.querySelector('#quickpick .songcards')
    if(arg == 'right'){
        card.scrollLeft += 100
    }
    else if (arg == 'left'){
        card.scrollLeft -= 100
    }
}

scrollR = document.getElementById('scroll-right');
scrollL = document.getElementById('scroll-left');
scrollR.addEventListener("click", () => {scrollCard('right')})
scrollL.addEventListener("click", () => {scrollCard('left')})



//Quick Picks

function generateQuickPicks(arr) {
    let result = [];

    while (result.length < 10) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
        if (!result.includes(item)){
            result.push(item)
        }
    }

    return result
}

let quickPicks = generateQuickPicks(allSongs);

function renderQuickPicks(){

    let renderSection = document.querySelector('.songcards');
    renderSection.innerHTML = ""

    for(i = 0; i < quickPicks.length; i++){
        renderSection.innerHTML += `
        <div class="songcard">
            <div class="songcard-img">
                <img src=".${quickPicks[i].image}" alt="">

                <i 
                class="material-icons cardicons playsrc" pltindex= ${i} >
                play_arrow</i>
            
            </div>
            <div class="songcard-details">
                <h4 class="songname">${quickPicks[i].name}</h4>
                <h5 class="artistename">${quickPicks[i].artiste}</h5>
            </div>
        </div>
        `
    }

    document.querySelectorAll('.songcard .playsrc').forEach(
        x => {
            x.addEventListener('click', () => {
                currentlyPlaying[0] = x.getAttribute('pltindex')
                currentlyPlaying[1] = quickPicks
                loadMusic()
                playMusic()
            })
        }
    )
}

renderQuickPicks()






