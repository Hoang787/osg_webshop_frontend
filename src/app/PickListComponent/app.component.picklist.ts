import {Component, ElementRef, Input, OnInit, Signal, signal, viewChild, ViewChild} from '@angular/core';
import {PickList} from 'primeng/picklist';
import {NgClass} from '@angular/common';
import {ProductVisitedService} from '../Services/ProductVisitedService';
import {Message} from 'primeng/message';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';



@Component({
  imports: [
    PickList,
    NgClass,
    Message,
    Button
  ],
  selector: 'app-picklist',
  standalone: true,
  styleUrl: './app.component.picklist.css',
  templateUrl: './app.component.picklist.html'
})
export class PickListComponent implements OnInit {

  productsVisited: any[] = [];
  productsSelected: any[] = [];
  @ViewChild("listPickerProducts") listPicker!: PickList;
  @ViewChild("informationSelected") messageInformation!: Message;
  sourceProducts: any[] = [];
  targetProducts: any[] = [];


  constructor(private productVisitedService: ProductVisitedService, public dialogService: DialogService, public ref: DynamicDialogRef, private dialogConfig: DynamicDialogConfig, private messageService: MessageService) {
  }


  ngOnInit() {


    this.productsSelected = [];
    this.productsVisited = this.dialogConfig.data;

    this.sourceProducts = this.productsVisited;
  }


  onClose() {

    if (this.targetProducts.length == 3) {


        this.ref.close(this.targetProducts);
    } else {
      if (this.sourceProducts.length > 0 && this.targetProducts.length > 0 && this.targetProducts.length !== 3) {


      } else {
        this.sourceProducts = this.targetProducts;
        this.targetProducts = [];
      }

      this.messageService.add({severity: 'error', summary: 'Please Select At Least 3 Products'});
    }
  }



}
