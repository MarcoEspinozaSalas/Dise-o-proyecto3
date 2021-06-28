import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { BackService } from '../services/back.service';
import { BehaviorSubject } from 'rxjs';
import { ModalController, AlertController } from '@ionic/angular';
import { ListMarketModalPage } from "../list-market-modal/list-market-modal.page";
import { PassDataService } from '../services/pass-data.service';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListaCompraPage implements OnInit {

  @ViewChild('listMarket', {static: false, read: ElementRef})fab: ElementRef;

  listMarket = [];

  listProducts = [];

  listItemCount: BehaviorSubject<number>;

  constructor(public back: BackService, public modalCtrl: ModalController,public passData: PassDataService,
  private alertCtrl: AlertController) { }

  ngOnInit() {
    this.back.getAllProduct()
    .subscribe((data:any)=>{
        this.listProducts = data.data;
    });
    this.listMarket = this.passData.getList();
    this.listItemCount = this.passData.getItemCount();
  }

//Component
 addToListMarket(product){
   this.passData.addProduct(product);
 }

  async openListMarket(){
   let modal =  await this.modalCtrl.create({
     component: ListMarketModalPage,
     cssClass: 'listMarket-modal'
   });
   modal.present();
 }


}
