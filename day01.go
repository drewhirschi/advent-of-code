package main

import (
	"bufio"
	"fmt"
	"os"
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
	right := map[int]int{}
	var leftNumber, rightNumber int

	for scanner.Scan() {
		fmt.Sscanf(scanner.Text(), "%d %d", &leftNumber, &rightNumber)
		left = append(left, leftNumber)
		right[rightNumber]++

	}

	var total = 0
	for i := 0; i < len(left); i++ {
		total += left[i] * right[left[i]]
	}

	fmt.Println(total)
}
