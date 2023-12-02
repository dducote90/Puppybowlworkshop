const puppyDiv = document.querySelector("#puppyDiv");
const singlePuppDiv = document.querySelector("#singlePuppDiv");
let player = [];

function removePuppy(index) {
  player.splice(index, 1);
  console.log(puppyDiv);
  renderPlayers();
}

window.addEventListener("hashchange", () => {
  renderPlayers();
});

async function getPlayers() {
  const response = await fetch(
    "https://fsa-puppy-bowl.herokuapp.com/api/2310/players"
  );
  const data = await response.json();
  player = data.data.players;
  renderPlayers();
}

function refreshPage() {
    location.reload()
  }

async function renderPlayers() {
  const playerList = player.map((pupp, index) => {
    return ` <div class="theDiv">
    
        <a href=#${pupp.name} class = "nameStyle">
        <h2>${pupp.name}</h2>
        <img class="image" src=${pupp.imageUrl} />
        <br>
        
        <a href=# >
        <center><button class="atags" onclick="removePuppy(${index})">Remove puppy from roster.</button></center>
        </a></div>`;
  });
  const name = window.location.hash.slice(1);
  const singlePupp = player.find((pupp) => {
    return pupp.name === name;
  });

  puppyDiv.innerHTML = singlePupp
    ? ""
    : "<button class = 'allPlayersButton' onclick='refreshPage()' ><center>All Players</button>" +
      `<div class = "allPuppies">${playerList.join("")}</div></center></a>`;
  if (singlePupp) {
    singlePuppDiv.innerHTML = `<center>
            <h1>Selected Puppy</h1>
            <div class="otherDiv">
            <h1>${singlePupp.name}</h1>
            </br>
            </br>
            <h2 class ="atag">${singlePupp.breed}</h2>
            </br>
            <h3 class = "atag">${singlePupp.status}</h3>
            <br>
            <p></p>
            <center><img class= "image" src=${singlePupp.imageUrl} height= auto width= 90% /></center>
            <br>
            <a href=# >
            <center><button class = "atags">See all Puppies</button></center>
            </a>
            </div>
            </center>`;
  } else {
    singlePuppDiv.innerHTML = "";
  }
}
 
getPlayers();
