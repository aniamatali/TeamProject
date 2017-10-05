//Business Logic**********************************************************

///Selection of Squares
var board1 =
   [0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0]

var board2 =
   [0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0,
    0,0,0,0,0,0]

///constructor player

var Players = function(playerName, player, board){
  this.playerName = playerName;
  this.player = player;
  this.board = board;
}

///Global Variables
var player1Value = [];
var player2Value = [];
var boxes;

var index = 2;
////Index = 2, because it will prevent going checking Hit/Miss function
////The index = 0 is for Player 1 turn, and index = 1 for Player 2 turn

///Checking the checkboxes and setting the values of board
var checking = function(player,playerValue,board){
  $("input:checkbox[name="+player+"]:checked").each(function(){
    var value = $(this).val();
    playerValue.push(value);
  });
  if(playerValue.length === boxes){
    playerValue.forEach(function(value){
      board[value] = 1;
      if(player === "player1"){
        $(".player1").hide();
        $(".player2").show();
      } else if(player === "player2"){
        $(".player2").hide();
        $(".combined").show();
        index = 0;
      }
    })
  } else {
    alert("Please put the correct amount of ships")
    playerValue = [];
    return playerValue;
  };
};

///Changing turn between Player 1 and Player 2
var changeTurn = function(index){
  if(index === 0){
     return index += 1;
  } else if (index === 1){
     return index -= 1;
  };
};

///Checking Hit or Miss function
var hitMiss = function(playerID,number,board){
  if(board[number-1] === 1){
    alert("you hit a ship");
    $("#"+playerID).addClass("hit");
  } else if (board[number-1] === 0){
    alert("you miss");
    $("#"+playerID).addClass("miss");
    index = changeTurn(index);
  };
  board[number-1] = 2;
  winning(board);
};

///winning function
var winning = function(board){
  var value = true;
  board.forEach(function(bo) {
    if(bo === 1){
      value = false;
    };
  });
  if(value === true){
    if(index === 0){
      alert(player1.playerName + " Wins");
      for(i=0;i<36;i++){
        if(board1[i] === 1){
          $("#a" + (i+1)).addClass("remain");
        }
      }

    } else if(index === 1){
      alert(player2.playerName + " Wins")
      for(i=0;i<36;i++){
        if(board2[i] === 1){
          $("#b" + (i+1)).addClass("remain");
        }
      }
    }
    index = 2;
  };
};

///Creating new object for Player 1 and Player 2
var player1 = new Players(prompt("Player 1, Enter your Name."), 0);
var player2 = new Players(prompt("Player 2, Enter your Name."), 0);
var players = [player1, player2];

///Set a number of ships
var boxCk = function(){
  boxes = parseInt(prompt("How many ships do you want to deploy?"));
  if (boxes <= 36 && boxes >= 1) {

  }
  else {
    alert("Please select a number of ships between 1 and 35");
    boxCk();
  }
}



//User Interface Logic**********************************************************

$(document).ready(function() {

  $(".playerA").text(player1.playerName);
  $(".playerB").text(player2.playerName);
  boxCk();

  $("form.player1Board").submit(function(event){
     event.preventDefault();
     player1Value = checking("player1",player1Value,board1);
   });

  $("form.player2Board").submit(function(event){
      event.preventDefault();
      player2Value = checking("player2",player2Value,board2);
    });

  $("#a1, #a2, #a3, #a4, #a5, #a6, #a7, #a8, #a9, #a10, #a11, #a12, #a13, #a14, #a15, #a16, #a17, #a18, #a19, #a20, #a21, #a22, #a23, #a24, #a25, #a26, #a27, #a28, #a28, #a29, #a30, #a31, #a32, #a33, #a34, #a35, #a36, #b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9, #b10, #b11, #b12, #b13, #b14, #b15, #b16, #b17, #b18, #b19, #b20, #b21, #b22, #b23, #b24, #b25, #b26, #b27, #b28, #b28, #b29, #b30, #b31, #b32, #b33, #b34, #b35, #b36").click(function() {
   var playerID = this.id;
   var number = parseInt(playerID.slice(1));
   if(index === 0 && board2[number-1] != 2 && playerID.slice(0,1) === "b"){
     hitMiss(playerID, number, board2)
   } else if(index === 1 && board1[number-1] != 2  && playerID.slice(0,1) === "a"){
     hitMiss(playerID, number, board1)
   };
 });

  $("button#restart").click(function(){
    location.reload();
  });


});
