import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  @Input()
  word: string = "";


  @Input()
  progress: number = 0;

  @Output()
  wordChange =  new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }





}
