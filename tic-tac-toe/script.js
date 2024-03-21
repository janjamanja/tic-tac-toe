const buttonsArr = [...document.getElementsByClassName('button')];
const restartBtn = document.getElementById('restart-btn');
const statusText = document.getElementById('status-text');
let player = 'X';
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const resetAll = () => {
    loadListeners(handleClick);
    statusText.textContent = `${player} is playing`;
    buttonsArr.forEach((element) => {
        element.textContent = '';
    })
}

const loadListeners = callback => {
    for (let i=0; i < 9; i++) {                                     /*add an event listener for every button in array*/
        buttonsArr[i].addEventListener('click', callback)
        }};

const handleClick = event => {
    const button = event.target;        /*targets the button that triggered the event*/
    button.textContent = player;
    player = player === 'X' ? 'O' : 'X';
    statusText.textContent = `${player} is playing`;
    button.removeEventListener('click', handleClick);           // Remove event listener
    winCondition();
}

const winCondition = () => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {                //checks for win
        const condition = winConditions[i];

        const cellA = buttonsArr[condition[0]];
        const cellB = buttonsArr[condition[1]];
        const cellC = buttonsArr[condition[2]];

        if (cellA.textContent === '' || cellB.textContent === '' || cellC.textContent === '') {
            continue;
        }

        if (cellA.textContent === cellB.textContent && cellB.textContent === cellC.textContent) {
            roundWon = true;
            break;
        }
    }

    if (!buttonsArr.some(button => button.textContent === '')) {
        statusText.textContent = 'Tie!';
        buttonsArr.forEach(button => {
            button.removeEventListener('click', handleClick)
        })
    }

     if (roundWon) {
        statusText.textContent = `${(player === 'X' ? 'O' : 'X')} wins!`;
        buttonsArr.forEach(button => {
            button.removeEventListener('click', handleClick)
        })
    };
}



window.addEventListener('load', resetAll);

restartBtn.addEventListener('click', resetAll);              /*restart the game*/