import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url = signal(environment.apiTask);

  constructor(private _http: HttpClient) {}

  get apiListAllPokemons(): Observable<any> {
    return this._http.get<any>(this.url()).pipe(
      tap((res) => res),
      tap((res) => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemons(resPokemons.url).subscribe(
            (res) => (resPokemons.status = res)
          );
        });
      })
    );
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this._http.get<any>(url).pipe(map((res) => res));
  }
}
