const getUserChoice = (userInput) =>{
    userInput = userInput.toLowerCase();
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb') {
    return userInput;
  } else{
    console.log('Error!');
  }
  };
  function getComputerChoice()  {
  randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
      case 0:
        return 'rock';
      case 1:
        return 'paper';
      case 2:
        return 'scissors';
    }}
  
  function determineWinner(userChoice,computerChoice) {
    if (userChoice === computerChoice) {
    return 'The game is a tie!';
  }
    if(userChoice === 'rock'){
      if (computerChoice === 'paper'){
        return 'Computer has won!';
      } else {
        return 'You won!';
      }
    }
    if(userChoice === 'paper'){
      if(computerChoice === 'scissors'){
        return 'Computer has won!';
      }
      else {
        return 'You won!';
      }
    }
    if(userChoice === 'scissors'){
      if(computerChoice === 'rock'){
        return 'Computer has won!';
      }
      else {
        return 'You won!';
      }
    }
   if(userChoice === 'bomb'){
     return 'You won!';
   }
  }
  
  const playGame = () => {
    const userChoice = getUserChoice(yourPlay);
    const computerChoice = getComputerChoice();
    console.log('You threw: ' + userChoice);
    console.log('The computer threw: ' + computerChoice);
    
  console.log(determineWinner(userChoice, computerChoice));
  };
  let yourPlay='rock'
  playGame();
 
  
  
   
  
  
  