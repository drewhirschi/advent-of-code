const multiplies = []

const input = await Deno.readTextFile('day03.input.txt')
let i = 0

while (i < input.length) {
    if (input.substring(i, i + 4) == "mul(") {

        const params = input.substring(i + 4, i + 11).split(",")

        const firstParam = params[0]
        const secondParam = params[1] ? params[1].split(")")[0] : null
        if (!isNaN(Number(firstParam)) && !isNaN(Number(secondParam))) {
            const closeParenPos = 4 + firstParam.length + 1 + secondParam!.length
            if (input[i + closeParenPos] == ")") {

                multiplies.push({
                    firstParam: Number(firstParam),
                    secondParam: Number(secondParam)
                })
                i += closeParenPos
            }
        }

    }
    i++
}

console.log(multiplies.map(x => x.firstParam * x.secondParam).reduce((a, b) => a + b))