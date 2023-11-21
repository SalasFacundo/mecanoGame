import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';


@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource!: Person[];


  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPersons().subscribe((persons: Person[]) => {
      this.dataSource = persons
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
    });
  }
}
