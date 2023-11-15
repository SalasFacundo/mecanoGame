import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScreenComponent } from './components/screen/screen.component';
import { DataBarComponent } from './components/data-bar/data-bar.component';
import { GameOverModalComponent } from './components/modals/game-over-modal/game-over-modal.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ScreenComponent,
    DataBarComponent,
    GameOverModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
