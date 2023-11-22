import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'start-game-modal',
  templateUrl: './start-game-modal.component.html',
  styleUrls: ['./start-game-modal.component.scss']
})
export class StartGameModalComponent implements OnInit {

  @Output()
  difficultChange = new EventEmitter<string>();


  visible: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  setDifficult(difficult: string){
    this.difficultChange.emit(difficult);
    this.setVisibleOff();
  }

  setVisibleOn(){
    this.visible = true;
  }

  setVisibleOff(){
    this.visible = false;
  }
}
