import { Component, OnInit } from '@angular/core';

//Models
import { friendList } from "./../models/friendList";
import { friend } from './../models/friend';
//Services
import { OthelloService } from "./../services/othello.service";
import { ToastService } from "./../services/toast.service";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.page.html',
  styleUrls: ['./friend-list.page.scss'],
})
export class FriendListPage implements OnInit {

  listName:string;

  FL = new friendList();

  datosUsuarioLoggedIn : any;

  idFriendList:any;

  friendList:any;

  addF = new friend();

  deleteF = new friend();

  allPlayers:any;

  idFriendToAdd:any;

  idFriendToDelete:any;
  listNameF: any

  constructor(private othello: OthelloService, private toast:ToastService) {
  this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
  this.idFriendList = JSON.parse(localStorage.getItem('FriendList'));
  this.listName = JSON.parse(localStorage.getItem('ListName'));
  this.getFriendList();
  this.othello.getAllPlayers()
    .subscribe((data:any)=>{
      this.allPlayers = data.users
      this.deleteUserLoggedIn()
    })
 }

  ngOnInit() {
  }

  createFL(){
    this.FL.idFamilyOwner=this.datosUsuarioLoggedIn.user.uid;
    this.FL.listName=this.listName;
    this.othello.createFL(this.FL)
    .subscribe((data:any)=>{
      if (data) {
        this.idFriendList = data.idFamily;
        localStorage.setItem('FriendList',JSON.stringify(data.idFamily))
        localStorage.setItem('ListName',JSON.stringify(data.FamilyName))
        this.toast.presentToast("Familia generada con éxito");
        if (data.message == 'Already Exist') {
          this.toast.presentToast("Ya tienes una Familia");
        }
      }
    });
  }

  addFriend(){
    if (this.idFriendToAdd != undefined) {
      this.addF.idFamily = this.idFriendList
      this.addF.idMember = this.idFriendToAdd
      this.othello.addFriend(this.addF)
      .subscribe((data:any)=>{
        this.getFriendList();
        this.toast.presentToast("Persona agregado a la familia: " + this.listName)
      })
    }
  }

  deleteFriend(){
    if (this.idFriendToDelete != undefined) {
      this.deleteF.idFamily = this.idFriendList
      this.deleteF.idMember = this.idFriendToDelete
      this.othello.removeFriend(this.deleteF)
      .subscribe((data:any)=>{
        this.getFriendList();
        this.toast.presentToast("Persona eliminado de la familia: " + this.listName)
      });
    }

  }

  getFriendList(){
    this.othello.getFL(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
        this.friendList = data.data.members;
    });
  }

  deleteUserLoggedIn(){
    for (let index = 0; index < this.allPlayers.length; index++) {
        if (this.allPlayers[index].uid == this.datosUsuarioLoggedIn.user.uid) {
           this.allPlayers.splice(index,1);
        }
    }
  }

}
