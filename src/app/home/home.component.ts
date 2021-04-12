import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@app/todos/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public showForm$ = this.utilsService.showAction$;

  constructor(private utilsService:UtilsService) { }

  ngOnInit(): void {
  }

  onShowForm(){
      this.utilsService.showForm(true);
  }

}
