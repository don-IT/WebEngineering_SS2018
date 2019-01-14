import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {AppComponent, AvailableDeviceComponent, DiagramComponent} from './components';
import {DiagramService} from './services';
import {MaxValidator, MinValidator} from './validators';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { OptionsComponent } from './components/options/options.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AvailableDeviceComponent,
    DiagramComponent,
    MaxValidator,
    MinValidator,
    LoginComponent,
    OptionsComponent,
    OverviewComponent,
    NavigationComponent
  ],
  providers: [
    DiagramService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
