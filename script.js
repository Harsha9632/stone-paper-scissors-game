
const gameHeader = document.getElementById('gameHeader');
const gameArea = document.getElementById('gameArea');
const gameResultSection = document.getElementById('gameResultSection');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');
const playerResultChoice = document.getElementById('playerResultChoice');
const computerResultChoice = document.getElementById('computerResultChoice');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById('play-again-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const rulesButton = document.getElementById('rulesBtn');
const rulesModal = document.getElementById('rules-modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const hurrayPage = document.getElementById('hurrayPage');
const playAgainBtnHurray = document.getElementById('play-again-btn-hurray');


let playerScore = 0;
let computerScore = 0;
let roundWinner = ''; 


const updateScores = () => {
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
};


const resetGame = () => {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    gameArea.classList.add('active');
    gameResultSection.classList.remove('active');
    gameHeader.classList.remove('result-view');
    
    gameHeader.classList.remove('hidden-on-hurray'); 
   
    hurrayPage.classList.remove('active');
    rulesModal.classList.remove('active');
    
    
    playerResultChoice.classList.remove('winner');
    computerResultChoice.classList.remove('winner');
    
    
    playerResultChoice.className = 'selected-choice-display';
    computerResultChoice.className = 'selected-choice-display';
    
   
    playerResultChoice.innerHTML = '';
    computerResultChoice.innerHTML = '';
};



const getIconClass = (choice) => {
    switch (choice) {
        case 'rock':
            return 'fa-solid fa-hand-rock';
        case 'paper':
            return 'fa-solid fa-hand-paper';
        case 'scissors':
            return 'fa-solid fa-hand-scissors';
        default:
            return '';
    }
};


const displayChoice = (element, choice, isWinner = false) => {
    element.innerHTML = '';

    const icon = document.createElement('i');
    icon.className = `selected-choice-symbol ${getIconClass(choice)}`; 
    element.appendChild(icon);

    
    element.classList.remove('paper-border', 'scissors-border', 'rock-border');
    if (choice === 'paper') {
        element.classList.add('paper-border');
    } else if (choice === 'scissors') {
        element.classList.add('scissors-border');
    } else if (choice === 'rock') {
        element.classList.add('rock-border');
    }

    if (isWinner) {
        element.classList.add('winner');
    }
};



const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return 'tie';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        return 'player';
    } else {
        computerScore++;
        return 'computer';
    }
};


const playGame = (playerChoice) => {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    roundWinner = determineWinner(playerChoice, computerChoice);
    updateScores(); 

   
    gameArea.classList.remove('active');
    gameResultSection.classList.add('active');
    gameHeader.classList.add('result-view'); 

    
    const isPlayerWinner = roundWinner === 'player';
    const isComputerWinner = roundWinner === 'computer';

    displayChoice(playerResultChoice, playerChoice, isPlayerWinner);
    displayChoice(computerResultChoice, computerChoice, isComputerWinner);

    
    if (roundWinner === 'tie') {
        resultText.textContent = 'TIE UP';
        playAgainBtn.textContent = 'REPLAY'; 
        nextRoundBtn.style.display = 'none';
    } else if (roundWinner === 'player') {
        resultText.textContent = 'YOU WIN AGAINST PC';
        playAgainBtn.textContent = 'PLAY AGAIN';
        nextRoundBtn.style.display = 'inline-block'; 
    } else { 
        resultText.textContent = 'YOU LOST AGAINST PC';
        playAgainBtn.textContent = 'PLAY AGAIN';
        nextRoundBtn.style.display = 'inline-block'; 
    }
    
   
    if (playerScore >= 5 || computerScore >= 5) { 
        if (playerScore > computerScore) {
            hurrayPage.classList.add('active');
            gameResultSection.classList.remove('active');
           
            gameHeader.classList.add('hidden-on-hurray');
            gameHeader.classList.remove('result-view'); 
            
        } else {
            
          
            setTimeout(resetGame, 2000); 
        }
    }
};


document.querySelectorAll('.choice-wrapper').forEach(choice => {
    choice.addEventListener('click', () => {
        playGame(choice.dataset.choice);
    });
});


playAgainBtn.addEventListener('click', () => {
    
    if (roundWinner === 'tie') {
        gameArea.classList.add('active');
        gameResultSection.classList.remove('active');
        gameHeader.classList.remove('result-view'); 
        playerResultChoice.classList.remove('winner');
        computerResultChoice.classList.remove('winner');
        playerResultChoice.innerHTML = ''; 
        computerResultChoice.innerHTML = '';
        playerResultChoice.className = 'selected-choice-display'; 
        computerResultChoice.className = 'selected-choice-display';
    } else {
        
        resetGame();
    }
});


nextRoundBtn.addEventListener('click', () => {
    gameArea.classList.add('active'); 
    gameResultSection.classList.remove('active');
    gameHeader.classList.remove('result-view'); 
    playerResultChoice.classList.remove('winner');
    computerResultChoice.classList.remove('winner');
    playerResultChoice.innerHTML = ''; 
    computerResultChoice.innerHTML = '';
    playerResultChoice.className = 'selected-choice-display'; 
    computerResultChoice.className = 'selected-choice-display';
});



rulesButton.addEventListener('click', () => {
    rulesModal.classList.add('active'); 
});


closeModalBtn.addEventListener('click', () => {
    rulesModal.classList.remove('active'); 
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && rulesModal.classList.contains('active')) {
        rulesModal.classList.remove('active');
    }
});


playAgainBtnHurray.addEventListener('click', () => {
    resetGame();
});


document.addEventListener('DOMContentLoaded', () => {
    gameArea.classList.add('active'); 
    gameResultSection.classList.remove('active'); 
    hurrayPage.classList.remove('active'); 
    rulesModal.classList.remove('active'); 
    gameHeader.classList.remove('result-view'); 
   
    gameHeader.classList.remove('hidden-on-hurray'); 
    
    updateScores(); 
});