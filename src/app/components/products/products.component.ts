import {Component, inject, OnInit} from '@angular/core';
import {ProductElementComponent} from "./inner/product-element/product-element.component";
import {MatDialog} from "@angular/material/dialog";
import {ProductServiceService} from "../../services/product-service/product-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FastForexService} from "../../services/fast-forex/fast-forex.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductElementComponent,
    ReactiveFormsModule,
    MatPaginator,
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  readonly matDialog = inject(MatDialog);
  readonly productService = inject(ProductServiceService);
  readonly snackBar = inject(MatSnackBar);
  readonly fastForex = inject(FastForexService);

  searchtext = '';

  page:any = 0

  size:any = 3

  count = 0;

  allProducts:any[] = [];

  usdAmount:any;

  lkrAmount:any;

  rawAmount:any[] = [];

  rate:any = 0;


  searchForm = new FormGroup<any>({
    text:new FormControl('')
  })

  loading = false;

  constructor() {
    this.loading = true;
  }

  ngOnInit(): void {

    this.fastForex.exchange('USD', 'LKR').subscribe(data => {
      this.rate = data?.result?.LKR;
      this.loadAllProduct();
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(data=>{
        this.searchtext = data.text
        this.loadAllProduct();
      })
  }

  private loadAllProduct() {
    this.productService.getAll(this.searchtext,this.page,this.size)
      .subscribe(response=>{
        this.count = response.data?.count;
        this.allProducts = response.data?.dataList;
        this.loading = false;
      })

  }

  getServerData(data:PageEvent) {
    this.page = data.pageIndex;
    this.size = data.pageSize;
    this.loadAllProduct();
  }
}
