import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'public';
  quotes: any ;
  username = "";
  oneQ = "";
  constructor(private _httpSerice: HttpService) {
  
  }
  ngOnInit(){
    this.getQuotesFromService();
  }

  getQuotesFromService(){
    // let obs = this._httpSerice.getQuotes();
    // obs.subscribe(data => {
    //   console.log("got this data", data);
    //   this.quotes = data
    //   console.log(this.quotes[0]);
    //   this.username = this.quotes[1].name;
    // });
  }

  do(val: any): void{
    console.log("hey there", `${val}`);
    
  }

  fetch() :void{
    let obs = this._httpSerice.getQuotes();
    obs.subscribe(data => {
      console.log("got this data", data);
      this.quotes = data
      console.log(this.quotes[0]);
      this.username = this.quotes[1].name;
    });
  }

  displayOne(id :any) :void{
    console.log(id._id);
    this.oneQ = id.quote;
    console.log(this.oneQ);
  }
}
