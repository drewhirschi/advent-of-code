const input = await Deno.readTextFile('day06.input.txt')

enum GuardDir {
    UP = '^',
    RIGHT = '>',
    DOWN = 'v',
    LEFT = '<'
}

const DirArr = [GuardDir.UP, GuardDir.RIGHT, GuardDir.DOWN, GuardDir.LEFT]

const mapIcons = ['.', '#', 'X', ...DirArr] as const

function getCellValue(
    board: string[][],
    x: number,
    y: number,
    direction: GuardDir,
    magnitude: number
): { x: number, y: number, val: string | null } {
    // Define the direction vectors
    const directionOffsets: Record<typeof direction, [number, number]> = {
        [GuardDir.UP]: [0, -1],
        [GuardDir.DOWN]: [0, 1],
        [GuardDir.LEFT]: [-1, 0],
        [GuardDir.RIGHT]: [1, 0],
    };

    // Calculate new position
    const [dx, dy] = directionOffsets[direction];
    const newX = x + dx * magnitude;
    const newY = y + dy * magnitude;

    // Check if the new position is within bounds
    if (newY >= 0 && newY < board.length && newX >= 0 && newX < board[0].length) {
        return { x: newX, y: newY, val: board[newY][newX] } // Return the new position and direction as an object with x, y, and move properties;
    }

    return { x: newX, y: newY, val: null };
}




function printBoard(board: string[][]) {
    printFooter()
    for (let i = 0; i < board.length; i++) {
        console.log(board[i].join(''))
    }
    printFooter()
    console.log("\n")
}



function printFooter() {
    console.log(''.padEnd(21, '-'))
}

function obstaclesInFrontOfGuard(board: string[][], x: number, y: number, direction: GuardDir) {
    const cellInFront = getCellValue(board, x, y, direction, 1)
    return cellInFront?.val == '#'
}





class Guard {
    x: number
    y: number
    direction: GuardDir
    constructor(x: number, y: number, direction: GuardDir) {
        this.x = x
        this.y = y
        this.direction = direction
    }

    turnRight(board: string[][]) {
        const index = DirArr.indexOf(this.direction)
        this.direction = DirArr[(index + 1) % DirArr.length]
        board[this.y][this.x] = this.direction
    }

    forward(board: string[][]) {
        const nextCell = getCellValue(board, this.x, this.y, this.direction, 1)
        board[this.y][this.x] = "X"
        this.x = nextCell.x
        this.y = nextCell.y
        if (nextCell.val) {
            board[this.y][this.x] = this.direction
        }

    }
}




//set up the board
let i = 0
const board: typeof mapIcons[number][][] = [[]]
while (i < input.length) {
    if (input[i] == '\n') {
        board.push([])
        i++
    } else {

        board[board.length - 1].push(input[i])
        i++
    }
}
printBoard(board)


const boardWidth = input.indexOf('\n')
const boardHeight = input.split('\n').length


function findGuard(board: typeof mapIcons[number][][]) {
    for (let j = 0; j < boardHeight; j++) {
        for (let i = 0; i < boardWidth; i++) {
            if (GuardDir.UP == board[j][i] || GuardDir.RIGHT == board[j][i] || GuardDir.DOWN == board[j][i] || GuardDir.LEFT == board[j][i]) {
                return new Guard(i, j, board[j][i] as GuardDir)
            }
        }
    }

}

function inMap(guard: Guard) {
    return guard.x >= 0 && guard.x < boardWidth && guard.y >= 0 && guard.y < boardHeight

}


const guard = findGuard(board)

if (guard == null) {
    throw 'no guard'
}

console.log(guard)

while (inMap(guard)) {

    if (obstaclesInFrontOfGuard(board, guard.x, guard.y, guard.direction)) {
        guard.turnRight(board)
    } else {
        guard.forward(board)
    }

    // printBoard(board)

}


let visits = 0
for (let j = 0; j < boardHeight; j++) {
    for (let i = 0; i < boardWidth; i++) {
        if (board[j][i] == 'X') {
            visits++
        }
    }
}

console.log(visits)





// const found: { x: number, y: number, move?: typeof moves[number] }[] = []

// for (let j = 1; j < boardHeight - 1; j++) {
//     for (let i = 1; i < boardWidth - 1; i++) {
//         if (board[j][i] == 'A') {
//             found.push({ x: i, y: j })
//         }
//     }
// }



