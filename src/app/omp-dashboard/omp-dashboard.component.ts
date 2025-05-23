import { Component, OnInit } from '@angular/core';
import { DataService, RegionData } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { RegionCardComponent } from '../region-card/region-card.component';
import { MapUzbekistanComponent } from '../map-uzbekistan/map-uzbekistan.component';

@Component({
  selector: 'app-omp-dashboard',
  imports: [CommonModule, RegionCardComponent, MapUzbekistanComponent],
  templateUrl: './omp-dashboard.component.html',
})
export class OmpDashboardComponent implements OnInit {
  cardsTop: RegionData[] = [];
  cardsLeft: RegionData[] = [];
  cardsRight: RegionData[] = [];
  cardsBottom: RegionData[] = [];

  cardsTabletView1: RegionData[] = [];
  cardsTabletView2: RegionData[] = [];

  mapImageSrc: string = 'assets/uzbekistan_map.png';
  selectedRegionId: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getDashboardData().subscribe((data) => {
      this.cardsTop = data.slice(0, 4);
      this.cardsLeft = data.slice(4, 7);
      this.cardsRight = data.slice(7, 10);
      this.cardsBottom = data.slice(10, 14);

      this.cardsTabletView1 = data.slice(0, 7);
      this.cardsTabletView2 = data.slice(7);
    });
  }

  onRegionSelected(regionId: string): void {
    if (this.selectedRegionId === regionId) {
      this.selectedRegionId = null;
    } else {
      this.selectedRegionId = regionId;
    }
  }

  isRegionSelected(regionId: string): boolean {
    return this.selectedRegionId === regionId;
  }
}
