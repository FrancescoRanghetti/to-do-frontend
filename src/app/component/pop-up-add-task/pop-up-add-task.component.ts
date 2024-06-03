import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from "../../Interfaces/Tag";
import {TagService} from "../../Service/Tag.service";
import {TaskService} from "../../Service/Task.service";
import {Task} from "../../Interfaces/Task";
import {defer} from "rxjs";
import {ListService} from "../../Service/List.Service";
import {List} from "../../Interfaces/List";
import {MainAppComponent} from "../main-app/main-app.component";

@Component({
  selector: 'app-pop-up-add-task',
  templateUrl: './pop-up-add-task.component.html',
  styleUrls: ['./pop-up-add-task.component.css']
})
export class PopUpAddTaskComponent implements OnInit {
  @Input() item: boolean = true;
  @Output() newItemEvent = new EventEmitter<boolean>();
  protected tagArray: Tag[] = [];
  protected nameNewTask: string = '';
  protected descriptionNewTask: string = '';
  protected tagNewTask: number = 0;
  private currentIdUser: string | null = localStorage.getItem("currentIdUser");
  // @ts-ignore
  private localList: string | null = localStorage.getItem("localList");

  constructor(private tagService: TagService, private taskService: TaskService, private listService: ListService, private mainApp:MainAppComponent) {
  }

  close() {
    this.item = false;
    this.newItemEvent.emit(false)
  }

  ngOnInit(): void {
    this.tagService.getAllTag(Number(this.currentIdUser)).pipe().subscribe((tag: Tag[]) => {
      this.tagArray = tag;
    })
  }

  addTask() {
    let idListCurrentList;
    // @ts-ignore
    this.listService.getIdListByName(this.localList, Number(this.currentIdUser)).pipe().subscribe((idList: List[]) => {
      console.log(idList[0].id)
      idListCurrentList = idList[0].id;
      if (this.nameNewTask != '') {
        let newTask: Task = {
          name: this.nameNewTask,
          description: this.descriptionNewTask,
          complete: false,
          idUser: Number(this.currentIdUser),
          idTag: this.tagNewTask,
          idList: idListCurrentList
        }
        this.taskService.createTask(newTask).pipe().subscribe({
          next: (createdTask: Task) => {
            this.mainApp.ngOnInit()
            this.close()
          },
          error: (error) => {
            console.error('Error: ', error);
          }
        });
      }
    })
  }
}
