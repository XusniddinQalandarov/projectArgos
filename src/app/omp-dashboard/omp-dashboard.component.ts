import { Component, OnInit } from '@angular/core';
import { DataService, RegionData } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { RegionCardComponent } from '../region-card/region-card.component';
import { MapUzbekistanComponent } from '../map-uzbekistan/map-uzbekistan.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-omp-dashboard',
  standalone: true,
  imports: [CommonModule, RegionCardComponent, MapUzbekistanComponent],
  templateUrl: './omp-dashboard.component.html',
  styleUrl: './omp-dashboard.componet.scss',
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
  selectedRegion: RegionData | null = null;
  allRegions: RegionData[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getDashboardData().subscribe((data) => {
      this.allRegions = data;
      this.cardsTop = data.slice(0, 4);
      this.cardsLeft = data.slice(4, 7);
      this.cardsRight = data.slice(7, 10);
      this.cardsBottom = data.slice(10, 14);
      this.cardsTabletView1 = data.slice(0, 7);
      this.cardsTabletView2 = data.slice(7);
    });
  }

  // Add this method to handle map clicks specifically
  onMapRegionSelected(regionId: string | null): void {
    if (regionId) {
      // Only navigate when clicking on the map
      this.router.navigate(['/region-detail', regionId]);
    }
  }

  // Update the existing method to handle card clicks
  onRegionSelected(regionId: string | null): void {
    this.selectedRegionId = regionId;

    if (regionId) {
      // Just update selection, don't navigate
      this.selectedRegion =
        this.allRegions.find((region) => region.regionId === regionId) || null;
    } else {
      this.selectedRegion = null;
    }
  }
  // For card clicks - if you want different behavior
  onCardClick(regionData: RegionData): void {
    // You could do something different here, like highlighting the card
    // without navigating to a new page
    this.selectedRegion = regionData;
    this.selectedRegionId = regionData.regionId;
  }

  isRegionSelected(regionId: string): boolean {
    return this.selectedRegionId === regionId;
  }
}
