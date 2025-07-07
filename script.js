
const computerScoreSpan = document.getElementById('computer-score');
const yourScoreSpan = document.getElementById('your-score');
const openRulesBtn = document.getElementById('open-rules');
const closeRulesBtn = document.getElementById('close-rules');
const rulesModal = document.getElementById('rules-modal');


const gamePlayArea = document.querySelector('.game-play-area');
const resultArea = document.querySelector('.result-area');
const hurrayPage = document.querySelector('.hurray-page');



let yourScore = parseInt(localStorage.getItem('yourScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

const choices = ['rock', 'paper', 'scissors'];


function updateScoresDisplay() {
    if (computerScoreSpan) computerScoreSpan.textContent = computerScore;
    if (yourScoreSpan) yourScoreSpan.textContent = yourScore;
}


function saveScores() {
    localStorage.setItem('yourScore', yourScore);
    localStorage.setItem('computerScore', computerScore);
}


function openRulesModal() {
    if (rulesModal) rulesModal.classList.remove('hidden');
}

function closeRulesModal() {
    if (rulesModal) rulesModal.classList.add('hidden');
}


if (openRulesBtn) openRulesBtn.addEventListener('click', openRulesModal);
if (closeRulesBtn) closeRulesBtn.addEventListener('click', closeRulesModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rulesModal && !rulesModal.classList.contains('hidden')) {
        closeRulesModal();
    }
});





const userPickedEl = document.getElementById('user-picked');
const pcPickedEl = document.getElementById('pc-picked');
const resultMessageEl = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again');
const nextRoundBtn = document.getElementById('next-round');
const playAgainHurrayBtn = document.getElementById('play-again-hurray');



function getEmojiForChoice(choice) {
    switch (choice) {
        case 'rock':
            return '✊';
        case 'paper':
            return '✋';
        case 'scissors':
            return '✌️';
        default:
            return '';
    }
}


function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}


function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'tie';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}


function showResultScreen(userChoice, computerChoice, result) {

    gamePlayArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    hurrayPage.classList.add('hidden');


    userPickedEl.innerHTML = getEmojiForChoice(userChoice);

    userPickedEl.className = 'picked-option ' + userChoice + '-border';

    pcPickedEl.innerHTML = getEmojiForChoice(computerChoice);
    pcPickedEl.className = 'picked-option ' + computerChoice + '-border';


    resultMessageEl.textContent = result === 'win' ? 'YOU WIN AGAINST PC' :
        result === 'lose' ? 'YOU LOST AGAINST PC' :
            'TIE UP';
    resultMessageEl.style.color = '';


    playAgainBtn.textContent = 'PLAY AGAIN';
    playAgainBtn.style.width = 'auto';


    if (result === 'win') {
        nextRoundBtn.classList.remove('hidden');
        userPickedEl.style.animation = 'pulse 1s infinite alternate';
    } else {
        nextRoundBtn.classList.add('hidden');
        userPickedEl.style.animation = '';
    }

    if (result === 'lose') {
        pcPickedEl.style.animation = 'pulse 1s infinite alternate';
    } else {
        pcPickedEl.style.animation = '';
    }


    localStorage.removeItem('currentUserChoice');
    localStorage.removeItem('currentComputerChoice');
    localStorage.removeItem('currentResult');

    updateScoresDisplay();
}


function showHurrayScreen() {
    gamePlayArea.classList.add('hidden');
    resultArea.classList.add('hidden');
    hurrayPage.classList.remove('hidden');


    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.animation = 'twinkle 1.5s infinite alternate';
    });

    updateScoresDisplay();
}


function showGamePlayScreen() {
    gamePlayArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    hurrayPage.classList.add('hidden');


    userPickedEl.style.animation = '';
    pcPickedEl.style.animation = '';


    userPickedEl.className = 'picked-option';
    pcPickedEl.className = 'picked-option';

    nextRoundBtn.classList.add('hidden');
}



document.getElementById('rock').addEventListener('click', () => handleChoice('rock'));
document.getElementById('paper').addEventListener('click', () => handleChoice('paper'));
document.getElementById('scissors').addEventListener('click', () => handleChoice('scissors'));


function handleChoice(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);


    if (result === 'win') {
        yourScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
    saveScores();


    showResultScreen(userChoice, computerChoice, result);
}



if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
        showGamePlayScreen();
    });
}

if (nextRoundBtn) {
    nextRoundBtn.addEventListener('click', () => {
        showHurrayScreen();
    });
}


if (playAgainHurrayBtn) {
    playAgainHurrayBtn.addEventListener('click', () => {
        showGamePlayScreen();
    })
}

document.addEventListener('DOMContentLoaded', () => {
    updateScoresDisplay(); 
    showGamePlayScreen(); });