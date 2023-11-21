import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

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


  constructor(private personService: PersonService) { }

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

  onClickSaveScore(){
    this.entryNameVisible = true;
  }

  agregar(){
    const currentDate = new Date();

    const formattedDate =
    currentDate.getDate().toString().padStart(2, '0') + '/' +
    (currentDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
    currentDate.getFullYear();

    this.personService.addPerson({"id": 0, "name": this.name, "score":this.score, "date": formattedDate}).subscribe(response => {console.log(response)})
  }
}
