import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RegionService } from '../services/region.service';

import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, GaugeChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { RegionMetadata } from '../interfaces/region-metadata';

echarts.use([
  CanvasRenderer,
  PieChart,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

@Component({
  selector: 'app-region-detail',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  providers: [
    provideEchartsCore({
      echarts,
    }),
  ],
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.scss'],
})
export class RegionDetailComponent implements OnInit, AfterViewInit {
  regionId: string | null = null;
  region: RegionMetadata | undefined;
  isLoading = false;
  bottomStats: { label: string; value: string | number }[] = [];
  genderChart: echarts.ECharts | null = null;
  scoreChart: echarts.ECharts | null = null;
  passRateChart: echarts.ECharts | null = null;

  genderChartOptions: any = {};
  scoreChartOptions: any = {};
  passRateChartOptions: any = {};

  @ViewChild('scoreChart') scoreChartElement!: ElementRef;
  @ViewChild('passRateChart') passRateChartElement!: ElementRef;

  constructor(
    private regionService: RegionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.regionId = this.route.snapshot.paramMap.get('regionId');

    if (this.regionId) {
      this.loadRegionData();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initScoreChart();
      this.initPassRateChart();
    }, 100);
  }

  closeDetail(): void {
    window.history.back();
  }

  loadRegionData(): void {
    if (!this.regionId) return;
    this.isLoading = true;

    this.regionService.getRegionById(this.regionId).subscribe({
      next: (data) => {
        this.region = data;
        this.isLoading = false;

        if (this.region) {
          this.updateChartOptions();

          this.bottomStats = [
            {
              label: 'Количество пользователей',
              value: this.region.totalUsers,
            },
            { label: 'Дата первого входа', value: this.region.firstEntryDate },
            { label: 'Обучаются сейчас', value: this.region.activeUsers },
            {
              label: 'Выдано сертификатов',
              value: this.region.certificatesIssued,
            },
            { label: 'Среднее время', value: this.region.averageTime },
          ];

          setTimeout(() => {
            this.initScoreChart();
            this.initPassRateChart();
          }, 50);
        }
      },
      error: (err) => {
        console.error('Error loading region data:', err);
        this.isLoading = false;
      },
    });
  }

  updateChartOptions(): void {
    if (!this.region) {
      return;
    }

    this.genderChartOptions = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Пол',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          data: [
            { value: this.region.genderDistribution.female, name: 'Женщины' },
            { value: this.region.genderDistribution.male, name: 'Мужчины' },
          ],
          color: ['#2563EB', '#94A3B8'],
        },
      ],
    };

    this.createGaugeOptions();
  }

  createGaugeOptions(): void {
    if (!this.region) return;

    const scoreValue = this.region.averageScore;
    const passRateValue = this.region.averagePassRate;

    this.scoreChartOptions = {
      series: [
        {
          type: 'gauge',
          radius: '100%',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false,
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: '#2563EB',
            },
          },
          axisLine: {
            lineStyle: {
              width: 12,
              color: [[1, '#E0E7FF']],
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: scoreValue,
            },
          ],
        },
      ],
    };

    this.passRateChartOptions = {
      series: [
        {
          type: 'gauge',
          radius: '100%',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false,
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: '#2563EB',
            },
          },
          axisLine: {
            lineStyle: {
              width: 12,
              color: [[1, '#E0E7FF']],
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: passRateValue,
            },
          ],
        },
      ],
    };
  }

  onGenderChartInit(ec: echarts.ECharts): void {
    this.genderChart = ec;
  }

  initScoreChart(): void {
    if (!this.scoreChartElement || !this.scoreChartElement.nativeElement)
      return;

    if (this.scoreChart) {
      this.scoreChart.dispose();
    }

    this.scoreChart = echarts.init(this.scoreChartElement.nativeElement);
    this.scoreChart.setOption(this.scoreChartOptions);
  }

  initPassRateChart(): void {
    if (!this.passRateChartElement || !this.passRateChartElement.nativeElement)
      return;

    if (this.passRateChart) {
      this.passRateChart.dispose();
    }

    this.passRateChart = echarts.init(this.passRateChartElement.nativeElement);
    this.passRateChart.setOption(this.passRateChartOptions);
  }
}
