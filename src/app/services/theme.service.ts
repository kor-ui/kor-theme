import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setPropertyValue(name: string, val: string): void {
    const el: any = document.querySelector('iframe')?.contentWindow?.document.body;
    el?.style.setProperty(name, val);
  }

  getPropertyValue(name: string): string {
    const el: any = document.querySelector('iframe')?.contentWindow?.document.body;
    return el ? getComputedStyle(el).getPropertyValue(name) : '';
  }

  getRandomNumber(min: number = 0, max: number = 255): Promise<number> {
    return new Promise((resolve) => resolve(min + Math.floor(Math.random() * (max - min + 1))));
  }

  copyCSS(): void {
    const el: any = document.querySelector('iframe')?.contentWindow?.document.body;
    navigator.clipboard.writeText(el?.getAttribute('style'));
  }

}
