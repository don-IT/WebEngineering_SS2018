import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AvailableDevice } from '../../models/device.available';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  devices: AvailableDevice[] = [];

  private devicesUrl = 'http://localhost:8081/devices';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<AvailableDevice[]>(this.devicesUrl).subscribe(
      devices => this.devices = devices,
      error => console.log('Die verfügbaren Geräte konnten vom Server nicht geladen werden.')
    );
  }

}
