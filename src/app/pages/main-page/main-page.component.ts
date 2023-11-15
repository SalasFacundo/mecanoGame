import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameOverModalComponent } from 'src/app/components/modals/game-over-modal/game-over-modal.component';
import { ScreenComponent } from 'src/app/components/screen/screen.component';


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  word : string = "";
  score : number = 0;
  lifes: number = 3;
  totalSeconds = 5;
  progress = 0;
  wordArray: string[] = [];

  private timerSubscription: Subscription | undefined;

  @ViewChild('myInput', { static: false })
  myInput!: ElementRef;

  @ViewChild('screen')
  screenComponent!: ScreenComponent;

  @ViewChild('gameOverModal')
  gameOverModal!: GameOverModalComponent;

  constructor() { }

  ngOnInit(): void {
    this.getNewWord();
    this.startTimer();
  }

  wordTipped(event: any, input: any){

    let tippedWord = event.target.value.toUpperCase();

    if(tippedWord != this.word.substring(0, tippedWord.length)){
      if(this.lifes == 0){
        this.gameOverModal.turnOn();
      } else{
          this.lifes--;
          input.value="";
          this.getNewWord();
      }
    } else if(tippedWord.length == this.word.length) {
        input.value="";
        this.score += 100;
        this.getNewWord();
    }
  }

  onPlayAgainChange(event: any){
    if(event){
      this.score = 0;
      this.getNewWord();
      this.lifes = 3;
      this.myInput.nativeElement.focus();
    }
  }

  startTimer(): void {
    const interval$ = interval(300);
    this.timerSubscription = interval$.subscribe((second) => {
    this.progress = (second / this.totalSeconds) * 100;
      if (second >= this.totalSeconds+1) {
        if(this.lifes == 0){
          this.gameOverModal.turnOn();
        } else {
          this.lifes--;
          this.getNewWord();
        }
        this.unsubscribeTimer();
      }
    });
  }

  restartTimer(): void {
    this.unsubscribeTimer();
    this.progress = 0;
    this.startTimer();
  }

  private unsubscribeTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getNewWord(){
    this.getRandomWord().then(word => {
      this.word = word;
      this.restartTimer();
    });
  }

  getRandomWord(): Promise<string> {
    return fetch("https://random-word-api.herokuapp.com/word?lang=es")
      .then(response => response.json())
      .then(data => {
        const word = this.quitarAcentos(data[0].toUpperCase());
        this.wordArray = word.split("");
        return word;
      });
  }

  quitarAcentos(cadena: string): string {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
