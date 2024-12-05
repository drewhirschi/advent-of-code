const input = await Deno.readTextFile('day04.input.txt')

console.log(input)

function getCellValue(
    board: string[][],
    x: number,
    y: number,
    direction: 'up' | 'down' | 'left' | 'right' | 'upLeft' | 'upRight' | 'downLeft' | 'downRight',
    magnitude: number
): string | null {
    // Define the direction vectors
    const directionOffsets: Record<typeof direction, [number, number]> = {
        up: [0, -1],
        down: [0, 1],
        left: [-1, 0],
        right: [1, 0],
        upLeft: [-1, -1],
        upRight: [1, -1],
        downLeft: [-1, 1],
        downRight: [1, 1],
    };

    // Calculate new position
    const [dx, dy] = directionOffsets[direction];
    const newX = x + dx * magnitude;
    const newY = y + dy * magnitude;

    // Check if the new position is within bounds
    if (newY >= 0 && newY < board.length && newX >= 0 && newX < board[0].length) {
        return board[newY][newX];
    }

    return null;
}

function writeValue(
    board: string[][],
    x: number,
    y: number,
    direction: 'up' | 'down' | 'left' | 'right' | 'upLeft' | 'upRight' | 'downLeft' | 'downRight',
    value: string) {
    const directionOffsets: Record<typeof direction, [number, number]> = {
        up: [0, -1],
        down: [0, 1],
        left: [-1, 0],
        right: [1, 0],
        upLeft: [-1, -1],
        upRight: [1, -1],
        downLeft: [-1, 1],
        downRight: [1, 1],
    };

    // Get the direction offsets
    const [dx, dy] = directionOffsets[direction];

    // Write each character of the value string to the board
    for (let i = 0; i < value.length; i++) {
        // Check if the current position is within bounds
        if (y >= 0 && y < board.length && x >= 0 && x < board[0].length) {
            board[y][x] = value[i]; // Write the character to the current cell
        } else {
            return false; // Return false if we go out of bounds
        }

        // Move to the next cell in the specified direction
        x += dx;
        y += dy;
    }

    return true;
}


function printBoard(board: string[][]) {
    printFooter()
    for (let i = 0; i < board.length; i++) {
        console.log(board[i].join(''))
    }
    printFooter()
    console.log("\n")
}

function printHeader() {
    console.log('     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20')
}

function printFooter() {
    console.log(''.padEnd(21, '-'))
}
//set up the board
let i = 0
const board: string[][] = [[]]
while (i < input.length) {
    if (input[i] == '\n') {
        board.push([])
        i++
    } else {

        board[board.length - 1].push(input[i])
        i++
    }
}
const boardWidth = input.indexOf('\n')
const boardHeight = input.split('\n').length
console.log({ boardWidth, boardHeight })

printBoard(board)



const moves = ['up', 'down', 'left', 'right', 'upLeft', 'upRight', 'downLeft', 'downRight'] as const

const found = []

for (let j = 0; j < boardHeight; j++) {
    for (let i = 0; i < boardWidth; i++) {
        if (board[j][i] == 'X') {
            for (const move of moves) {
                if (getCellValue(board, i, j, move, 1) == 'M'
                    && getCellValue(board, i, j, move, 2) == 'A'
                    && getCellValue(board, i, j, move, 3) == 'S') {
                    found.push({ x: i, y: j, move })
                }
            }
        }
    }
}

const foundBoard: string[][] = Array.from({ length: boardHeight }, () => Array(boardWidth).fill('.'));

for (const { x, y, move } of found) {
    writeValue(foundBoard, x, y, move, 'XMAS')
}

console.log(`found ${found.length} XMASes`)
printBoard(foundBoard)

