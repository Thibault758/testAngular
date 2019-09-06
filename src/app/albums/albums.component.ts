import { Component, OnInit } from '@angular/core';

import { Album } from '../album'; // def du type

import { ALBUMS } from '../mock-albums';
import { AlbumService } from '../album.service';

import {
  trigger, style, state, animate, transition
} from '@angular/animations';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [
    trigger('myAnimation', [
      state('open', style({
        backgroundColor: 'green'
        }))
    ])
  ]
})
export class AlbumsComponent implements OnInit {

  // one way property binding
  titlePage : string = "Salut les terriens !";
  albums : Album[] = [];
  selectedAlbum : Album;
  selectedAlbumToShow : Album;
  albumPlay: Album;
  countAlbum: number;
  isActive : boolean = false;

  constructor(private albumS: AlbumService) { 
  }

  //cycle de vie d'un component
  ngOnInit() {}

  onAlbumsPaginatedParent($albumsPaginated){
    this.albums = $albumsPaginated
  }

  onSelect(album : Album){
    this.selectedAlbum = album;
    this.selectedAlbumToShow = album;
  }

  hideAndShow(){
    if( this.selectedAlbum )
      this.selectedAlbum = null;
    else
      this.selectedAlbum = this.selectedAlbumToShow;
  }

  playParent(album : Album){
    this.albumPlay = album;
  }

  refreshResultParent($event){
    if($event === true)
      this.albums = this.albumS.getAlbums();
  }

  onSearchByTitleParent(album : Album[]){
    this.albums = album;
  }

  sortByDuration(){
    this.albums = this.albumS.sortByDuration();
  }

  count(){
    this.countAlbum = this.albumS.countAlbum();
  }


}
