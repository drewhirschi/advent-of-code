
function jump(nums: number[]): number {
    const visitsMap = new Map<number, number[]>()



    function rJump(i: number, nums: number[], pathTaken: number[]) {
        pathTaken.push(i)
        console.log(pathTaken)

        if (visitsMap.has(nums.length - 1) && visitsMap.get(nums.length - 1)!.length < pathTaken.length) {
            return
        }

        if (visitsMap.has(i) && visitsMap.get(i)!.length < pathTaken.length) {
            return
        } else {
            visitsMap.set(i, [...pathTaken])
        }
        if (i == nums.length - 1) {
            return
        }


        for (let j = nums[i]; j > 0; j--) {
            if (j + i > nums.length - 1) continue

            rJump(i + j, nums, [...pathTaken])


        }
    }

    rJump(0, nums, [])
    return visitsMap.get(nums.length - 1)!.length - 1
};


const input = [2, 3, 1, 1, 4]

console.log(jump(input))