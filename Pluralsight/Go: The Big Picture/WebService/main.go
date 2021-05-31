package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(response http.ResponseWriter, request *http.Request) {
		names := request.URL.Query()["name"]

		var name string

		if len(names) == 1 {
			name = names[0]
		}

		mapJson := map[string]string{"name": name}

		json.NewEncoder(response).Encode(mapJson)
	})

	err := http.ListenAndServe(":3033", nil)

	if err != nil {
		log.Fatal(err)
	}
}
