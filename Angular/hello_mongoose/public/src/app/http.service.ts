import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) {
    this.getQuotes();
    this.getAllPokemons();
  }

  getQuotes() {
    let temp = this._http.get("https://pokeapi.co/api/v2/pokemon");
    temp.subscribe(data => {
      console.log(data);
    });
  }

  getAllPokemons() {
    for (var counter = 1; counter <= 300; counter++) {
      let temp = this._http.get("https://pokeapi.co/api/v2/pokemon/" + counter);
      temp.subscribe(data => {
        for (var i = 0; i < data.abilities.length; i++) {
          if (data.abilities[i].ability.name == "overgrow" || data.abilities[i].ability.name == "chlorophyll") {
            console.log(data.name, data.id);
            break;
          } // end if statment
        } // end for loop
      });

    }
  }
}