const input = await Deno.readTextFile("openpipe.input.txt")


// console.log(input)

const tweetStrs = input.split('\n')




function find_matches(query: string) {

    const tweets: { content: string, id: number }[] = []
    const wordMap = new Map<string, number[]>()

    tweetStrs.forEach((tweet: string, id: number) => {

        for (let tweetWord of tweet.split(' ')) {

            tweetWord = tweetWord.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
            wordMap.set(tweetWord, wordMap.has(tweetWord) ? [...wordMap.get(tweetWord)!, id] : [id])

        }

    })

    const scores = new Map()

    query.split(' ').forEach((w) => {
        if (wordMap.has(w)) {
            const tweetIds = wordMap.get(w)
            tweetIds?.forEach(id => {
                if (scores.has(id)) {
                    scores.set(id, scores.get(id) + 1)
                } else {
                    scores.set(id, 1)
                }
            })
        }
    })








    const top10 = tweets.slice(0, 10)


    // const output = `[\n${top10.map(t => `(\n'${t.content}',\n${t.score}\n)`)}\n]`

    console.log(top10)

}


find_matches("twitter is really cool")


