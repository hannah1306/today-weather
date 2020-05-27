import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public lat: number;
  public long: number;
  public API_KEY: string = '372365259bda80061591382a4df3b6c8';

  constructor(
    private http: HttpClient
  ) {
  }

  ionViewWillEnter(){
    this._getCurrentPosition();
  }

  _getCurrentPosition(){
    navigator.geolocation.getCurrentPosition((data) => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      console.log(this.lat, this.long);

      this._getWeather();
    })
  }

  _getWeather(){
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&exclude=hourly,daily&appid=${this.API_KEY}`;
    this.http.get(url).subscribe(data => {
      console.log(data);
    })
  }
}
