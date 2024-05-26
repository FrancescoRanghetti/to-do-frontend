export interface  Task {
  id?: number,
  name: string,
  description: string,
  complete: boolean,
  idUser: number,
  idTag: number,
  idList: number
}
