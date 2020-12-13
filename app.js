/*
GAME FUNCTION:
- player must guess a number between a min and max
- player gets a certain amount of guesses
- notify plaers of guesses remaining
- notify the player of the correct amswer if loose
- let player to choose to play again
*/
 
//game values
let min=1,
    max=10,
    winningNum= getWinningNum(min, max),
    guessesLeft=3;

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'), 
      maxNum = document.querySelector('.max-num'),    
      guessBtn = document.querySelector('#guess-btn'), 
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;      

//play again event listener
game.addEventListener('mousedown', function (e) {
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess<min || guess>max) {
    setMessage('Please enter a number between ' +min+' and '+max , 'red');
  }

  //check if won
  if (guess === winningNum) {
    //gameover won
    gameOver(true, winningNum+' is correct, YOU WIN!');
  } else {
    //wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //game over lost
      gameOver(false,'Game Over, YOU LOST. The correct number was '+winningNum);
    } else {
      //game continues - answer wrong

      //change border color
      guessInput.style.borderColor = 'red';

      //clear input
      guessInput.value='';

      //tell user its wrong number
      setMessage(guess+' is not correct, '+guessesLeft+' guesses left', 'red');

      
    }
  }
});

//game over
function gameOver(won, msg) {
  let color;
  won === true? color = 'green' : color='red';

  //Disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set message
  setMessage(msg, color);

  //play again
  guessBtn.value='Play Again';
  guessBtn.className += 'play-again';
}

//get winning num
function getWinningNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

//set message
function setMessage(msg,color) {
  message.style.color = color;
  message.textContent=msg;
}