import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) {
    // this.getAllPokemons();
  }

  getQuotes() {
    return this._http.get("/quotes");
  };

  addQuote(newQuote){
    return this._http.post("/quotes", newQuote)
  }

  editQuote(edit){
    return this._http.put('/quotes', edit);
  }

  deleteQuote(del){
    const param = new HttpParams().set('_id', del._id)
    return this._http.delete('/quotes', {params: param});
  }
}

  // getAllPokemons() {
  //   for (var counter = 1; counter <= 300; counter++) {
  //     let temp = this._http.get("https://pokeapi.co/api/v2/pokemon/" + counter);
  //     temp.subscribe(data => {
  //       for (var i = 0; i < data.abilities.length; i++) {
  //         if (data.abilities[i].ability.name == "overgrow" || data.abilities[i].ability.name == "chlorophyll") {
  //           console.log(data.name, data.id);
  //           break;
  //         } // end if statment
  //       } // end for loop
  //     });

  //   }
  // }
// }