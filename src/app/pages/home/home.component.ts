import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
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
      properties: ['--neutral-1', '--neutral-2']
    },
    {
      name: 'Functional',
      properties: ['--functional-red', '--functional-yellow', '--functional-green', '--functional-blue']
    }
  ];

  constructor(public themeService: ThemeService, public colorService: ColorService) { }

  ngAfterViewInit(): void {
    // after iframe loads, set random properties
    const iframe = this.iframe?.nativeElement;
    iframe?.addEventListener('load', () => {
      iframe.style.opacity = 1;
      iframe.contentWindow.document.querySelector('kor-page').style.zoom = '0.75';
      // set initial theme
      this.setRandomTheme();
    });
  }

  setRandomTheme(): void {
    const themes = ['dark', 'light'];
    this.themeService.getRandomNumber(0, 1).then(val => this.setTheme(themes[val]));
  }

  private setTheme(theme: string): void {
    this.setNeutralColors(theme);
    this.setBaseColors(theme);
    this.setAccentColors();
    this.setTextColors();
    this.setShadow();
    this.setBorderRadius();
  }

  private async setAccentColors(): Promise<null> {
    let r: number = 0, g: number = 0, b: number = 0;
    await this.themeService.getRandomNumber().then((val) => r = val);
    await this.themeService.getRandomNumber().then((val) => g = val);
    await this.themeService.getRandomNumber().then((val) => b = val);
    this.themeService.setPropertyValue('--accent-1', `${r}, ${g}, ${b}`);
    this.themeService.setPropertyValue('--accent-1b', `${r + 10}, ${g + 10}, ${b + 10}`);
    this.themeService.setPropertyValue('--accent-1c', `${r - 10}, ${g - 10}, ${b - 10}`);
    return new Promise(async (resolve) => resolve(null));
  }

  private setNeutralColors(theme: string): void {
    const neutral1 = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
    const neutral2 = theme === 'dark' ? '0 ,0, 0' : '255, 255, 255';
    this.themeService.setPropertyValue('--neutral-1', neutral1);
    this.themeService.setPropertyValue('--neutral-2', neutral2);
  }

  private setTextColors(): void {
    const neutral1 = this.themeService.getPropertyValue('--neutral-1');
    this.themeService.setPropertyValue('--text-1', `rgba(${neutral1}, .9)`);
    this.themeService.setPropertyValue('--text-2', `rgba(${neutral1}, .6)`);
    this.themeService.setPropertyValue('--text-3', `rgba(${neutral1}, .2)`);
  }

  private setShadow(): void {
    // --shadow-1: 0 2px 8px rgba(0,0,0,.1), 0 1px 4px rgba(0,0,0,.05);
    this.themeService.getRandomNumber(0, 4).then(async (b) => {
      let x: number = 0, y: number = 0, s: number = 0, a: number = 0;
      await this.themeService.getRandomNumber(-2, 2).then((val) => x = val);
      await this.themeService.getRandomNumber(-2, 2).then((val) => y = val);
      await this.themeService.getRandomNumber(0, 2).then((val) => s = val);
      await this.themeService.getRandomNumber(0, 2).then((val) => a = val);
      const color = (b < 3 && x === y)
        ? `rgba(${this.themeService.getPropertyValue('--neutral-1')}, 0.${a})`
        : `rgba(0, 0, 0, 0.${a})`;
      this.themeService.setPropertyValue('--shadow-1', `${x}px ${y}px ${b}px ${s}px ${color}`);
    });
  }

  private setBorderRadius(): void {
    this.themeService.getRandomNumber(0, 12).then(val => {
      this.themeService.setPropertyValue('--border-radius', `${val}px`);
    });
  }

  private setBaseColors(theme: string): void {
    this.themeService.getRandomNumber(0, 40).then(async (step) => {
      const min = theme === 'dark' ? 0 : 245 - step * 4;
      const max = theme === 'dark' ? 20 : 255 - step * 4;
      let r: number = 0, g: number = 0, b: number = 0;
      await this.themeService.getRandomNumber(min, max).then((val) => r = val);
      await this.themeService.getRandomNumber(min, max).then((val) => g = val);
      await this.themeService.getRandomNumber(min, max).then((val) => b = val);
      this.themeService.setPropertyValue('--base-0', `${r + step * 3}, ${g + step * 3}, ${b + step * 3}`);
      this.themeService.setPropertyValue('--base-1', `${r + step * 1}, ${g + step * 1}, ${b + step * 1}`);
      this.themeService.setPropertyValue('--base-2', `${r + step * 2}, ${g + step * 2}, ${b + step * 2}`);
      this.themeService.setPropertyValue('--base-3', `${r + step * 3}, ${g + step * 3}, ${b + step * 3}`);
      this.themeService.setPropertyValue('--base-4', `${r + step * 4}, ${g + step * 4}, ${b + step * 4}`);
    });
  }

  pickColor(property: string, tar: any): void {
    const rgb = this.colorService.hexToRgb(tar.value);
    if (rgb) {
      this.themeService.setPropertyValue(property, rgb);
    }
  };

}
