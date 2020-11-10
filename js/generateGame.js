const generate = document.querySelector('#generate')
const grill = document.querySelector('#grill')
const undo = document.querySelector('#undo')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const winner = document.querySelector('#winner')
const root = document.documentElement

let player = {
    false: {
        color: '#b11937',
        pawn: 'clear'
    },
    true: {
        color: '#3865aa',
        pawn: 'panorama_fish_eye'
    }
}

let gameVsAi = true
let currentPlayer = false
let historic = 1
let nb4Win, row, col
let gameFinish = true

const generateGame = () => {
    row = document.querySelector('#row').value * 1
    col = document.querySelector('#col').value * 1
    nb4Win = document.querySelector('#toWin').value * 1
    player[false].name = document.querySelector('#p1_name').value
    player[true].name = document.querySelector('#p2_name').value
    gameVsAi = document.querySelector('#gameVsAi').checked

    winner.innerHTML = ''
    p1.innerText = player[false].name
    p2.innerText = player[true].name
    currentPlayer = false
    gameFinish = false

    root.style.setProperty('--cellColor', player[false].color)

    grill.innerHTML = ''

    root.style.setProperty('--nbCells', col)
    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            createCell(i, j)
        }
    }
}

const createCell = (tRow, tCol) => {
    cell = document.createElement('div')
    cell.classList.add('cell', 'material')
    cell.dataset.row = tRow
    cell.dataset.col = tCol
    cell.dataset.historic = ''
    cell.dataset.state = 0
    
    cell.addEventListener('click', event => {
        if (gameFinish) return false
        changeBoardState(event.path[0], gameVsAi)        
    })
    
    grill.appendChild(cell)
}

const changeBoardState = (cell, aiEnabled = false) => {
    const x = cell.dataset.col
    const y = cell.dataset.row

    if (cell.dataset.state * 1) return false

    cell.innerHTML = player[currentPlayer].pawn;
    cell.dataset.state = currentPlayer + 1
    cell.dataset.historic = historic

    if (isWin(x, y)) {
        root.style.setProperty('--cellColor', 'rgb(0,0,0,0.7)')
        gameFinish = true
        winner.innerHTML = `${player[currentPlayer].name} won the game`
    } else if (isDraw()) {
        root.style.setProperty('--cellColor', 'rgb(0,0,0,0.7)')
        gameFinish = true
        winner.innerHTML = `Draw`
    } else {
        historic++
        currentPlayer = !currentPlayer
        root.style.setProperty('--cellColor', player[currentPlayer].color)
        const last = document.querySelector('.lastPlay')
        if (last) last.classList.remove("lastPlay");
        cell.classList.add("lastPlay");
        if (aiEnabled) playAi()
    }
}

undo.addEventListener('click', () => {
    if (historic > 1) {
        let toUndo = document.querySelectorAll(`[data-historic="${historic - 1}"]`)[0]
        toUndo.dataset.historic = ''
        toUndo.dataset.state = 0
        toUndo.innerHTML = ''
        currentPlayer = !currentPlayer
        root.style.setProperty('--cellColor', player[currentPlayer].color)
        const last = document.querySelector('.lastPlay')
        if (last) last.classList.remove("lastPlay");
        historic--
        const current = document.querySelector(`[data-historic="${historic - 1}"]`)
        if (current) current.classList.add("lastPlay");
    }
})

generate.addEventListener('click', () => generateGame())

generateGame()
