const isDraw = () => {
    const matrice = setGameMatrice()

    for (let x = 0; x < matrice.length; x++) {
        for (let y = 0; y < matrice.length; y++) {
            if (!matrice[y][x]) return false
        }

        if (matrice.length -1 === x) return true
    }
}

const isWin = (x, y, nb4Win, matrice = setGameMatrice()) => {
    const directionToCheck = getPawnsDirections(matrice, x, y, nb4Win)
    let win = false
    let nbAlign, previous

    directionToCheck.forEach(direction => {
        previous = 0
        direction.forEach(cell => {
            (previous && cell === previous) ? nbAlign++ : nbAlign = 1
            if (nbAlign === nb4Win) win = true
            previous = cell
        })
    });

    return win
}

const getPawnsDirections = (matrice, x, y, nb4Win) => {
    return [
        horizontal(matrice, x, y, nb4Win),
        vertical(matrice, x, y, nb4Win),
        diagonal1(matrice, x, y, nb4Win),
        diagonal2(matrice, x, y, nb4Win)
    ]
}
    
const horizontal = (matrice, x, y, nb4Win) => {
    let back = []
    let forward = []

    for (let i = 1; i < nb4Win; i++) {
        if (matrice[y] && matrice[y][x + i]) forward.push(matrice[y][x + i])
        if (matrice[y] && matrice[y][x - i]) back.unshift(matrice[y][x - i])
    }

    return [...back, matrice[y][x], ...forward]
}

const vertical = (matrice, x, y, nb4Win) => {
    let back = []
    let forward = []

    for (let i = 1; i < nb4Win; i++) {
        if (matrice[y + i] && matrice[y + i][x]) forward.push(matrice[y + i][x])
        if (matrice[y - i] && matrice[y - i][x]) back.unshift(matrice[y - i][x])
    }

    return [...back, matrice[y][x], ...forward]
}

const diagonal1 = (matrice, x, y, nb4Win) => {
    let back = []
    let forward = []

    for (let i = 1; i < nb4Win; i++) {
        if (matrice[y + i] && matrice[y + i][x + i]) forward.push(matrice[y + i][x + i])
        if (matrice[y - i] && matrice[y - i][x - i]) back.unshift(matrice[y - i][x - i])
    }

    return [...back, matrice[y][x], ...forward]
}

const diagonal2 = (matrice, x, y, nb4Win) => {
    let back = []
    let forward = []

    for (let i = 1; i < nb4Win; i++) {
        if (matrice[y - i] && matrice[y - i][x + i]) forward.push(matrice[y - i][x + i])
        if (matrice[y + i] && matrice[y + i][x - i]) back.unshift(matrice[y + i][x - i])
    }

    return [...back, matrice[y][x], ...forward]
}

const setGameMatrice = () => {
    let matrice = [], tRow
    
    for (let i = 0 ; i < row ; i++) {
        tRow = []
        
        for (let j = 0 ; j < col ; j++) {
            cell = document.querySelector(`[data-col="${j}"][data-row="${i}"]`)
            tRow.push(cell.dataset.state * 1)
            if (j >= col - 1) matrice.push(tRow)
        }
        
        if (i >= row - 1) return matrice
    }
}