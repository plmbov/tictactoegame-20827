const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const whoStartsMessage = document.getElementById('whoStartsMessage')
const whoStartsMessageText = document.getElementById('whoStartsMessageText')
const endGameMessage = document.getElementById('endGameMessage')
const endGameMessageText = document.getElementById('endGameMessageText')
const restartButton = document.getElementById('restartButton')
const setNamesWindow = document.getElementById('setNamesWindow')
const backdrop = document.getElementById('backdrop')
const namesForm = document.getElementById('namesForm')
const setNamesButton = document.getElementById('setNames')
const playerOneNameDisplay = document.getElementById('playerOneNameDisplay')
const playerTwoNameDisplay = document.getElementById('playerTwoNameDisplay')
const changeNamesButton = document.getElementById('changeNamesButton')
const emptyNameFieldsNotification = document.getElementById('emptyNameFieldsNotification')

let circleTurn = Math.random() >= 0.5

setNamesButton.addEventListener('click', setPlayersNames)
namesForm.addEventListener('on-submit', setPlayersNames)
restartButton.addEventListener('click', startGame)
changeNamesButton.addEventListener('click', () => {
    setNamesWindow.classList.add('show')
    backdrop.classList.add('show')
})
backdrop.addEventListener('click', () => {
    setNamesWindow.classList.remove('show')
    backdrop.classList.remove('show')
})


setNamesWindow.classList.add('show')

function setPlayersNames(event) {
    event.preventDefault()
    if (document.getElementById('playerOneName').value === '' || document.getElementById('playerTwoName').value === '') {
        emptyNameFieldsNotification.classList.add('show')
        setTimeout(() => {
            emptyNameFieldsNotification.classList.remove('show')
        }, 3000);
    } else {
        playerOneNameDisplay.innerText = document.getElementById('playerOneName').value
        playerTwoNameDisplay.innerText = document.getElementById('playerTwoName').value
        setNamesWindow.classList.remove('show')
        backdrop.classList.remove('show')
        startGame()
    }
}

function startGame() {
    whoBegins()
    cellElements.forEach(el => {
        el.classList.remove(X_CLASS)
        el.classList.remove(CIRCLE_CLASS)
        el.removeEventListener('click', handleClick)
        el.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    endGameMessage.classList.remove('show')
}

function whoBegins() {
    whoStartsMessage.classList.add('show')
    whoStartsMessageText.innerHTML = `${circleTurn ? `${document.getElementById('playerOneName').value}` : `${document.getElementById('playerTwoName').value}`} begins!`
    setTimeout(() => {
        whoStartsMessage.classList.remove('show')
    }, 2000);
}

function handleClick(event) {
    const cell = event.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGameMessageText.innerHTML = `${circleTurn ? `${document.getElementById('playerOneName').value}` : `${document.getElementById('playerTwoName').value}`} wins!`
        endGameMessage.classList.add('show')
    } else if (isDraw()) {
        endGameMessageText.innerHTML = `Draw`
        endGameMessage.classList.add('show')
    }
    switchPlayer()
    setBoardHoverClass()
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchPlayer() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}