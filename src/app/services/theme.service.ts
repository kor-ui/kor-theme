import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setPropertyValue(name: string, val: string): void {
    const body: any = this.getIframeBody();
    body?.style.setProperty(name, val);
  }

  getPropertyValue(name: string): string {
    const body: any = this.getIframeBody();
    return body ? getComputedStyle(body).getPropertyValue(name) : '';
  }

  getRandomNumber(min: number = 0, max: number = 255): Promise<number> {
    return new Promise((resolve) => resolve(min + Math.floor(Math.random() * (max - min + 1))));
  }

  copyCSS(): void {
    const body: any = this.getIframeBody();
    navigator.clipboard.writeText(body?.getAttribute('style'));
  }

  getIframeBody(): HTMLElement | undefined {
    return document.querySelector('iframe')?.contentWindow?.document.body;
  }

  importFont(font: string): void {
    const head: any = document.querySelector('iframe')?.contentWindow?.document.head;
    const style: HTMLStyleElement | undefined = head.querySelector("link[href*='fonts.googleapis.com']");
    style?.remove();
    head.insertAdjacentHTML('beforeend', `<link href="https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}&display=swap" rel="stylesheet">`);
    this.setPropertyValue('--header-1', `bold 16px/24px ${font}`);
  }

}
