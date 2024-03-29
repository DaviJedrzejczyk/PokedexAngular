import { Component, OnInit, inject, signal } from '@angular/core';
import { PokeHeaderComponent } from '../../shared/poke-header/poke-header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokeApiService } from '../../service/poke-api.service';
import { environment } from '../../../environments/environments';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [PokeHeaderComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  #activeRouter = inject(ActivatedRoute);
  #pokeApiService = inject(PokeApiService);

  #urlPokemon = signal(environment.apiPokemon);
  #urlPokemonName = signal(environment.apiPokemonName);

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    const id = this.#activeRouter.snapshot.params['id'];
    const pokemon = this.#pokeApiService.apiGetPokemons(
      `${this.#urlPokemon()}/${id}`
    );
    const name = this.#pokeApiService.apiGetPokemons(
      `${this.#urlPokemonName()}/${id}`
    );

    return forkJoin([pokemon, name]).subscribe(
      (res) => {
        this.pokemon = res;
        this.isLoading = true;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }
}
