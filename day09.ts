const input = await Deno.readTextFile('day09.input.txt')

class ListNode {
    fileId: number | null // if null its empty space
    space: number
    next: ListNode | null
    before: ListNode | null

    constructor(fileId: number | null, space: number, before: ListNode | null, next: ListNode | null = null) {
        this.fileId = fileId
        this.space = space
        this.before = before
        this.next = next
    }

    set setNext(node: ListNode) {
        this.next = node
    }
}

function printDisk(disk: ListNode) {
    let current: ListNode | null = disk
    let str = ""

    while (current != null) {
        let symbol = "."
        if (current.fileId != null) {
            symbol = current.fileId.toString()
        }
        for (let j = 0; j < current.space; j++) {
            str += symbol
        }

        current = current.next
    }
    console.log(str)
}


const inputArray = input.split('')




const diskRoot = new ListNode(0, Number(inputArray[0]), null)
diskRoot.next = new ListNode(null, Number(inputArray[1]), diskRoot)
let diskPointer = diskRoot.next
let fileId = 1

while (fileId * 2 < inputArray.length) {

    diskPointer.next = new ListNode(fileId, Number(inputArray[fileId * 2]), diskPointer)
    diskPointer = diskPointer.next
    diskPointer.next = new ListNode(null, Number(inputArray[fileId * 2 + 1]), diskPointer)
    diskPointer = diskPointer.next
    fileId++
}

printDisk(diskRoot)

function removeNode(node: ListNode, rtn: 'before' | 'next') {
    const prev = node.before
    const next = node.next
    prev!.next = next
    next!.before = prev

    if (rtn == 'before') {
        return prev
    } else {
        return next
    }

}
function insertBefore(node: ListNode, newNode: ListNode) {
    const prev = node.before
    prev!.next = newNode
    newNode.before = prev
    newNode.next = node
    node.before = newNode
}



let left: ListNode | null = diskRoot
left = left.next
let right: ListNode | null = diskPointer.before
const endSpace = diskPointer
endSpace.space = 0


let iterations = 0
// while (left?.next?.fileId <= right?.fileId) {
while (left?.next != null && left.next.next != null) {
    // left is empty space
    //right alwasy has to be on a file






    while (left.space == 0) {
        left = removeNode(left, 'next')
        left = left.next
    }


    insertBefore(left, new ListNode(right.fileId, 1, left))
    right.space--
    left.space--
    endSpace.space++


    if (right.space == 0) {
        right = removeNode(right, 'before')
        endSpace.space += right.space
        right = removeNode(right, 'before')
    }



    printDisk(diskRoot)



    iterations++
}

console.log('end'.padStart(20, '-'))
printDisk(diskRoot)


let sum = 0
let index = 0
let cur = diskRoot
while (cur.fileId != null) {
    for (let i = 0; i < cur.space; i++) {
        sum += (index + i) * cur.fileId!
    }
    index += cur.space
    cur = cur.next
}


console.log(sum)


