import {Injectable} from '@angular/core';
import {ProductToCompare} from '../Class/ProductToCompare';
import {Specification} from '../Class/Specification';
import {catchError} from 'rxjs';
import {DecimalPipe} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CompareService {

  listProductToCompare: any[] = [];
  criteriasToCompare: any[] = [];
  criteriasTapsCompare: any[] = [];
  criteriasDrillsCompare: any[] = [];
  criteriasMillsCompare: any[] = [];
  criteriasReamersCompare: any[] = [];
  criteriasIndexCompare: any[] = [];
  criteriasGaugesCompare: any[] = [];

  constructor(private decimalPipe: DecimalPipe) {
  }

  setCriteriasToCompare(products: any, category: any) {

    this.listProductToCompare = [];

    if (category.toLowerCase() == "Taps".toLowerCase()) {

      this.criteriasTapsCompare = ["Thread Type", "Thread Pitch (TP)", "DIN", "Internal Coolant Supply", "Thread Tolerance", "Thread Diameter (TD)", "Tool Material", "Shank Diameter (DCON)", "Functional Length (LF)", "Coating", "Thread Chamfer Length (THCHL)", "Cutting Direction"];


      for (let prod of products) {

        let productToCompare = new ProductToCompare(prod.sku, prod.name, []);

        for (let spec of this.criteriasTapsCompare) {

          if (spec == "Thread Type") {
            productToCompare.specsToCompare.push(new Specification("Thread Type", prod.thread_type));
          }
          if (spec == "Thread Pitch (TP)") {
            prod.thread_pitch = this.decimalPipe.transform(prod.thread_pitch, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Thread Pitch (TP)", prod.thread_pitch ));
          }
          if (spec == "DIN") {
            productToCompare.specsToCompare.push(new Specification("DIN", prod.din));
          }
          if (spec == "Internal Coolant Supply") {

              if(prod.internal_coolant_ic == "1") {
                prod.internal_coolant_ic = "Yes";
              } else {
                prod.internal_coolant_ic = "No";
              }

            productToCompare.specsToCompare.push(new Specification("Internal Coolant Supply", prod.internal_coolant_ic));
          }
          if (spec == "Thread Tolerance") {
            productToCompare.specsToCompare.push(new Specification("Thread Tolerance", prod.thread_tolerance))
          }
          if (spec == "Thread Diameter (TD)") {
            productToCompare.specsToCompare.push(new Specification("Thread Diameter (TD)", prod.td));
          }
          if (spec == "Tool Material") {
            productToCompare.specsToCompare.push(new Specification("Tool Material", prod.tool_material));
          }
          if (spec == "Shank Diameter (DCON)") {
            prod.shank_diameter = this.decimalPipe.transform(prod.shank_diameter, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Shank Diameter (DCON)", prod.shank_diameter));
          }
          if (spec == "Functional Length (LF)") {
            prod.functional_length = this.decimalPipe.transform(prod.functional_length, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Functional Length (LF)", prod.functional_length))
          }
          if (spec == "Coating") {
            productToCompare.specsToCompare.push(new Specification("Coating", prod.coating));
          }
          if (spec == "Thread Chamfer Length (THCHL)") {
            productToCompare.specsToCompare.push(new Specification("Thread Chamfer Length (THCHL)", prod.thread_chamfer_length));
          }
          if (spec == "Cutting Direction") {
            productToCompare.specsToCompare.push(new Specification("Cutting Direction", prod.cutting_direction));
          }

        }
            this.listProductToCompare.push(productToCompare);
      }
    }

        if (category.toLowerCase() == "Drills".toLowerCase()) {

          this.criteriasDrillsCompare = ["Internal Coolant Supply", "Total Length (OAL)", "Cutting Diameter (DC)", "Flute Length (LCF)", "Tool Material", "Shank Diameter (DCON)", "Usable Length (LU)", "Coating", "Point angle (SIG)", "Tolerance Cutting Diameter (TCDC)", "Shank Type"];

          for (let prod of products) {

            let productToCompare = new ProductToCompare(prod.sku, prod.name, []);

            for (let spec of this.criteriasDrillsCompare) {

              if (spec == "Internal Coolant Supply") {

                if(prod.internal_coolant_ic == "1") {
                  prod.internal_coolant_ic = "Yes";
                } else {
                  prod.internal_coolant_ic = "No";
                }

                productToCompare.specsToCompare.push(new Specification("Internal Coolant Supply", prod.internal_coolant_ic));
              }
              if (spec == "Total Length (OAL)") {
                prod.total_length = this.decimalPipe.transform(prod.total_length, '1.0-4');
                productToCompare.specsToCompare.push(new Specification("Total Length (OAL)", prod.total_length));
              }
              if (spec == "Cutting Diameter (DC)") {
                prod.cutting_diameter = this.decimalPipe.transform(prod.cutting_diameter, '1.0-4');
                productToCompare.specsToCompare.push(new Specification("Cutting Diameter (DC)", prod.cutting_diameter));
              }
              if (spec == "Flute Length (LCF)") {
                prod.groove_length = this.decimalPipe.transform(prod.groove_length, '1.0-4');
                productToCompare.specsToCompare.push(new Specification("Flute Length (LCF)", prod.groove_length));
              }
              if (spec == "Tool Material") {
                productToCompare.specsToCompare.push(new Specification("Tool Material", prod.tool_material))
              }
              if (spec == "Shank Diameter (DCON)") {
                prod.shank_diameter = this.decimalPipe.transform(prod.shank_diameter, '1.0-4');
                productToCompare.specsToCompare.push(new Specification("Shank Diameter (DCON)", prod.shank_diameter));
              }
              if (spec == "Usable Length (LU)") {
                productToCompare.specsToCompare.push(new Specification("Usable Length (LU)", prod.usable_length));
              }
              if (spec == "Coating") {
                productToCompare.specsToCompare.push(new Specification("Coating", prod.coating));
              }
              if (spec == "Point angle (SIG)") {
                prod.point_angle = this.decimalPipe.transform(prod.point_angle, '1.0-4');
                productToCompare.specsToCompare.push(new Specification("Point angle (SIG)", prod.point_angle))
              }
              if (spec == "Tolerance Cutting Diameter (TCDC)") {
                productToCompare.specsToCompare.push(new Specification("Tolerance Cutting Diameter (TCDC)", prod.tolerance_cutting_diameter));
              }
              if (spec == "Shank Type") {
                productToCompare.specsToCompare.push(new Specification("Shank Type", prod.shank_type));
              }

            }

            this.listProductToCompare.push(productToCompare);
          }

      }



    if (category.toLowerCase() == "EndMills".toLowerCase()) {

      this.criteriasMillsCompare = ["Cutting Diameter (DC)", "Number Cutting Edge (ZEFP)", "Tool Material", "Internal Coolant Supply" , "Shank Diameter (DCON)", "Usable Length (LU)", "Corner Radius (RE)", "Depth Of Cut Maximum (APMX)", "Functional Length (LF)", "Shank Type", "Geometry"];

      for (let prod of products) {

        let productToCompare = new ProductToCompare(prod.sku, prod.name, []);

        for (let spec of this.criteriasMillsCompare) {

          if (spec == "Cutting Diameter (DC)") {
            prod.cutting_diameter = this.decimalPipe.transform(prod.cutting_diameter, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Cutting Diameter (DC)", prod.cutting_diameter));
          }
          if (spec == "Number Cutting Edge (ZEFP)") {
            prod.peripheral_cutting_edge = this.decimalPipe.transform(prod.peripheral_cutting_edge, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Number Cutting Edge (ZEFP)", prod.peripheral_cutting_edge));
          }
          if (spec == "Tool Material") {
            if(prod.tool_material.toLowerCase() == "CARB".toLowerCase()) {
              productToCompare.specsToCompare.push(new Specification("Tool Material", "CARBIDE"));
            } else {
              productToCompare.specsToCompare.push(new Specification("Tool Material", prod.tool_material));
            }
          }
          if (spec == "Internal Coolant Supply") {

            if(prod.internal_coolant_ic == "1") {
              prod.internal_coolant_ic = "Yes";
            } else {
              prod.internal_coolant_ic = "No";
            }

            productToCompare.specsToCompare.push(new Specification("Internal Coolant Supply", prod.internal_coolant_ic));
          }
          if (spec == "Shank Diameter (DCON)") {
            prod.shank_diameter = this.decimalPipe.transform(prod.shank_diameter, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Shank Diameter (DCON)", prod.shank_diameter))
          }
          if (spec == "Usable Length (LU)") {
            productToCompare.specsToCompare.push(new Specification("Usable Length (LU)", prod.usable_length));
          }
          if (spec == "Corner Radius (RE)") {
            prod.corner_radius = this.decimalPipe.transform(prod.corner_radius, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Corner Radius (RE)", prod.corner_radius));
          }
          if (spec == "Depth Of Cut Maximum (APMX)") {
            prod.depth_cut_maximum = this.decimalPipe.transform(prod.depth_cut_maximum, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Depth Of Cut Maximum (APMX)", prod.depth_cut_maximum));
          }
          if (spec == "Functional Length (LF)") {
            prod.functional_length = this.decimalPipe.transform(prod.functional_length, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Functional Length (LF)", prod.functional_length))
          }
          if (spec == "Shank Type") {
            productToCompare.specsToCompare.push(new Specification("Shank Type", prod.shank_type));
          }
          if (spec == "Geometry") {
            productToCompare.specsToCompare.push(new Specification("Geometry", prod.geometry));
          }

        }

        this.listProductToCompare.push(productToCompare);
      }

    }

    if (category.toLowerCase() == "Reamers".toLowerCase()) {

      this.criteriasReamersCompare = ["Tool Material", "Cutting Diameter (DC)", "Chamfer Length (TCL)", "Number Cutting Edge (ZEFP)", "Shank Diameter (DCON)"];

      for (let prod of products) {

        let productToCompare = new ProductToCompare(prod.sku, prod.name, []);

        for (let spec of this.criteriasReamersCompare) {

          if (spec == "Tool Material") {
            if(prod.tool_material.toLowerCase() == "CARB".toLowerCase()) {
              productToCompare.specsToCompare.push(new Specification("Tool Material", "CARBIDE"));
            } else {
              productToCompare.specsToCompare.push(new Specification("Tool Material", prod.tool_material));
            }
          }
          if (spec == "Cutting Diameter (DC)") {
            prod.cutting_diameter = this.decimalPipe.transform(prod.cutting_diameter, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Cutting Diameter (DC)", prod.cutting_diameter));
          }

          if (spec == "Total Cut Length (TCL)") {
            prod.thread_chamfer_length = this.decimalPipe.transform(prod.thread_chamfer_length, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Total Cut Length (TCL)", prod.thread_chamfer_length));
          }

          if (spec == "Number Cutting Edge (ZEFP)") {
            prod.peripheral_cutting_edge = this.decimalPipe.transform(prod.peripheral_cutting_edge, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Number Cutting Edge (ZEFP)", prod.peripheral_cutting_edge));
          }

          if (spec == "Shank Diameter (DCON)") {
            prod.shank_diameter = this.decimalPipe.transform(prod.shank_diameter, '1.0-4');
            productToCompare.specsToCompare.push(new Specification("Shank Diameter (DCON)", prod.shank_diameter))
          }

        }
        this.listProductToCompare.push(productToCompare);
      }

    }


    if (category.toLowerCase() == "Indexables".toLowerCase()) {

      this.criteriasIndexCompare = ["Application Task", "Internal Coolant Supply", "Cutting Diameter (DC)", "Number Cutting Edge (ZEFP)", "Depth Of Cut Maximum (APMX)", "Shank Diameter (DCON)"];

      for (let prod of products) {

        let productToCompare = new ProductToCompare(prod.sku, prod.name, []);

        for (let spec of this.criteriasIndexCompare) {

          if (spec == "Application Task") {
            productToCompare.specsToCompare.push(new Specification("application Task", prod.prod_images.product_icons_file_path));
          }

          if (spec == "Internal Coolant Supply") {

            if(prod.internal_coolant_ic == "1") {
              prod.internal_coolant_ic = "Yes";
            } else {
              prod.internal_coolant_ic = "No";
            }

            productToCompare.specsToCompare.push(new Specification("Internal Coolant Supply", prod.internal_coolant_ic));
          }

          if (spec == "Cutting Diameter (DC)") {
            prod.cutting_diameter = this.decimalPipe.transform(prod.cutting_diameter, '1.0-2');
            productToCompare.specsToCompare.push(new Specification("Cutting Diameter (DC)", prod.cutting_diameter));
          }
          if (spec == "Number Cutting Edge (ZEFP)") {
            productToCompare.specsToCompare.push(new Specification("Peripheral Cutting Edge (ZEFP)", prod.peripheral_cutting_edge));
          }
          if (spec == "Depth Of Cut Maximum (APMX)") {
            prod.depth_cut_maximum = this.decimalPipe.transform(prod.depth_cut_maximum, '1.0-2');
            productToCompare.specsToCompare.push(new Specification("Depth Of Cut Maximum (APMX)", prod.depth_cut_maximum));
          }
          if (spec == "Shank Diameter (DCON)") {
            prod.shank_diameter = this.decimalPipe.transform(prod.shank_diameter, '1.0-2');
            productToCompare.specsToCompare.push(new Specification("Shank Diameter (DCON)", prod.shank_diameter));
          }
        }
        this.listProductToCompare.push(productToCompare);
      }
    }



    if (category.toLowerCase() == "Gauges".toLowerCase()) {

      this.criteriasGaugesCompare = ["Specification", "Gauge Thread Size", "Gauge Pitch"];

      for (let prod of products) {

        let productToCompare = new ProductToCompare(prod.sku, prod.name, []);

        for (let spec of this.criteriasGaugesCompare) {

          if (spec == "Specification") {

            productToCompare.specsToCompare.push(new Specification("Specification", prod.geometry));
          }
          if (spec == "Gauge Thread Size") {
            productToCompare.specsToCompare.push(new Specification("Gauge Thread Size", prod.gauge_size));
          }
          if (spec == "Gauge Pitch") {

            productToCompare.specsToCompare.push(new Specification("Gauge Pitch", prod.gauge_pitch));
          }

        }
        this.listProductToCompare.push(productToCompare);
      }
    }

  }

  getListProducts() {
    return this.listProductToCompare;
  }

  getCriterias(category: any) {
    if(category.toLowerCase() == "Taps".toLowerCase()) {
       this.criteriasToCompare = this.criteriasTapsCompare;
    }
    if (category.toLowerCase() == "Drills".toLowerCase()) {
      this.criteriasToCompare = this.criteriasDrillsCompare;
    }
    if (category.toLowerCase() == "EndMills".toLowerCase()) {
      this.criteriasToCompare = this.criteriasMillsCompare;
    }
    if (category.toLowerCase() == "Reamers".toLowerCase()) {
      this.criteriasToCompare = this.criteriasReamersCompare;
    }
    if (category.toLowerCase() == "Indexables".toLowerCase()) {
      this.criteriasToCompare = this.criteriasIndexCompare;
    }
    if (category.toLowerCase() == "Gauges".toLowerCase()) {
      this.criteriasToCompare = this.criteriasGaugesCompare;
    }

    return  this.criteriasToCompare;
  }


}
