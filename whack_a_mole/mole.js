let currentMoleTile;
let currentPlantTileFirst;
let currentPlantTileSecond;
let currentPlantTileThird;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {

    for (let i=0; i<9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
        tile.addEventListener("click", selectTile);
    }

    setInterval(setMole, 700);
    setInterval(setPlant, 700);
}

function randomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {

    if(gameOver){
        return;
    }
    
    if(currentMoleTile){
        currentMoleTile.innerHTML = "";
    };
    let mole = document.createElement("img");
    mole.src = "./images/monty-mole.png";

    let num = randomTile();

    while (num === currentPlantTileFirst?.id || num === currentPlantTileSecond?.id || num === currentPlantTileThird?.id) {
        num = randomTile();
    }

    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant() {

    if(gameOver){
        return;
    }

    if (currentPlantTileFirst) currentPlantTileFirst.innerHTML = "";
    if (currentPlantTileSecond) currentPlantTileSecond.innerHTML = "";
    if (currentPlantTileThird) currentPlantTileThird.innerHTML = "";

    let tiles = [];
    while (tiles.length < 3) {
        let num = randomTile();
        if (num !== currentMoleTile?.id && !tiles.includes(num)) {
            tiles.push(num);
        }
    }

    let plant1 = document.createElement("img");
    plant1.src = "./images/piranha-plant.png";
    currentPlantTileFirst = document.getElementById(tiles[0]);
    currentPlantTileFirst.appendChild(plant1);

    let plant2 = document.createElement("img");
    plant2.src = "./images/piranha-plant.png";
    currentPlantTileSecond = document.getElementById(tiles[1]);
    currentPlantTileSecond.appendChild(plant2);

    let plant3 = document.createElement("img");
    plant3.src = "./images/piranha-plant.png";
    currentPlantTileThird = document.getElementById(tiles[2]);
    currentPlantTileThird.appendChild(plant3);
}

function selectTile() {

    this.classList.add("clicked");

    setTimeout(() => {
        this.classList.remove("clicked");
    }, 200);

    if(gameOver){
        return;
    }

    if(this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();     
    }
    else if (this == currentPlantTileFirst || 
            this == currentPlantTileSecond || 
            this == currentPlantTileThird) {

        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();

    }
}