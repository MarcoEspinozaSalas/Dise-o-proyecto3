import { Component, OnInit } from '@angular/core';
import { BackService } from '../services/back.service';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ListMarketModalPage } from "../list-market-modal/list-market-modal.page";

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListaCompraPage implements OnInit {

  listMarket = [];

  listProducts = [];

  listItemCount = new BehaviorSubject(0);

  constructor(public back: BackService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.back.getAllProduct()
    .subscribe((data:any)=>{
        this.listProducts = data.data;
    });
  }

//Services
  addProduct(product){

  }

  decreaseProcut(product){

  }

  removeProduct(product){

  }

//Component
 addToListMarket(product){
   let added = false;
   for (let p of this.listMarket) {
     if (p.name === product.name) {
       p.cantidad += 1;
       added = true;
       break;
     }
   }
   if (!added) {
     this.listMarket.push(product);
   }
   this.listItemCount.next(this.listItemCount.value + 1);
 }

  async openListMarket(){
   let modal =  await this.modalCtrl.create({
     component: ListMarketModalPage,
     cssClass: 'listMarket-modal'
   });
   modal.present();
 }

}
