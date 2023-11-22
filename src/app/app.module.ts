import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScreenComponent } from './components/screen/screen.component';
import { DataBarComponent } from './components/data-bar/data-bar.component';
import { GameOverModalComponent } from './components/modals/game-over-modal/game-over-modal.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { ScoreListComponent } from './components/score-list/score-list.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartGameModalComponent } from './components/modals/start-game-modal/start-game-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ScreenComponent,
    DataBarComponent,
    GameOverModalComponent,
    ScoreListComponent,
    StartGameModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
