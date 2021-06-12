import { Component, OnInit } from '@angular/core';
import { family } from '../models/family';
import { BackService } from '../services/back.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-family-main',
  templateUrl: './family-main.page.html',
  styleUrls: ['./family-main.page.scss'],
})
export class FamilyMainPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  listName:string;
/*
  FL = new friendList();
*/
  datosUsuarioLoggedIn : any;

  idFriendList:any;

  friendList:any;
/*
  addF = new member();

  deleteF = new member();
*/
  allPlayers:any;

  idFriendToAdd:any;

  idFriendToDelete:any;
/*
  constructor(private back: BackService, private toast:ToastService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.idFriendList = JSON.parse(localStorage.getItem('FriendList'));
    this.listName = JSON.parse(localStorage.getItem('ListName'));
    this.getFriendList();
    this.back.getAllPlayers()
      .subscribe((data:any)=>{
        this.allPlayers = data.users
        this.deleteUserLoggedIn()
      })
  }
  ngOnInit() {
  }
  */
}
