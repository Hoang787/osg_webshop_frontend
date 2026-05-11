import {Filter_Selected} from './Filter_Selected';


export class Filter_Selected_Categ {

  category: string;

  filters_Selected: Filter_Selected[];

  currentPage: number;

  size: number

  constructor(category: string, currentPage: number, rows: number) {

    this.category = category;
    this.filters_Selected = [];
    this.currentPage = currentPage;
    this.size = rows;
  }

}
