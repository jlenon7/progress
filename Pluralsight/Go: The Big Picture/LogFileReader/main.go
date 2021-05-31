package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	path := flag.String("path", "myapp.log", "The path to the log that should be analyzed")
	level := flag.String("level", "ERROR", "Log lovel to search for. Options are DEBUG, INFO, ERROR and CRITICAL")

	flag.Parse()

	file, err := os.Open(*path)

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	read := bufio.NewReader(file)

	for {
		line, err := read.ReadString('\n')

		if err != nil {
			log.Fatal(err)
			break
		}

		if strings.Contains(line, *level) {
			fmt.Println(line)
		}
	}
}
