import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Album } from '../album'; // def du type

import { ALBUMS } from '../mock-albums';
import { StatisticsService } from '../statistics.service';
import { AlbumsComponent } from '../albums/albums.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  albums : Album[] = ALBUMS;
  albumStatistics : Album[] = [];

  constructor(private statisticsS: StatisticsService) {}

  ngOnInit(){
    this.albumStatistics = this.setAlbumsAveragesAndPositions();
  }

  setAlbumsAveragesAndPositions(){
    // get albums by pagination with average and postion
    return this.statisticsS.getAlbumsAveragesAndPositions(this.albums)
  }

  onAlbumsPaginatedParent($albumsPaginated){
    // get albums by pagination with average and postion
    console.log($albumsPaginated);
    this.albums = $albumsPaginated
  }

  sortByAverage(sortAction : string) {
    this.albumStatistics = [... this.statisticsS.sortByAverages(sortAction, this.albumStatistics)];
  }
}
