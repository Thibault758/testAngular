import { Injectable } from '@angular/core';
import { Album } from './album'; // def du type
import { ALBUMS } from './mock-albums';
import { ALBUM_LISTS } from './mock-albums';
import { environment } from '../environments/environment'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class AlbumService {

  // subject pour la pagination informer les autres components
  sendCurrentNumberPage = new Subject<number>();

  constructor() { }
 
  getAlbumsLenght() : number {
    return ALBUMS.length;
  }

  getAlbums() : Album[]{
    return ALBUMS;
  }

  getAlbum( id : string ) : Album {
    let albums = this.getAlbums();
    let album = albums.find(el => { return el.id === id } );
    return album;
  }

  getAlbumList( id : string) : Array<string> | null{
    let list = ALBUM_LISTS.find(
      el => {
        if(el.id === id) return el
      }
    )

    return list ? list.list : null ;
  }

  sortByDuration() : Album[]{
    let albums = this.getAlbums();
    
    albums = albums.sort((a,b) => (a.duration > b.duration) ? -1 : 1)

    return albums;
  }

  countAlbum() : number{
    let albums = this.getAlbums();

    return albums.length;
  }

  paginate(actualyPage : number = 0):Album[]{
    let start = environment.paginate * actualyPage;
    let end = start + environment.paginate;
    console.log(actualyPage, start, end)
    return this.getAlbums().slice(start, end);
  }

  searchTitle(word : string):Album | Album[]{
    let regexp = new RegExp(word, "g");
 
    return this.getAlbums().filter(el => {
      return el.title.match(regexp);
    });
  }

  shuffle(id : string):Array<string>{
    return this.getAlbumList(id).sort(() => Math.random() - 0.5);
  }

  // méthode dans le service
  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

}
