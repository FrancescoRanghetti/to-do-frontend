import {Component, EventEmitter, Input, Output} from '@angular/core';
import {List} from "../../Interfaces/List";
import {ListService} from "../../Service/List.Service";
import {MainAppComponent} from "../main-app/main-app.component";
import {Task} from "../../Interfaces/Task";

@Component({
  selector: 'app-pop-up-add-list',
  templateUrl: './pop-up-add-list.component.html',
  styleUrls: ['./pop-up-add-list.component.css']
})
export class PopUpAddListComponent {
  @Input() item: boolean = true;
  @Output() newItemEvent = new EventEmitter<boolean>();
  private currentIdUser: string | null = localStorage.getItem("currentIdUser");
  protected nameNewList: string = '';

  constructor(private listService: ListService, private mainApp: MainAppComponent) {
  }

  close() {
    this.item = false;
    this.newItemEvent.emit(false)
  }

  addList() {
    if (this.nameNewList != '') {
      this.listService.addList(this.nameNewList, Number(this.currentIdUser)).pipe().subscribe({
        next: (createdList: List) => {
          console.log('Task creato con successo:', createdList);
          this.mainApp.ngOnInit()
          this.close()
        },
        error: (error) => {
          console.error('Errore nella creazione del task:', error);
        }
      })
    }
  }

}
