import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-uzbekistan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-uzbekistan.component.html',
})
export class MapUzbekistanComponent implements OnChanges {
  @Input() selectedRegionId: string | null = null;
  @Output() regionSelected = new EventEmitter<string | null>();

  // The error occurs because the template references 'region' but it's not defined in the component
  // Instead of modifying all SVG paths, let's use the proper approach

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRegionId']) {
      this.highlightRegion();
    }
  }

  onMapClick(event: MouseEvent): void {
    // Handle clicks on the map background
    console.log('Map background clicked');
    this.regionSelected.emit(null); // Clear selection when clicking background
  }

  onRegionClick(event: MouseEvent): void {
    // Stop the event from bubbling up to the SVG's click handler
    event.stopPropagation();

    // Get the clicked element
    const target = event.target as SVGPathElement;
    if (target && target.id) {
      console.log(`Region ${target.id} clicked`);
      this.regionSelected.emit(target.id);
    }
  }

  private isZoomed = false;

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;

    // Find the SVG element
    const svg = document.querySelector('svg');

    if (this.selectedRegionId) {
      const selectedRegion = document.getElementById(this.selectedRegionId);

      if (this.isZoomed && selectedRegion instanceof SVGPathElement) {
        // Zoom in: Calculate the bounding box and adjust viewBox
        const bbox = selectedRegion.getBBox();
        const padding = 20;
        svg?.setAttribute(
          'viewBox',
          `${bbox.x - padding} ${bbox.y - padding} ${
            bbox.width + padding * 2
          } ${bbox.height + padding * 2}`
        );
      } else {
        // Zoom out: Reset to default viewBox
        svg?.setAttribute('viewBox', '0 0 527 344');
      }
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
