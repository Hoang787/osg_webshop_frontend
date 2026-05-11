import {Specification} from './Specification';


export class Product {

  edp: number;
  name: string;
  image: string;
  specifications: Specification;



  constructor(edp: number, name:  string, img: string, specifications: Specification) {
      this.edp = edp;
      this.name = name;
      this.image = img;
      this.specifications = specifications;
  }








}
