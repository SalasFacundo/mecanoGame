import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScoreService } from 'src/app/services/score-service.service';

@Component({
  selector: 'game-over-modal',
  templateUrl: './game-over-modal.component.html',
  styleUrls: ['./game-over-modal.component.scss']
})
export class GameOverModalComponent implements OnInit {

  @Output()
  playAgainChange= new EventEmitter<boolean>();

  visible: boolean = false;
  entryNameVisible: boolean = false;
  name: string ="";
  score: number =0;


  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
  }

  onClickButton(option: boolean){
    this.playAgainChange.emit(option);
    this.visible = false;
  }

  turnOn(score: number){
    this.score = score;
    this.visible = true;
  }

  turnOff(){
    this.visible = false;
  }
}
