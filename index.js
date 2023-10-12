let score= JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScore();

let isAutoPlaying= true;
let intervalId;

function autoPlay(){
  if(isAutoPlaying){
    intervalId= setInterval(function(){
      const playerMove =pickComputerMove();
      playGame(playerMove);
    }, 1000);
    // console.log(intervalId);
    isAutoPlaying= false;
  }else{
    clearInterval(intervalId);
    isAutoPlaying=true;
  }
}

function playGame(playerMove){
  const computerMove= pickComputerMove();
  let result= '';

  if(playerMove === 'rock'){
        if(computerMove === 'rock'){
          result='Tie';
        }else if(computerMove === 'paper'){
          result='Lose';
        }else if(computerMove === 'scissors'){
          result='Win';
        }
  }else if(playerMove === 'paper'){
        if(computerMove === 'rock'){
          result='Win';
        }else if(computerMove === 'paper'){
          result='Tie';
        }else if(computerMove === 'scissors'){
          result='Lose';
        }
  }else if(playerMove === 'scissors'){
        if(computerMove === 'rock'){
          result='Lose';
        }else if(computerMove === 'paper'){
          result='Win';
        }else if(computerMove === 'scissors'){
          result='Tie';
        }          
  }
  

  if (result === 'Win') {
    score.wins += 1;
  } else if (result === 'Lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  
  updateScore(); // to display score on the screen
  

  localStorage.setItem('score', JSON.stringify(score));

  // to dosplay result and moves on screen
  document.querySelector(".js-result").innerHTML= `${result}`;

  document.querySelector(".js-moves").innerHTML= 
  ` You
    <img src="${playerMove}-emoji.png" class="move-icon">
    <img src="${computerMove}-emoji.png" class="move-icon">
    Computer`;




//         alert(`you chose ${playerMove}, computer chose ${computerMove}= ${result} 
// Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`)
}

function updateScore(){
    document.querySelector('.js-score')
  .innerHTML= `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
  }

function pickComputerMove(){
  const randomNum= Math.random();
  let computerMove= "";

  if(randomNum>=0 && randomNum<= 1/3){
    computerMove= 'rock';
  }else if(randomNum>=1/3 && randomNum<= 2/3){
    computerMove= 'paper';
  }else if(randomNum>=2/3 && randomNum<= 1){
    computerMove= 'scissors';
  }

  return computerMove;
}

document.body.addEventListener('keydown',(event)=>{
  if(event.key === "r" || event.key === "R"){
    playGame("rock");
  }else  if(event.key === "p" || event.key === "P"){
    playGame("paper");
  }else if(event.key === "s" || event.key === "S"){
    playGame("scissors");
  }else if(event.key === "a" || event.key === "A"){
    autoPlay();
  }
})
