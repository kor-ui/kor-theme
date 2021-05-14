import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('iframe') iframe: ElementRef | undefined;
  colorCategories = [
    {
      name: 'Base',
      properties: ['--base-0', '--base-1', '--base-2', '--base-3', '--base-4']
    },
    {
      name: 'Accent',
      properties: ['--accent-1', '--accent-1b', '--accent-1c']
    },
    {
      name: 'Neutral',
      properties: ['--neutral-1', 'neutral-2']
    },
    {
      name: 'Functional',
      properties: ['--functional-red', '--functional-yellow', '--functional-green', '--functional-blue']
    }
  ];

  constructor(public themeService: ThemeService) { }

  ngAfterViewInit(): void {
    // after iframe loads, set random properties
    const iframe = this.iframe?.nativeElement;
    iframe?.addEventListener('load', () => {
      iframe.style.opacity = 1;
      iframe.style.marginTop = 0;
      this.createRandomTheme();
    });
  }

  private createRandomTheme(): void {
    this.themeService.setPropertyValue('--accent-1', `${this.themeService.getRandomRgbString(0, 200)}`);
  }

}
