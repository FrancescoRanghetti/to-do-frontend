import {Component, OnInit} from '@angular/core';
import {ListService} from "../../Service/List.Service";
import {List} from "../../Interfaces/List";
import {TagService} from "../../Service/Tag.service";
import {Tag} from "../../Interfaces/Tag";
import {TaskService} from "../../Service/Task.service";
import {Task} from "../../Interfaces/Task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  protected listArray: List[] = [];
  protected tagArray: Tag[] = [];
  protected taskCompletedArray: Task[] = [];
  protected taskNotCompletedArray: Task[] = [];
  protected listName: string = '';
  protected showDetails: boolean = false;
  protected id: number = 0;
  protected seeAddList: boolean = false;
  protected seeAddTag: boolean = false;
  protected seeAddTask: boolean = false;


  constructor(private listSerivce: ListService, private tagService: TagService, private taskSerivce: TaskService, private router: Router) {
  }

  ngOnInit(): void {
    if (!(localStorage.getItem("login") == 'done')) {
      this.router.navigate(['/welcome'])
    }
    let currentIdUser: string | null = localStorage.getItem("currentIdUser");
    this.listSerivce.getAllList(Number(currentIdUser)).pipe().subscribe((list: List[]) => {
      // @ts-ignore
      this.listArray = list;
    })

    this.tagService.getAllTag(Number(currentIdUser)).pipe().subscribe((tag: Tag[]) => {
      this.tagArray = tag;
    })


    // @ts-ignore
    this.listSerivce.getIdListByName(localStorage.getItem("localList").toString(), Number(currentIdUser)).pipe().subscribe((idList: List[]) => {
      console.log(idList[0].id)
      // @ts-ignore
      console.log(localStorage.getItem("localList").toString())
      console.log(Number(currentIdUser))
      this.taskSerivce.getAllNoCompleteTask(Number(currentIdUser), idList[0].id).pipe().subscribe((task: Task[]) => {
        console.log(task)
        this.taskNotCompletedArray = task;
      })

      this.taskSerivce.getAllCompleteTask(Number(currentIdUser), idList[0].id).pipe().subscribe((task: Task[]) => {
        console.log(task)
        this.taskCompletedArray = task;
      })
    })


    if (!localStorage.getItem("localList")) {
      localStorage.setItem("localList", 'Select a list');
    }
    // @ts-ignore
    this.listName = localStorage.getItem("localList").toString();
  }

  updateListNameLocal(listName: string) {
    localStorage.setItem("localList", listName);
    this.listName = listName;
    this.ngOnInit()
  }

  toggleDetails(task: Task, id?: number): void {
    if (id !== undefined) {
      this.id = id;
      this.showDetails = !this.showDetails;
    }
  }

  markTask(id?: number): void {
    if (id !== undefined) {
      this.taskSerivce.markTask(id).pipe().subscribe(() => this.ngOnInit());
    }
  }

  unmarkTask(id?: number): void {
    if (id !== undefined) {
      this.taskSerivce.unmarkTask(id).pipe().subscribe(() => this.ngOnInit());
    }
  }

  getNameTagById(idTag: number): string {
    for (let i = 0; i < this.tagArray.length; i++) {
      // @ts-ignore
      if (this.tagArray.at(i).id == idTag) {
        // @ts-ignore
        return this.tagArray.at(i).name;
      }
    }
    return 'Tag not found'
  }

  deleteTask(idTask?: number) {
    // @ts-ignore
    this.taskSerivce.deleteTask(idTask).pipe().subscribe()
    this.ngOnInit()
  }

  deleteTag(nameTag: string) {
    this.tagService.deleteTag(Number(localStorage.getItem("currentIdUser")), nameTag).pipe().subscribe()
    this.ngOnInit()
    this.ngOnInit()
  }

  deleteList(name: string) {
    let idList;
    this.listSerivce.getIdListByName(name, Number(localStorage.getItem("currentIdUser"))).pipe().subscribe((list: List) => {
      idList = list.id
    })
    console.log("idlist: "+idList)
    // @ts-ignore
    this.taskSerivce.getAllNoCompleteTask(Number(localStorage.getItem("currentIdUser")), idList).pipe().subscribe((task: Task[]) => {
      console.log(task)
      this.taskNotCompletedArray = task;
    })

    // @ts-ignore
    this.taskSerivce.getAllCompleteTask(Number(localStorage.getItem("currentIdUser")), idList).pipe().subscribe((task: Task[]) => {
      console.log(task)
      this.taskCompletedArray = task;
    })
    console.log("this.taskCompletedArray: " + this.taskCompletedArray)
    console.log("this.taskNotCompletedArray: " + this.taskNotCompletedArray)
    for (let i = 0; i < this.taskCompletedArray.length; i++) {
      // @ts-ignore
      if (this.taskCompletedArray.at(i).idList == idList) {
        // @ts-ignore
        console.log("this.taskCompletedArray.at(i).name" + this.taskCompletedArray.at(i).name)
        // @ts-ignore
        this.taskSerivce.deleteTask(this.taskCompletedArray.at(i).id)
      }
    }
    for (let i = 0; i < this.taskNotCompletedArray.length; i++) {
      console.log("invece entra qua: " + this.taskNotCompletedArray.at(i))
      // @ts-ignore
      if (this.taskNotCompletedArray.at(i).idList == idList) {
        console.log("entra qua")
        // @ts-ignore
        this.taskSerivce.deleteTask(this.taskNotCompletedArray.at(i).id)
      }
    }
    this.listSerivce.deleteList(name, Number(localStorage.getItem("currentIdUser"))).pipe().subscribe(() => {
      localStorage.setItem("localList", 'Select a list')
      this.ngOnInit()
    })
  }


  seePopUpAddList(): boolean {
    console.log("this.seeAddList: " + this.seeAddList)
    console.log("entra")
    if (!this.seeAddList) {
      this.seeAddList = true;
      console.log("this.seeAddList: " + this.seeAddList)
      return true;
    }
    return false;
  }

  updateChildAddList() {
    this.seeAddList = false
  }

  updateChildAddTag() {
    this.seeAddTag = false
  }

  updateChildAddTask() {
    this.seeAddTask = false
  }

  seePopUpAddTag() {
    console.log("this.seeAddTag: " + this.seeAddTag)
    console.log("entra")
    if (!this.seeAddTag) {
      this.seeAddTag = true;
      console.log("this.seeAddTag: " + this.seeAddTag)
      return true;
    }
    return false;
  }

  seePopUpAddTask() {
    console.log("this.seeAddTask: " + this.seeAddTask)
    console.log("entra")
    if (!this.seeAddTask) {
      this.seeAddTask = true;
      console.log("this.seeAddTask: " + this.seeAddTask)
      return true;
    }
    return false;
  }

  logout(){
    localStorage.setItem("login", "not")
    this.router.navigate(['/welcome'])
  }
}
