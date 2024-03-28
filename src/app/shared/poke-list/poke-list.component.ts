import { Component, OnInit, inject } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.scss',
})
export class PokeListComponent implements OnInit {
  #pokeApi = inject(PokeApiService);
  public getAllPokemons: any;

  ngOnInit(): void {
    this.#pokeApi.apiListAllPokemons.subscribe((res) => {
      this.getAllPokemons = res.results;
    });
  }
}
