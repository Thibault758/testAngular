import { Injectable } from '@angular/core';
import { Album } from './album'; // def du type
import { ALBUMS } from './mock-albums';
import { environment } from '../environments/environment'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  albums : Album [] = ALBUMS;

  constructor() { }

  getAlbumsAveragesAndPositions(albums : Album[]) : Album[] {
    // set average and position for all albums
    this.albums.forEach(el => {
      let average = this.average(el.note)
      el.average = average;
    });

    this.albums = this.albums.sort((a,b) => (a.average > b.average) ? -1 : 1)

    let i = 1;
    this.albums.forEach(element => {
      element.position = i;
      i++;
    });

    return this.albums;
  }

  average(notations : Array<number>) : number {
    let n = notations.length;
	  let somme=0;
    for(let i=0; i<n; i++)
    {
      somme += notations[i];
    }
    let resultat = somme / n;
    return resultat;
  }

  sortByAverages(sortAction : string, albumsStatistics : Album[]) : Album[]{
    if(sortAction === "asc") {

      let newAlbumsStatistics =  albumsStatistics.sort((a,b) => (a.average > b.average) ? -1 : 1)
  
      return newAlbumsStatistics;
    }
    else if(sortAction === "desc") {
      let newAlbumsStatistics = albumsStatistics.sort((a,b) => (a.average > b.average) ? 1 : -1)
 
      return newAlbumsStatistics;
  }
}
}
