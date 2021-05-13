import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  ngOnInit(): void {
    this.themeService.setPropertyValue('--accent-1', `${this.themeService.getRandomRgbString(0, 200)}`);
  }



}
