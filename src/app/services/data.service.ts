import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegionData {
  name: string;
  regionId: string;
  totalUsers: string;
  usersLabel: string;
  averageResultLabel: string;
  averageResultValue: string;
  inProgressLabel: string;
  inProgressValue: string;
  completedLabel: string;
  completedValue: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private baseUrl = `https://api.jsonbin.io/v3/b/${environment.jsonBin.binId1}/latest`;
  private headers = new HttpHeaders({
    'X-Master-Key': environment.jsonBin.apiKey,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<RegionData[]> {
    return this.http
      .get<{ record: { regions: RegionData[] } }>(this.baseUrl, {
        headers: this.headers,
      })
      .pipe(map((response) => response.record.regions));
  }
}
