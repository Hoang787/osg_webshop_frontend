


export class Category {

  id: number;
  category: string;
  description: string;
  image: string;
  imageCategory: string;

  constructor(id: number, category: string, description: string, image: string, imageCategory: string) {
    this.id = id;
    this.category = category;
    this.description = description;
    this.image = image;
    this.imageCategory = imageCategory;
  }
}
