import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, OnChanges{

  @Input() album : Album;
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  albumList : Array<string>;

  //1
  // execute en premier à l'instanciation du component
  constructor(private albumS: AlbumService) { 
  }

  //2
  // au montage du template
  ngOnInit() {
  }

  // 2 et lorsqu'on passe une valeur dans le selecteur
  ngOnChanges(){
    if(this.album) {
      this.albumList = this.albumS.getAlbumList(this.album.id);
      console.log(this.albumList)}
  }

  play(album:Album) {
    this.onPlay.emit(album); // emettre un album vers le parent
  }

  shuffle() {
    this.albumList = this.albumS.shuffle(this.album.id)
  }
}
