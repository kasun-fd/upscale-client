import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-product-element',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './product-element.component.html',
  styleUrl: './product-element.component.scss'
})
export class ProductElementComponent {

  @Input() data:any;

}
