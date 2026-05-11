import {Specification} from './Specification';


export class ProductToCompare {

    sku: string;
    name: string;
    specsToCompare: Specification[];


  constructor(sku: string, name: string, specsToCompare: Specification[]) {
    this.sku = sku;
    this.name = name;
    this.specsToCompare = specsToCompare;
  }
}
