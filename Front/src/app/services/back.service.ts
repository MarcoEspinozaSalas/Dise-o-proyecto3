import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Models
import { infoUser } from '../models/infoUser';
//import { addPlayerModal } from '../models/addPlayerModal';
import { familyList } from '../models/familyList';
import { editFL } from '../models/editFL';
import { family } from '../models/family';
//Environment
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BackService {

  constructor(private http: HttpClient) { }

  postPlayer(
    data: infoUser
  ) {
    return this.http.post(`${environment.urlRootBack}/savePlayerInformation`, data);
  }

  getAllPlayers(){
    return this.http.get(`${environment.urlRootBack}/getAllplayers`);
  }


  //Lista de amigos

  createFL(
    data: familyList
  ){
    return this.http.post(`${environment.urlRootBack}/createdF`, data);
  }

  getFL(
    idListOwner:string
  ){
    return this.http.get(`${environment.urlRootBack}/getMemberListByOwner?idListOwner=${idListOwner}`);
  }

  editFL(
    data: editFL
  ){
    return this.http.put(`${environment.urlRootBack}/editFriendList`, data);
  }

  addMember(
    data: family
  ){
      return this.http.put(`${environment.urlRootBack}/addMember`, data);
  }

  removeMember(
    data: family
  ){
      return this.http.put(`${environment.urlRootBack}/removeMember`, data);
  }

}
