let searchButton = document.querySelector('.searchinput i')

function searchRender(){

    let searchInput = document.querySelector('.searchinput input').value
    let renderSection = document.querySelector('.playlistrender')
    let pattern = new RegExp(`${searchInput}`, 'i')

    let searchResult = allSongs.filter((x) => (pattern.test(x.name) || pattern.test(x.artiste)))


    if(searchResult.length > 0){

        renderSection.innerHTML = ''

        for(i = 0; i < searchResult.length; i++){
            renderSection.innerHTML += `
            <div class="playitem">
                        <div class="playitem-img">
                            <img src=".${searchResult[i].image}" alt="">
                            <span class="cardicons">
                                <i class="material-icons playsrc" pltindex= ${i} >play_arrow</i>
                            </span>
                        </div>
                        <div class="playitem-index">
                        ${i+1}
                        </div>
                        <div class="playitem-details">
                            <div class="songname">
                            ${searchResult[i].name}
                            </div>
                            <div class="songmeta">
                                Song &bull; ${searchResult[i].artiste}
                            </div>
                        </div>
            </div>
            `
        }

        document.querySelectorAll('#search .playitem .playsrc').forEach(
            x => {
                x.addEventListener('click', () => {
                    currentlyPlaying[0] = allSongs.indexOf(searchResult[x.getAttribute('pltindex')])
                    currentlyPlaying[1] = allSongs
                    loadMusic()
                    playMusic()
                }) 
            }
        )
    }
    else{
        renderSection.innerHTML =
         `<p style="text-align: center">No Results Available</p>`
    }

}

searchButton.addEventListener('click', searchRender)

