import { Component, OnInit } from '@angular/core';
import { BackService } from '../services/back.service';


@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListaCompraPage implements OnInit {

  listProducts = [];

  constructor(public back: BackService) { }

  ngOnInit() {
    this.back.getAllProduct()
    .subscribe((data:any)=>{
        this.listProducts = data.data;
    });

  }

}
