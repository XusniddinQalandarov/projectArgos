import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface RegionData {
  name: string;
  regionId: string;
  totalUsers: string;
  usersLabel: string;
  averageResultLabel: string;
  averageResultValue: string;
  inProgressLabel: string;
  inProgressValue: string;
  inProgressIcon?: string;
  completedLabel: string;
  completedValue: string;
  completedIcon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getDashboardData(): Observable<RegionData[]> {
    const mockData: RegionData[] = [
      {
        name: 'Ташкент',
        regionId: 'tashkentRegion',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Самаркандская область',
        regionId: 'samarkand',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Наманганская область',
        regionId: 'namangan',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Сурхандарьинская область',
        regionId: 'surkhandarya',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Ферганская область',
        regionId: 'fergana',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Кашкадарьинская область',
        regionId: 'kashkadarya',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Сырдарьинская область',
        regionId: 'syrdarya',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Хорезмская область',
        regionId: 'khorezm',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Джизакская область',
        regionId: 'jizzakh',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Бухарская область',
        regionId: 'bukhara',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Республика Каракалпакистан',
        regionId: 'karakalpakstan',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Навоийская область',
        regionId: 'navoi',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Андижанская область',
        regionId: 'andijan',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
      {
        name: 'Ташкентская область',
        regionId: 'tashkent',
        totalUsers: '32 059',
        usersLabel: 'Количество пользователей',
        averageResultLabel: 'Средний результат',
        averageResultValue: '86.9%',
        inProgressLabel: 'В прогрессе',
        inProgressValue: '9 852',
        completedLabel: 'Завершено',
        completedValue: '50 182',
      },
    ];
    return of(mockData);
  }
}
