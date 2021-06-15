import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { identity } from 'rxjs';
import { addMember } from '../models/addMember';
import { family } from '../models/family';
import { familyList } from '../models/familyList';
import { removeMember } from '../models/removeMember';
import { BackService } from '../services/back.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-family-main',
  templateUrl: './family-main.page.html',
  styleUrls: ['./family-main.page.scss'],
})
export class FamilyMainPage implements OnInit {
  listName:string;

  text = "";
  text2 = "";

  datosUsuarioLoggedIn : any;

  idFamilyList:string;
  usersFiltered = [];
  friendList:any;
  toRemove = new removeMember();
  toAdd = new addMember();
  toCreate = new familyList();

  userCreator = false;
  userMember = false;
  family: any;

  constructor(private back: BackService, private router: Router, private toast:ToastService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));  

    
  }
  ngOnInit() {
    this.verify();
  }


  toggleD() {
    this.showMembers = !this.showMembers;
  }
  private showMembers: boolean = false;



  verify(){
    this.back.getFamilyByUser(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      if (data.data.length !== 0) {
        this.userMember = true;
        this.family = data.data[0];

        this.getFamilyId(this.family.idFamilyOwner.uid);
      }
    });
    this.back.getFamilytByOwner(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      if (data.data.length !== 0) {
        this.userCreator = true;
        this.family = data.data;
        console.log(family);
        
        this.getFamilyId(this.datosUsuarioLoggedIn.user.uid);
      }
    });



  }

  createFamily(){

    if(this.text2==""){
      this.toast.presentToast(`Ingrese un nombre de familia`);
    }else
    {
    this.toCreate.idFamilyOwner = this.datosUsuarioLoggedIn.user.uid;
    this.toCreate.listName = this.text2;
    this.back.createF(this.toCreate)
    .subscribe((data:any)=>{

      this.toast.chatToast(`Familia creada`);
    });
    this.router.navigate(['/main'])

    }
  }

  deletMember(id:string, name :string){
    this.toRemove.idFamilyList = this.idFamilyList;
    this.toRemove.uid = id;
    this.back.removeMember(this.toRemove)
    .subscribe((data:any)=>{

      this.toast.presentToast(`Usuario eliminado`);
    });
    this.verify();
  }

  addMember(id:string){
    this.toAdd.idFamily = this.idFamilyList;
    this.toAdd.member = id;
    this.back.addMember(this.toAdd)
    .subscribe((data:any)=>{

      this.toast.presentToast(`Usuario añadido`);
    });
    this.verify();
  }


  getFamilyId(idFamilyOwner:string){
    
    this.back.getFamilyId(idFamilyOwner)
    .subscribe((data:any)=>{
      this.idFamilyList = data.data;
    });
  }

  filterPlayeyrs()
  {    
    this.usersFiltered = [];
    this.back.getAllPlayers()
    .subscribe((data:any)=>{
      data.users.forEach(async user => {  
        if (user.displayName == this.text) {
          this.usersFiltered.push(user)
        }
        this.usersFiltered = this.usersFiltered;
        
    })
    });
    
  }
  
}

