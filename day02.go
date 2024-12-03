package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {

	file, err := os.Open("day02.input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	reports := [][]int{}

	for scanner.Scan() {
		var levels []int
		line := scanner.Text()

		parts := strings.Split(line, " ")
		for _, part := range parts {
			if num, err := strconv.Atoi(part); err == nil {
				levels = append(levels, num)
			}
		}

		reports = append(reports, levels)

	}

	var safeReports = 0
	for _, report := range reports {

		decreasing := report[0] > report[1]
		isSafe := true

		for i := 1; i < len(report); i++ {

			if decreasing {
				if report[i-1] <= report[i] {
					isSafe = false
					break
				}
			} else {
				if report[i-1] >= report[i] {
					isSafe = false
					break
				}
			}

			diff := math.Abs(float64(report[i-1] - report[i]))
			if diff > 3 || diff < 1 {
				isSafe = false
				break
			}
		}

		if isSafe {
			safeReports++
			fmt.Println("safe")
		} else {
			fmt.Println("not safe")
		}

	}

	fmt.Println(safeReports)
}
