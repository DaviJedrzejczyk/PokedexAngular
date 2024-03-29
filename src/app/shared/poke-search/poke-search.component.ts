import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-poke-search',
  standalone: true,
  imports: [],
  templateUrl: './poke-search.component.html',
  styleUrl: './poke-search.component.scss',
})
export class PokeSearchComponent implements OnInit {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public search(value: string) {
    this.emmitSearch.emit(value);
  }
}
