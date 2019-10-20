import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  quotes: any;
  username = "";
  oneQ;
  newQuote: any;
  chosen: any;
  constructor(private _httpSerice: HttpService) {

  }
  ngOnInit() {
    this.getQuotesFromService();
    this.newQuote = { name: "", quote: "" }
    this.chosen = { name: "", quote: "" }
  }

  getQuotesFromService() {
    // let obs = this._httpSerice.getQuotes();
    // obs.subscribe(data => {
    //   console.log("got this data", data);
    //   this.quotes = data
    //   console.log(this.quotes[0]);
    //   this.username = this.quotes[1].name;
    // });
  }

  do(val: any): void {
    console.log("hey there", `${val}`);

  }

  fetch(): void {
    let obs = this._httpSerice.getQuotes();
    obs.subscribe(data => {
      console.log("got this data", data);
      this.quotes = data
      console.log(this.quotes[0]);
      this.username = this.quotes[1].name;
    });
  }

  displayOne(id: any): void {
    console.log(id._id);
    this.oneQ = id.quote;
  }

  onSubmit() {
    let obs = this._httpSerice.addQuote(this.newQuote);
    obs.subscribe(data => {
    })
    this.fetch();
    this.newQuote = { name: "", quote: "" }
  }

  chosenItem(quote){
    this.chosen = quote;
  }

  editOne() {
    let obs = this._httpSerice.editQuote(this.chosen);
    obs.subscribe(data => {
    });
    this.fetch();
    this.chosen = { name: "", quote: "" }
  }

  deleteOne(quote){
    let obs = this._httpSerice.deleteQuote(quote);
    obs.subscribe(data => {
      console.log(data);  
    });
    this.fetch();
    this.chosen = { name: "", quote: "" }
  }
}
