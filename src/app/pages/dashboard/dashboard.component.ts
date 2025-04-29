import { Component } from '@angular/core';
import { getBsVer, IBsVersion } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isFirstOpen = true;

  get _getBsVer(): IBsVersion {
    return getBsVer();
  }
}
