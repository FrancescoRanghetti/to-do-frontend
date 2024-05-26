import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tag} from "../../Interfaces/Tag";
import {TagService} from "../../Service/Tag.service";
import {MainAppComponent} from "../main-app/main-app.component";

@Component({
  selector: 'app-pop-up-add-tag',
  templateUrl: './pop-up-add-tag.component.html',
  styleUrls: ['./pop-up-add-tag.component.css']
})
export class PopUpAddTagComponent {
  @Input() item: boolean = true;
  @Output() newItemEvent = new EventEmitter<boolean>();
  private currentIdUser: string | null = localStorage.getItem("currentIdUser");
  protected nameNewTag: string = '';

  constructor(private tagService: TagService, private mainApp: MainAppComponent) {
  }

  close() {
    this.item = false;
    this.newItemEvent.emit(false)
  }

  addTag() {
    if (this.nameNewTag != '') {
      this.tagService.addTagByIdUser(this.nameNewTag, Number(this.currentIdUser)).pipe().subscribe({
        next: (createdTag: Tag) => {
          console.log('Task creato con successo:', createdTag);
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
