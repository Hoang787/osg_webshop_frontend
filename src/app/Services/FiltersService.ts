import {Injectable} from '@angular/core';
import {DecimalPipe} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  filtersSelected: any;
  isFiltersSaved: boolean = false;

  constructor(private decimalPipe: DecimalPipe) {
  }


  getFiltersByCateg(listFilters: any): any {

    let optionSpecial: any = {
      name: "",
      icon: ""
    }


     for(let filter of listFilters) {

       filter.filterCategs = [];

       if (filter.name.toLowerCase() == "Material".toLowerCase()) {

         for (let option of filter.options) {

           optionSpecial = {};

           if (option.toLowerCase() == "material_1".toLowerCase()) {

             optionSpecial.icon = "assets/img/material_1.jpg";
             optionSpecial.name = "Carbon Steel";

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "material_2".toLowerCase()) {

             optionSpecial.icon = "assets/img/material_2.jpg";
             optionSpecial.name = "Stainless Steel"

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "material_3".toLowerCase()) {
             optionSpecial.icon = "assets/img/material_3.jpg";
             optionSpecial.name = "Cast Iron";

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "material_4".toLowerCase()) {

             optionSpecial.icon = "assets/img/material_4.jpg";
             optionSpecial.name = "Aluminium";

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "material_5".toLowerCase()) {

             optionSpecial.icon = "assets/img/material_5.jpg";
             optionSpecial.name = "Titanium/Nickel Alloys";

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "material_6".toLowerCase()) {

             optionSpecial.icon = "assets/img/material_6.jpg";
             optionSpecial.name = "Hardened Steel";

             filter.filterCategs.push(optionSpecial);
           }
         }
       }

       if (filter.name.toLowerCase() == "Type Tap".toLowerCase()) {

         for (let option of filter.options) {

           optionSpecial = {};

           if (option.toLowerCase() == "Cutting Taps".toLowerCase()) {


               optionSpecial.icon = "assets/img/cutting_tap.jpg";
               optionSpecial.name = "Cutting Taps";

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "Forming Taps".toLowerCase()) {

               optionSpecial.icon = "assets/img/forming_tap.jpg";
               optionSpecial.name = "Forming Taps"

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "Thread Milling".toLowerCase()) {
               optionSpecial.icon = "assets/img/threading_tap.jpg";
               optionSpecial.name = "Thread Milling";

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "Circular Dies".toLowerCase()) {

               optionSpecial.icon = "assets/img/circular_dies.jpg";
               optionSpecial.name = "Circular Dies";

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "Solid Carbide".toLowerCase()) {

               optionSpecial.icon = "assets/img/circular_dies.jpg";
               optionSpecial.name = "Solid Carbide";

             filter.filterCategs.push(optionSpecial);
           }
         }
       }


       if (filter.name.toLowerCase() == "Hole Type Application".toLowerCase()) {

         for (let option of filter.options) {

           optionSpecial = {};

           if (option.toLowerCase() == "blind") {
             optionSpecial.icon = "assets/img/blind_hole.jpg";
               optionSpecial.name = "Blind Hole"

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "through") {
             optionSpecial.icon = "assets/img/through_hole.jpg";
               optionSpecial.name = "Through Hole"

             filter.filterCategs.push(optionSpecial);
           }

           if (option.toLowerCase() == "both") {
             optionSpecial.icon = "assets/img/through_blind.jpg";
               optionSpecial.name = "Through And Blind"

             filter.filterCategs.push(optionSpecial);
           }

         }
       }

       if (filter.name.toLowerCase() == "Internal Coolant Supply".toLowerCase()) {

          console.log(filter.options);

         filter.options.forEach((option: any, index: any) => {
             if(option == "1") {
               filter.options[index] = "Yes";
             }
             if(option == "0") {
               filter.options[index] = "No";
             }
         });
       }



       if (filter.name.toLowerCase() == "Thread Pitch (TP)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }


       if (filter.name.toLowerCase() == "Shank Diameter (DCON)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }

       if (filter.name.toLowerCase() == "Functional Length (LF)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }

       if (filter.name.toLowerCase() == "Thread Chamfer Length (TCL)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }

       if (filter.name.toLowerCase() == "Total Cut Length (TCL)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }


       if (filter.name.toLowerCase() == "Total Length (OAL)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }


       if (filter.name.toLowerCase() == "Cutting Diameter (DC)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }


       if (filter.name.toLowerCase() == "Groove Length (LCF)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }


       if (filter.name.toLowerCase() == "Point Angle (SIG)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });
       }


         if (filter.name.toLowerCase() == "Corner Radius (RE)".toLowerCase()) {

           filter.options.forEach((option: any, index: any) => {
             filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
           });
         }


         if (filter.name.toLowerCase() == "Depth Of Cut Maximum (APMX)".toLowerCase()) {

           filter.options.forEach((option: any, index: any) => {
             filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
           });

         }

         if (filter.name.toLowerCase() == "Number Of Cutting Edge (ZEFP)".toLowerCase()) {

           filter.options.forEach((option: any, index: any) => {
             filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
           });

         }

       if (filter.name.toLowerCase() == "Gauge Pitch".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });

       }

       if (filter.name.toLowerCase() == "Thread Length (THLGTH)".toLowerCase()) {

         filter.options.forEach((option: any, index: any) => {
           filter.options[index] = this.decimalPipe.transform(filter.options[index], '1.0-4');
         });

       }

     }
        return listFilters;
     }


     saveFilterSelected(listFiltersSelected: any) {
         this.isFiltersSaved = true;
         this.filtersSelected = listFiltersSelected;
     }

     getFilterSelected() {
         return this.filtersSelected;
     }

     isSaved() : boolean {
        return this.isFiltersSaved;
     }

     setFiltersSaved(saved: any) {
        this.isFiltersSaved = saved;
     }

}
