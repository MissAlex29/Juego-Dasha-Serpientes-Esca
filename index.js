//Ancho y alto del tablero 
width = 9;
height = 9;

//Si tiro bien o no 
var hasWon = false;

//REGLAS
/*window.rollDice = () => {
  if (hasWon) {
    return;
  }

    //Variable para juagador actual 
  let currentPlayer = players[currentPlayerTurn];

  //Tira dado
  roll = Math.floor(Math.random()*5+1);

  //Muestra que número salio a cada jugador 
  console.log(currentPlayer.name +", Tiraste", roll); 
  
  //Mueve al jugador usando los dados solo si saca un 1
    if(currentPlayer.position === 0 && roll != 1){
      //Si no saca 1, se queda en su lugar 
      currentPlayer.position = 0; 
      console.log("Mala suerte, necesitas sacar 1") 
    } else {  
      //Sí saca 1, el numero obtenido se suma a la posición del jugador
      currentPlayer.position += roll;
      ladders.forEach(ladder => {//Busca escaleras 
      //si el comienzo de la escalera es igual a la posición del jugador
      if (ladder.start === currentPlayer.position) {
        console.log("Subes!!!"); 
        currentPlayer.position = ladder.end; // pasa al final de la escalera
      }
    });

  //Si el jugador en turno tiene la última posición
  if (currentPlayer.position > 99) {
    console.log(currentPlayer.name + " !ESCAPASTE DEL MAGO!");
    hasWon = true; //Cambiar valor del jugador a verdadero = gano!
  }

  //Si tiene cualquier otra posición 
    if (currentPlayer.position === position) {
      diff = currentPlayer.position - position;
      currentPlayerPosition = position - diff;
    }
  }
    //Cambia de turno
    currentPlayerTurn++;
    
    if (currentPlayerTurn >= players.length) {
      currentPlayerTurn = 0;
    }

drawBoard();
};*/


//2 jugadores 
/*players = [{name: "Jugador 1",position: 0,color: "gold"},{name: "Jugador 2",position: 0,color: "brown"}];*/

let currentPlayerTurn = 0;

board = [];
let position = 0;
let darkBox = false;

//Posición de las escaleras
ladders = [{start: 2,end: 22},{start: 50,end: 34},{start: 10,end: 44},
{start: 61,end: 19},{start: 70,end: 83},{start: 78,end: 4}];

for (var y = height; y >= 0; y--) {
  let row = [];

  board.push(row);
  for (var x = 0; x < width; x++) {
    row.push({x,y,occupied: null,position,color: darkBox ? "#c68c53" : "#ecd9c6"});
    darkBox = !darkBox; //next one is not dark box
    position++;
  }
}

boardSize = 55;
drawBoard = () => {
  let boardOnScreen = ``;
  board.forEach(row => {
    row.forEach(square => {
      boardOnScreen += `<div class=square style="top:${square.y *
        boardSize}px; left:${square.x *
        boardSize}px; background-color:${square.color}"></div>`;
    });
  });

  //Dibuja las piezas principales 
  /*players.forEach(player => {
    let square = null;
    board.forEach(row => {
      row.forEach(square => {
        if (square.position === player.position) {
          boardOnScreen += `<div class=player style="top:${square.y *
            boardSize +
            5}px; left:${square.x * boardSize +
            5}px;background-color:${player.color}"></div>`;
        }
      });
    });
  });*/


  //Dibuja las escaleras 
  ladders.forEach(ladder => {
    //let start = 0;
    let startPos = { x: 0, y: 0 };
    let endPos = { x: 0, y: 0 };

    board.forEach(row => {
      row.forEach(square => {
        if (square.position === ladder.start) {
          startPos.x = square.x * boardSize;
          startPos.y = square.y * boardSize;
        }

        if (square.position === ladder.end) {
          endPos.x = square.x * boardSize;
          endPos.y = square.y * boardSize;
        }
      });
    });

    isLadder = ladder.end > ladder.start;

    //if it is a ladder then it is white, otherwise snake is green
    drawLine({ color: isLadder ? "white" : "green", startPos, endPos });
  });



  //get everything on the page
  document.getElementById("board").innerHTML = boardOnScreen;
};


//Asigna color a las escaleras
function drawLine({ color, startPos, endPos }) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(startPos.x + 35, startPos.y + 20);
  ctx.lineTo(endPos.x + 25, endPos.y + 25);
  ctx.lineWidth = 15;
  ctx.strokeStyle = color;
  ctx.stroke();


}
drawBoard();

function preload(){

}
