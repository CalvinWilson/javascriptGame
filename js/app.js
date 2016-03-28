var array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I'];
var values = [];
var tile_ids = [];
var tiles_flipped = 0;

Array.prototype.tile_shuffle = function() {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard() {
    tiles_flipped = 0;
    var output = '';
    array.tile_shuffle();
    for (var i = 0; i < array.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + array[i] + '\')"></div>';
    }
    document.getElementById('board').innerHTML = output;
}

function memoryFlipTile(tile, val) {
    if (tile.innerHTML === "" && values.length < 2) {
        tile.style.background = 'white';
        tile.innerHTML = val;
        if (values.length === 0) {
            values.push(val);
            tile_ids.push(tile.id);
        } else if (values.length === 1) {
            values.push(val);
            tile_ids.push(tile.id);
            if (values[0] === values[1]) {
                tiles_flipped += 2;
                values = [];
                tile_ids = [];
                if (tiles_flipped === array.length) {
                    alert("Board cleared... generating new board");
                    document.getElementById('board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flipBack() {
                    var tile_1 = document.getElementById(tile_ids[0]);
                    var tile_2 = document.getElementById(tile_ids[1]);
                    tile_1.style.background = 'blue';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'blue';
                    tile_2.innerHTML = "";
                    values = [];
                    tile_ids = [];
                }
                setTimeout(flipBack, 800);
            }
        }
    }
}
