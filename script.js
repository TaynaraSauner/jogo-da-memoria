const memoryGame = document.querySelector('.memory-game');
const timerElement = document.getElementById('timer');
let hasFlippedCard = false;
let firstCard, secondCard;
let pairsFound = 0;
let timerStarted = false;
let startTime, interval;


const images = [
    'img1.jfif', 'img2.jfif', 'img3.jfif', 'img4.jfif',
    'img5.jfif', 'img6.jfif', 'img7.jfif', 'img8.jfif'
];


let cardsArray = images.concat(images);
cardsArray.sort(() => 0.5 - Math.random());

//  criar as cartas
function createCards() {
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.framework = cardsArray[i];

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = './assets/' + cardsArray[i];

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');

        card.appendChild(frontFace);
        card.appendChild(backFace);
        memoryGame.appendChild(card);

        card.addEventListener('click', flipCard);
    }
}

//  iniciar o cronômetro
function startTimer() {
    startTime = new Date();
    interval = setInterval(() => {
        const elapsed = new Date() - startTime;
        const minutes = String(Math.floor(elapsed / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
        timerElement.textContent = `Tempo: ${minutes}:${seconds}`;
    }, 1000);
}

// virar as cartas
function flipCard() {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    if (!hasFlippedCard) {
        this.classList.add('flip');
        hasFlippedCard = true;
        firstCard = this;
    } else {
        this.classList.add('flip');
        secondCard = this;
        checkForMatch();
    }
}

//verificar se as cartas são iguais
function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        pairsFound++;
        if (pairsFound === 8) {
            clearInterval(interval);
            alert('Aeeeee! Achou todos os fujões!');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetCards();
        }, 1000);
    }
}

// desativar as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
}

//resetar as cartas
function resetCards() {
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
}

// Iniciar o jogo
createCards();
