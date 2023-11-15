import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-bar',
  templateUrl: './data-bar.component.html',
  styleUrls: ['./data-bar.component.scss']
})
export class DataBarComponent implements OnInit {

  @Input()
  scoreChange: number = 0;

  @Input()
  lifesChange: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

  repeat(){
    return Array(this.lifesChange).fill(0).map((_, index) => index);
  }

}
