import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { RegionMetadata } from '../interfaces/region-metadata';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegionService {
  private readonly url = `https://api.jsonbin.io/v3/b/${environment.jsonBin.binId2}/latest`;

  private readonly headers = new HttpHeaders({
    'X-Master-Key': environment.jsonBin.apiKey,
    'Content-Type': 'application/json',
  });
  private readonly http = inject(HttpClient);

  getAllRegions(): Observable<RegionMetadata[]> {
    return this.http
      .get<{ record: { regions: RegionMetadata[] } }>(this.url, {
        headers: this.headers,
      })
      .pipe(map((res) => res.record.regions));
  }

  getRegionById(id: string): Observable<RegionMetadata | undefined> {
    return this.getAllRegions().pipe(
      map((regions) => regions.find((r) => r.id === id))
    );
  }
}
