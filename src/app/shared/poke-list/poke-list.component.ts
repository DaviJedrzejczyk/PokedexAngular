import { Component, OnInit, inject } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';
import { RouterLink } from '@angular/router';
import { DetailsComponent } from '../../pages/details/details.component';
import { PokeSearchComponent } from '../poke-search/poke-search.component';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [RouterLink, DetailsComponent, PokeSearchComponent],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.scss',
})
export class PokeListComponent implements OnInit {
  #pokeApi = inject(PokeApiService);
  public getAllPokemons: any;
  private _setAllPokemons: any;

  public apiError: boolean = false;

  ngOnInit(): void {
    this.#pokeApi.apiListAllPokemons.subscribe(
      (res) => {
        this._setAllPokemons = res.results;
        this.getAllPokemons = this._setAllPokemons;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    const filter = this._setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;
  }
}
