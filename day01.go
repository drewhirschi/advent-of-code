package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"time"
)

func main() {
	fmt.Println("Advent of Code - Day", time.Now().Day())

	file, err := os.Open("day01.input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	left := []int{}
	right := []int{}
	var leftNumber, rightNumber int

	for scanner.Scan() {
		fmt.Sscanf(scanner.Text(), "%d %d", &leftNumber, &rightNumber)
		left = append(left, leftNumber)
		right = append(right, rightNumber)
	}

	sort.Ints(left)
	sort.Ints(right)

	var distanceSum = 0
	for i := 0; i < len(left); i++ {
		var dist = left[i] - right[i]
		if dist < 0 {
			distanceSum += -dist
		} else {
			distanceSum += dist
		}
	}

	println(distanceSum)
}
