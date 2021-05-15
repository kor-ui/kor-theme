import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  componentToHex(c: number): string | number {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(rgb: string): string {
    const rgbArray = rgb.replace(' ', '').split(',');
    const [r, g, b] = [
      parseInt(rgbArray[0]),
      parseInt(rgbArray[1]),
      parseInt(rgbArray[2])
    ];
    return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
  }

  hexToRgb(hex: string): string | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : null;
  }

}
