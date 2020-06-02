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

  //weather state
  public temp: number;
  public id: number;
  public icon: string = '';
  public main: string = '';
  public description: string = '';

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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&units=metric&appid=${this.API_KEY}`
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.temp = data.main.temp;
      const w = data.weather[0];
      this.id = w.id;
      this.icon = w.icon;
      this.main = w.main;
      this.description = w.description;
    })
  }
}
