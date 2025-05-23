import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RegionData } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-card',
  imports: [CommonModule],
  templateUrl: './region-card.component.html',
})
export class RegionCardComponent {
  @Input() data!: RegionData;
  @Input() isSelected: boolean = false;
  @Output() regionSelected = new EventEmitter<string>();

  onCardClick() {
    this.regionSelected.emit(this.data.regionId);
  }
}
