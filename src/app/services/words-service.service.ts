import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsServiceService {
  private apiUrl = '../../assets/data/json/words.json';

  constructor(private http: HttpClient) {}

  getRandomWord(): Observable<string> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => {
        const words = data.palabras;
        const randomIndex = Math.floor(Math.random() * words.length);
        console.log("SERVICIO: ")
        console.log(words[randomIndex])
        return words[randomIndex];
      }),
      catchError((error) => {
        console.error('Error al obtener palabras:', error);
        throw error;
      })
    );
  }
}
