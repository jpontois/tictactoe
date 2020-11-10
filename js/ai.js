const playAi = async () => {
    const overlay = document.querySelector('#overlay')
    overlay.style.display = 'block'
    
    const move = await chooseMove()
    
    overlay.style.display = 'none'

    let x = move[0]
    let y = move[1]

    const cell = document.querySelector(`[data-col="${x}"][data-row="${y}"]`)

    changeBoardState(cell)
}

const chooseMove = async () => {
    if (isDraw()) return false

    const moves = think()
    let index = []
    let maxArray = []

    for (let i = 0; i < moves.length; i++) {
        index[i] = moves[i][0]
    }
    
    let max = Math.max(...index)
    
    for (let i = 0; i < moves.length; i++) {
        if (moves[i][0] === max) maxArray.push(moves[i])
    }

    let randomMax = Math.floor(Math.random() * maxArray.length)
    return [maxArray[randomMax][1], maxArray[randomMax][2]]
}

let maxLevel = 4

const think = (level = 1, matrice = setGameMatrice(), player = currentPlayer) => {
    if (level >= maxLevel + 1) return 0
    let moves = []
    let score = 0
    let tScore, tMatrice

    for (let x = 0; x < matrice.length; x++) {
        for (let y = 0; y < matrice.length; y++) {

            let cell = matrice[y][x]

            if (!cell) {

                tMatrice = JSON.parse(JSON.stringify(matrice))
                tMatrice[y][x] = player + 1

                if (isWin(x, y, nb4Win, tMatrice)) {

                    if (1 === level) {
                        moves.push([maxLevel, x, y])
                    } else {
                        (player === currentPlayer) ? score += maxLevel + 1 - level : score += (-maxLevel - 1) + level
                    }

                } else {

                    tScore = think(level + 1, tMatrice, !player)

                    if (1 === level) {

                        moves.push([
                            tScore,
                            x,
                            y
                        ])

                    } else {

                        score += tScore

                    }

                }
            }
        }

        if (
            x === matrice.length - 1 && 
            1 === level
        ) return moves

        if (x === matrice.length - 1) return score
    }
}
