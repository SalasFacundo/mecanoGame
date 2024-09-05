import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private apiUrl = 'http://localhost:8080/api/';
  header = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getScores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"score");
  }

  createScore(score: Score): Observable<any> {
    return this.http.post<any>(this.apiUrl, score, {headers: this.header});
  }


}
