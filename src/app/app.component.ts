import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];
  pokemonGetAll = JSON.parse( this.httpGet('https://pokeapi.co/api/v2/pokemon/') );
  brands: string[];
  filteredBrands: any[];
  brand: string;

  ngOnInit() {
    this.items = [
      {label: 'Stats', icon: 'fa fa-chart-bar'},
      {label: 'Moves', icon: 'fa fa-gavel'},
      {label: 'Encounters', icon: 'fa fa-map'},
      {label: 'Games', icon: 'fa fa-gamepad'},
      {label: 'Abilities', icon: 'fa fa-list'},
      {label: 'Gallery', icon: 'fa fa-camera'}
    ];

    this.pokemonGetAll.results.forEach(pokemon => {
      this.brands.push(pokemon.name);
    });
    console.log(this.pokemonGetAll);
  }

  filterBrands(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.brands.length; i++) {
      const brand = this.brands[i];
      if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredBrands.push(brand);
      }
    }
  }

  httpGet(theUrl) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'GET', theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }

}
