package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

func get(url string, ch chan<- string) {
	start := time.Now()
	resp, _ := http.Get(url)
	body, _ := ioutil.ReadAll(resp.Body)
	ch <- fmt.Sprintf("%.2f sürede alınan cevap %s", time.Since(start).Seconds(), body)
}

func main() {
	start := time.Now()
	ch := make(chan string)
	for i := 0; i < 10; i++ {
		go get("http://localhost:4444/ping", ch)
	}

	for i := 0; i < 10; i++ {
		fmt.Println(<-ch)
	}
	fmt.Printf("%.2fs saniye geçti\n", time.Since(start).Seconds())
}
