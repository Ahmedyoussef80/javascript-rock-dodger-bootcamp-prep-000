const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
 const GAME_WIDTH = 400
 const LEFT_ARROW = 37
 const RIGHT_ARROW = 39
 const ROCKS = []
 const START = document.getElementById('start')
 var gameInterval = null
 	 //Check for collision
 	  function checkCollision(rock) {
 	    const top = positionToInteger(rock.style.top)
 	    console.log(top)
 	    if (top > 360) {
 	      //Get dodger positions
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    //Get rock positions
     const rockLeftEdge = positionToInteger(rock.style.left)
     const rockRightEdge = rockLeftEdge + 20;
     //If rock position is the same as dodger, return true, else return false
     if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
     (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
     (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)){
return true;
} else {
  return false;
}}}
// Create new rock at position x
function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
   rock.style.left = `${x}px`
   var top = 0
   //Add rock to DOM
   GAME.appendChild(rock);
   //Move rock down the screen
    function moveRock() {
      //Check for collision
      if(checkCollision(rock)){
        endGame();
      }//If no collision, change the position
      else if(top < 400) {
        top += 2;
         rock.style.top = top + 'px';
          window.requestAnimationFrame(moveRock);
      }//Remove rock at bottom of screen
      else if(top >= 400){
        rock.remove();
      }
    }
     window.requestAnimationFrame(moveRock);
     //Add rock to array
     ROCKS.push(rock)
     
   return rock	 }
   //Reset game on loss
    function endGame() {
 clearInterval(gameInterval);
  START.style.display = "block";
 window.removeEventListener('keydown', moveDodger);
  //Remove rocks from DOM
  ROCKS.forEach(function(rock){
    rock.remove();
  })
  //Empty the rock array;
  ROCKS.splice(0);
  alert('YOU LOSE');
 }	 
 	 
 function moveDodger(e) {	 function moveDodger(e) {
   //On LEFT_ARROW, animate moveDodgerLeft function
    if(e.which === LEFT_ARROW){
      moveDodgerLeft();
      e.preventDefault();
       e.stopPropagation();
    }   //On RIGHT_ARROW, animate moveDodgerRight function
    