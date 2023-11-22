import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameOverModalComponent } from 'src/app/components/modals/game-over-modal/game-over-modal.component';
import { ScreenComponent } from 'src/app/components/screen/screen.component';
import { WordsServiceService } from 'src/app/services/words-service.service';


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  word : string = "";
  score : number = 0;
  scorePlus : number = 0;
  lifes: number = 3;
  totalSeconds = 100;
  progress = 0;
  wordArray: string[] = [];

  private timerSubscription: Subscription | undefined;

  @ViewChild('inputWord', { static: false })
  inputWord!: ElementRef;

  @ViewChild('screen')
  screenComponent!: ScreenComponent;

  @ViewChild('gameOverModal')
  gameOverModal!: GameOverModalComponent;

  constructor( private wordsServiceService: WordsServiceService) { }

  ngOnInit(): void {
    this.getNewWord();
  }

  wordTipped(event: any, input: any){

    let tippedWord = event.target.value.toUpperCase();

    if(tippedWord != this.word.substring(0, tippedWord.length)){
      if(this.lifes == 0){
        this.gameOverModal.turnOn(this.score);
      } else{
          this.lifes--;
          input.value="";
          this.getNewWord();
          this.restartTimer();
      }
    } else if(tippedWord.length == this.word.length) {
        input.value="";
        this.score += this.scorePlus;
        this.getNewWord();
        this.restartTimer();
    }
  }

  onPlayAgainChange(event: any){
    if(event){
      this.score = 0;
      this.getNewWord();
      this.lifes = 3;
      if(this.inputWord && this.inputWord.nativeElement){
        this.inputWord.nativeElement.value = "";
        this.inputWord.nativeElement.focus();
      }
      this.restartTimer();
    }
  }

  startTimer(): void {
    const interval$ = interval(250);
    this.timerSubscription = interval$.subscribe((second) => {
    this.progress = (second / this.totalSeconds) * 100;
      if (second >= this.totalSeconds+1) {
        if(this.lifes == 0){
          this.gameOverModal.turnOn(this.score);
        } else {
          setTimeout(() => {
            this.lifes--;
            this.getNewWord();
            this.restartTimer();
          }, 2000);
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

    this.wordsServiceService.getRandomWord().subscribe(response =>{
      this.word = this.quitarAcentos(response).toUpperCase();
      //this.restartTimer();
    })
  }

  quitarAcentos(cadena: string): string {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  onDifficultChange(event: any){
    switch (event) {
      case "easy":
        this.totalSeconds = 100;
        this.scorePlus = 10;
      break;
      case "medium":
        this.totalSeconds = 50;
        this.scorePlus = 50;
      break;
      case "hard":
        this.totalSeconds = 10;
        this.scorePlus = 100;
      break;
      default:
        break;
    }
  }
}
