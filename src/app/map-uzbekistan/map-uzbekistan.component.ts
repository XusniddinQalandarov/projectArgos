import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map-uzbekistan',
  standalone: true,
  templateUrl: './map-uzbekistan.component.html',
})
export class MapUzbekistanComponent implements OnChanges {
  @Input() selectedRegionId: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRegionId']) {
      this.highlightRegion();
    }
  }

  private highlightRegion(): void {
    const allRegions = document.querySelectorAll('path[id]');
    allRegions.forEach((region) => {
      if (region instanceof SVGPathElement) {
        region.style.fill = '';
        region.style.opacity = '1';
      }
    });

    if (this.selectedRegionId) {
      const selectedRegion = document.getElementById(this.selectedRegionId);
      if (selectedRegion && selectedRegion instanceof SVGPathElement) {
        selectedRegion.style.fill = '#94A3B8';
      }
    }
  }
}
