package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	//test edeceğimiz url
	url := "http://localhost:4444/ping"
	// request'i hazırladık. HTTP Get talebi yapılacak. Body boş gidiyor
	req, _ := http.NewRequest("GET", url, nil)

	for i := 0; i < 10; i++ {
		// request'i yapıp cevabı aldık
		res, _ := http.DefaultClient.Do(req)
		// response ile gelen mesajın içeriğini oku
		body, _ := ioutil.ReadAll(res.Body)
		// ekrana bas
		fmt.Println(string(body))
		// aktif olan dinleyiciyi kapat
		res.Body.Close()
	}
}
