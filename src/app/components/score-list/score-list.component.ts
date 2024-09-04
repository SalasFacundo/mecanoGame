import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score.model';
import { ScoreService } from 'src/app/services/score-service.service';


@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource!: Score[];


  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreService.getScores().subscribe((scores: any) => {
      this.dataSource = scores.scores.sort((a:any, b:any) => b.score - a.score)
        .slice(0, 20);
    });
  }
}
