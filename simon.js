//cache DOM
var sound1 = document.getElementById('one');
var sound2 = document.getElementById('two');
var sound3 = document.getElementById('three');
var sound4 = document.getElementById('four');
//var errorSound = document.getElementById('wrong');
var redTile = $('#red');
var blueTile = $('#blue');
var yellTile = $('#yellow');
var greenTile = $('#green');
var score = $('#score');
var start = $('#start');
var strict = $('#strict');

var strictMode = false;
var power = false;

var computerMoves = [];
var playerMoves = [];
var count;

//sound and animation functions--
var red = function() {
  redTile.fadeOut(100).fadeIn(100);
  sound1.play();
}

var blue = function() {
  blueTile.fadeOut(100).fadeIn(100);
  sound2.play();
}

var yellow = function() {
  yellTile.fadeOut(100).fadeIn(100);
  sound3.play();
}

var green = function() {
  greenTile.fadeOut(100).fadeIn(100);
  sound4.play();
}


//device on
start.on('click', iO);
strict.on('click', setStrict);
//functions

//attach click handler to tiles if game on
function iO() {
  if (power == false) {
    power = true;
    score.html(0);

    redTile.on('click', red);
    blueTile.on('click', blue);
    yellTile.on('click', yellow);
    greenTile.on('click', green);
    redTile.on('click', trakMove);
    blueTile.on('click', trakMove);
    greenTile.on('click', trakMove);
    yellTile.on('click', trakMove);
    startGame();
  } else {
    gameOff();
  }
}

function overCheck() {
  if (count == 20) {
    alert('You Win!');
    gameOff();
    playerMoves = [];
  } else {
    return;
  }
}

function setStrict() {
  if (strictMode == false) {
    strictMode = true;
    strict.addClass('pressed');
  } else {
    strictMode = false;
    strict.removeClass('pressed');
  }
}

function gameOff() {
  power = false;
  strictMode = false;
  strict.removeClass('pressed');
  score.html('--');
  redTile.off('click');
  blueTile.off('click');
  yellTile.off('click');
  greenTile.off('click');
}

function startGame() {
  computerMoves = [];
  playerMoves = [];
  count =0;
  score.html(count);
  fillChallenge();
  //computerMoves[0]();
   playSteps(0);
}

//create cpu sequence 20 potential
var seqArr = [red, blue, yellow, green];

function fillChallenge() {
  for (var i = 0; i < 20; i++) {
    computerMoves.push(seqArr[Math.floor(Math.random() * seqArr.length)]);
  } //console.log(computerMoves);
}

function playSteps(j) {
   j = j || 0;
  computerMoves[j]();
  if (j < count ) {
    setTimeout(function() {
      j++;
      playSteps(j);
    }, 1000);
  }

}

//check if player matches cpu
function moveChecker(x) {

  if (playerMoves[x] == computerMoves[x]) {
    return true;
  } else {
    return false;
  }
}

//player move pushed into array
function trakMove() {
  var clicked = this.id;

  switch (clicked) {
    case 'blue':
      playerMoves.push(blue);
      success();
      break;
    case 'yellow':
      playerMoves.push(yellow);
      success();
      break;
    case 'red':
      playerMoves.push(red);
      success();
      break;
    case 'green':
      playerMoves.push(green);
      success();
  }
}

function success() {
  if (strictMode && !moveChecker(playerMoves.length - 1)) {
    score.html('XX');
    setTimeout(gameOff, 2000);
  } else if (!moveChecker(playerMoves.length - 1)) {
    score.html('XX');
    playerMoves=[];
    setTimeout(playSteps, 2000);
  } else {
    //count++;
    correctSeq();
    score.html(count);
    overCheck();
    
  }
}

function correctSeq() {
  if (playerMoves.length-1 === count) {
    count++;
    setTimeout(playSteps, 1000);
    playerMoves = [];
  }
}