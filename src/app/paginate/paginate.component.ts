import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { AlbumService } from '../album.service';
import { ALBUMS } from '../mock-albums';
import { Album } from '../album'; // def du type;
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  @Output()  albumsPaginated: EventEmitter<Album[]> = new EventEmitter();
  nbPage : number;
  pagination : number;
  pages : number[] = [];
  actualyPage : number = 0;

  constructor(private albumS: AlbumService) {
    this.albumS.sendCurrentNumberPage.subscribe(page => { this.actualyPage = page; }) // on informe les autres paginate component du changement de page:
  }

  //cycle de vie d'un component
  ngOnInit() {
    this.nbPage = this.albumS.getAlbumsLenght();
    this.pagination = Math.ceil(this.nbPage / environment.paginate);
    for (let i = 1; i <= this.pagination; i ++){
      this.pages.push(i - 1);
    }
    this.albumsPaginated.emit(this.albumS.getAlbums().slice(0, environment.paginate)); // emettre les album vers le parent’
  }

  paginate(action : string, idPage? : string) {
    let valid = false;

    if(action == "next" && this.actualyPage < (this.pagination - 1)) {
      this.actualyPage ++;
      valid = true;
    } else if(action == "previous" && this.actualyPage >= 1) {
      this.actualyPage = this.actualyPage - 1;
      valid = true;
    } else if(action == "page") {
      this.actualyPage = parseInt(idPage);
      valid = true;
    }

    if(valid === true) {
      let start = environment.paginate * this.actualyPage;
      let end = start + environment.paginate;
      this.albumsPaginated.emit(this.albumS.getAlbums().slice(start, end)); // emettre les album vers le parent’
      this.albumS.currentPage(this.actualyPage); // on informe les autres paginate component du changement de page:
    }
  }
}
