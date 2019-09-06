import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Album } from '../album';

import { AlbumService } from '../album.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() onSearchByTitle: EventEmitter<Album | Album[]> = new EventEmitter();
  @Output() refreshResult: EventEmitter<boolean> = new EventEmitter();

  constructor(private albumS: AlbumService) { 
  }

  ngOnInit() {
  }

  onChangeEmit($letter : string){
    if(!$letter)
      this.refreshResult.emit(true)
    else {
      let resultByTitle = this.albumS.searchTitle($letter);
      this.onSearchByTitle.emit(resultByTitle); // emettre un album vers le parent
    }

  }

  onSubmit(formSearch : NgForm) {
    let resultByTitle = this.albumS.searchTitle(formSearch.value['word']);
    this.onSearchByTitle.emit(resultByTitle); // emettre un album vers le parent
  }
}
