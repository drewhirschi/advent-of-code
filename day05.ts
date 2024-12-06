// const input = await Deno.readTextFile('day05.input.test.txt')
const input = await Deno.readTextFile('day05.input.txt')


const [rawRules, rawUpdates] = input.split("\n\n")
const rules = new Map<string, string[]>()
rawRules.split("\n").forEach(x => {
    const [before, after] = x.split("|")
    if (!rules.has(before)) {
        rules.set(before, [])
    }
    rules.get(before)!.push(after)

})
const updates = rawUpdates.split("\n").map(x => {
    return x.split(",")

})

const validUpdates = []
const invalidUpdates = []

for (const update of updates) {
    let isValidUpdate = true
    for (let i = 0; i < update.length - 1; i++) {
        let page = update[i]
        for (let j = i + 1; j < update.length; j++) {
            const checkPage = update[j]
            const checkRules = rules.get(checkPage)
            if (checkRules && checkRules!.some(rule => rule === page)) {
                // console.log(`failed rule: ${checkPage}|${page}`, update);

                [update[i], update[j]] = [update[j], update[i]];
                page = update[i]
                // console.log(`failed rule: ${checkPage}|${page}, =>`, update);
                isValidUpdate = false
                // break
            }
        }
    }
    if (isValidUpdate) {
        validUpdates.push(update)
    } else {
        invalidUpdates.push(update)
    }
}



const medians = invalidUpdates.map(update => {
    const middle = Math.floor(update.length / 2)
    return update[middle]
}).reduce((a, b) => a + Number(b), 0)

console.log(medians)

// console.log()



