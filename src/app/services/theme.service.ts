import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setPropertyValue(name: string, val: string): void {
    const el: any = document.querySelector('iframe')?.contentWindow?.document.documentElement;
    console.log(el);
    el?.style.setProperty(name, val);
  }

  getPropertyValue(name: string): string {
    const el: any = document.querySelector('iframe')?.contentWindow?.document.documentElement;
    return el ? getComputedStyle(el).getPropertyValue(name) : '';
  }

  getRandomRgb(min: number = 0, max: number = 255): number {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  getRandomRgbString(min: number = 0, max: number = 255): string {
    return `${this.getRandomRgb(min, max)}, ${this.getRandomRgb(min, max)}, ${this.getRandomRgb(min, max)}`;
  }

}
