import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { MarqueeContent } from './marquee.interface'

@Injectable({
  providedIn: 'root'
})
export class MarqueeHeaderService {

  private marqueeURL = 'https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/marquee.json';
  private marqueDataSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public $marqueObservable = this.marqueDataSubject.asObservable();
  private marqueeContent : MarqueeContent;
  constructor(
     private http : HttpClient
  ) { }
  
  refershMarqueContent(){
    return this.http.get<any>(this.marqueeURL).subscribe(data => {
      this.marqueeContent = data.result;
      this.marqueDataSubject.next(this.marqueeContent);
    });

  }
  
}
