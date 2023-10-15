renderAllSongs();

function renderAllSongs() {
  document.querySelectorAll("#catalogue-render > *").forEach((x) => {
    x.style.display = "none";
  });

  document.querySelectorAll("#libraryselect > *").forEach((x) => {
    x.classList.remove("selected");
  });

  document.querySelector("#selectAllSongs").classList.add("selected");

  let renderSection = document.querySelector("#all-songs");
  renderSection.style.display = "grid";
  renderSection.innerHTML = "";

  let result = allSongs.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  for (i = 0; i < result.length; i++) {
    renderSection.innerHTML += `
        <div class="songcard">
            <div class="songcard-img">
                <img src=".${result[i].image}" alt="">

                <i class="material-icons cardicons playsrc" pltindex=${i}>play_arrow</i>
            
            </div>
            <div class="songcard-details">
                <h4 class="songname">${result[i].name}</h4>
                <h5 class="artistename">${result[i].artiste}</h5>
            </div>
        </div>
        `;
  }

  document.querySelectorAll("#all-songs .songcard .playsrc").forEach((x) => {
    x.addEventListener("click", () => {
      currentlyPlaying[0] = x.getAttribute("pltindex");
      currentlyPlaying[1] = result;
      loadMusic();
      playMusic();
    });
  });
}

function renderGenre() {
  document.querySelectorAll("#catalogue-render > *").forEach((x) => {
    x.style.display = "none";
  });

  let renderSection = document.querySelector("#genres");

  document.querySelectorAll("#libraryselect > *").forEach((x) => {
    x.classList.remove("selected");
  });

  document.querySelector("#selectGenre").classList.add("selected");

  renderSection.style.display = "flex";
  renderSection.innerHTML = `
    <div class="genrelist">
                    <div class="genreitem" data-genre="afrobeats" >
                        <div class="genre-img">
                            <img src="./img/genreimg/afrobeats.png" alt="">
                            <i class="material-icons cardicons" >play_arrow</i>
                        </div>
                        <div class="genre-details">
                            <h4 class="genrename">Afro-Beats</h4>
                            <h5 class="genresize">${
                              allSongs.filter((x) => x.genre == "afrobeats")
                                .length
                            } songs</h5>
                        </div>
                    </div>

                    <div class="genreitem" data-genre="reggae">
                        <div class="genre-img">
                            <img src="./img/genreimg/reggae.png" alt="">
    
                            <i class="material-icons cardicons" >play_arrow</i>
                        
                        </div>
                        <div class="genre-details">
                            <h4 class="genrename">Reggae</h4>
                            <h5 class="genresize">${
                              allSongs.filter((x) => x.genre == "reggae").length
                            } songs</h5>
                        </div>
                    </div>

                    <div class="genreitem" data-genre="country">
                        <div class="genre-img">
                            <img src="./img/genreimg/country.png" alt="">
    
                            <i class="material-icons cardicons" >play_arrow</i>
                        
                        </div>
                        <div class="genre-details">
                            <h4 class="genrename">Country</h4>
                            <h5 class="genresize">${
                              allSongs.filter((x) => x.genre == "country")
                                .length
                            } songs</h5>
                        </div>
                    </div>

                    <div class="genreitem" data-genre="pop">
                        <div class="genre-img">
                            <img src="./img/genreimg/pop.png" alt="">
    
                            <i class="material-icons cardicons" >play_arrow</i>
                        
                        </div>
                        <div class="genre-details">
                            <h4 class="genrename">Pop</h4>
                            <h5 class="genresize">${
                              allSongs.filter((x) => x.genre == "pop").length
                            } songs</h5>
                        </div>
                    </div>

                    <div class="genreitem" data-genre="gospel">
                        <div class="genre-img">
                            <img src="./img/genreimg/gospel.png" alt="">
                            <i class="material-icons cardicons" >play_arrow</i>
                        </div>
                        <div class="genre-details">
                            <h4 class="genrename">Gospel</h4>
                            <h5 class="genresize">${
                              allSongs.filter((x) => x.genre == "gospel").length
                            } songs</h5>
                        </div>
                    </div>
                </div>

                <div class="playlistrender"> </div>
    `;

  document.querySelectorAll(".genreitem").forEach((x) => {
    x.addEventListener("click", (e) => {
      renderGenrePlaylist(e);
    });
  });
}

function renderGenrePlaylist(e) {
  document.querySelectorAll(".genrelist > *").forEach((x) => {
    x.classList.remove("selected");
  });
  e.currentTarget.classList.add("selected");

  let renderSection = document.querySelector(".playlistrender");
  renderSection.innerHTML = "";
  let result = allSongs.filter(
    (x) => x.genre == e.currentTarget.getAttribute("data-genre")
  );

  for (i = 0; i < result.length; i++) {
    renderSection.innerHTML += `
        <div class="playitem">
            <div class="playitem-img">
                <img src=".${result[i].image}" alt="">
                <span class="cardicons">
                    <i class="material-icons playsrc" pltindex= ${i} >play_arrow</i>
                </span>
            </div>
            <div class="playitem-index">
            ${i + 1}
            </div>
            <div class="playitem-details">
                <div class="songname">
                    ${result[i].name}
                </div>
                <div class="songmeta">
                    Song &bull; ${result[i].artiste}
                </div>
            </div>
        </div>
        `;
  }

  document.querySelectorAll("#genres .playitem .playsrc").forEach((x) => {
    x.addEventListener("click", () => {
      currentlyPlaying[0] = x.getAttribute("pltindex");
      currentlyPlaying[1] = result;
      loadMusic();
      playMusic();
    });
  });
}

function renderAutoPlaylist() {
  document.querySelectorAll("#catalogue-render > *").forEach((x) => {
    x.style.display = "none";
  });

  document.querySelectorAll("#libraryselect > *").forEach((x) => {
    x.classList.remove("selected");
  });

  document.querySelector("#selectAutoPlaylist").classList.add("selected");

  let renderSection = document.querySelector("#autoplaylist");
  renderSection.style.display = "block";
  renderSection.innerHTML = "";

  let result = generateRandomList(allSongs, 10);

  for (i = 0; i < result.length; i++) {
    renderSection.innerHTML += `
        <div class="playitem">
            <div class="playitem-img">
                <img src=".${result[i].image}" alt="">
                <span class="cardicons">
                    <i class="material-icons playsrc" pltindex= ${i} >play_arrow</i>
                </span>
            </div>
            <div class="playitem-index">
            ${i + 1}
            </div>
            <div class="playitem-details">
                <div class="songname">
                    ${result[i].name}
                </div>
                <div class="songmeta">
                    Song &bull; ${result[i].artiste}
                </div>
            </div>
        </div>
        `;
  }

  document.querySelectorAll("#autoplaylist .playitem .playsrc").forEach((x) => {
    x.addEventListener("click", () => {
      currentlyPlaying[0] = x.getAttribute("pltindex");
      currentlyPlaying[1] = result;
      loadMusic();
      playMusic();
    });
  });
}

function generateRandomList(arr, lent) {
  let result = [];

  while (result.length < lent) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    if (!result.includes(item)) {
      result.push(item);
    }
  }

  return result;
}

document
  .querySelector("#selectAllSongs")
  .addEventListener("click", renderAllSongs);
document.querySelector("#selectGenre").addEventListener("click", renderGenre);
document
  .querySelector("#selectAutoPlaylist")
  .addEventListener("click", renderAutoPlaylist);
