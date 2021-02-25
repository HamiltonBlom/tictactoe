document.addEventListener("DOMContentLoaded", game)

//0 = tomt, 1 = x, -1 = o
function game(){
    var player = 1;
    var haswon = false;
    var button = document.querySelector("button");
    var bräde = new Array(3). fill().map(() => new Array (3).fill(0));
    let tiles = [...document.querySelectorAll(".button div")];
    button.addEventListener("click", () => {
        reset();
    })
    for(const [i, tile] of tiles.entries())
        tile.addEventListener("click", () => { //lägger clickevent på alla tiles
            var [x,y] = convert1dto2d(i, bräde)
            if(bräde [x][y] === 0 &&! haswon){
                bräde[x][y] = player;
                render();
                playertoggle();
                var winner = checkwin(bräde);
                if(winner){
                    haswon = true;
                    for(let tile of winner.rank){
                        tiles [tile].classList.add("winner");
                    }
                }
            }
        })
    function render(){ //reflekterar js-brädet till html
        var n = 0;
        for(i = 0; i < bräde.length; i++){
            for(j = 0; j < bräde[i].length; j++){
                tiles[n].innerHTML = bräde[j][i] === 1?"x":bräde[j][i] === -1? "o":"";
                tiles[n].classList = [""]
                n++;
            }
        }
    }
    render();
    function playertoggle(){ //växlar spelare
        player = player === 1?-1:1;
    }
    function reset(){
        bräde = new Array(3). fill().map(() => new Array (3).fill(0));
        haswon = false;
        render();
    }
}
function convert1dto2d(i, arr){ //tar fram kordinater till den n:te tilen
    var n = 0;
    for(y = 0; y < arr.length; y++)
        for(x = 0; x < arr[y].length; x++) {
            if(n === i)
                return [x, y];
            n++;
        }
}
function checkwin(bräde){
    var rader = [
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ];
    var collumn = [
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];
    var diagonal = [
        [0,4,8],
        [2,4,6]
    ];
    var ranks = [rader,collumn,diagonal].flat();
    for(rank of ranks){
        var parsed = rank.map(function(tile){
            var [x,y] = convert1dto2d(tile, bräde);
            return bräde[x][y];
        })
        .join("");
        if(parsed === "111"){
            return {rank, player:1}
        }
        else if(parsed === "-1-1-1"){
            return {rank, player:-1}
        }
    }
}