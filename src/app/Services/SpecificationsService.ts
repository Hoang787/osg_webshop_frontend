import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SpecificationsService {

     setSpecsByCateg(product: any, specifications: any, category: any) {

         if(category.toLowerCase() == "Taps".toLowerCase()) {

            for(let spec of specifications) {

              spec.name == "Type" ? spec.specValue = product.type : null;
              spec.name == "Type Tap" ? spec.specValue = product.type_tap : null;
              spec.name == "Hole Type Application" ? spec.specValue = product.hole_type_application : null;
              spec.name == "Thread Type" ? spec.specValue = product.thread_type : null;
              spec.name == "Thread Pitch (TP)" ? spec.specValue = product.thread_pitch : null;
              spec.name == "DIN" ? spec.specValue = product.din : null;
              spec.name == "Internal Coolant Supply" ? spec.specValue = product.internal_coolant_ic: null;
              spec.name == "Thread Tolerance" ? spec.specValue = product.thread_tolerance: null;
              spec.name == "Thread Diameter (TD)" ? spec.specValue = product.td: null;
              spec.name == "Thread Diameter (MM)" ? spec.specValue = product.nominal_thread_diameter: null;
              spec.name == "Thread Diameter (INCHES)" ? spec.specValue = product.nominal_thread_inches: null;
              spec.name == "Tool Material" ? spec.specValue = product.tool_material : null;
              spec.name == "Shank Diameter (DCON)" ? spec.specValue = product.shank_diameter : null;
              spec.name == "Functional Length (LF)" ? spec.specValue = product.functional_length : null;
              spec.name == "Coating" ? spec.specValue = product.coating: null
              spec.name == "Thread Chamfer Length (THCHL)" ? spec.specValue = product.thread_chamfer_length : null;
              spec.name == "Cutting Direction" ? spec.specValue = product.cutting_direction : null;
              spec.name == "A-Brand" ? spec.specValue = product.a_brand : null;
              spec.name == "Square Dimension (DRVS)" ? spec.specValue = product.square_dimension: null;
              spec.name == "Number Of Flute (NOF)" ? spec.specValue = product.number_of_grooves : null;
              spec.name == "Thread Chamfer Type (THCHT)" ? spec.specValue = product.thread_chamfer_type : null;
              spec.name == "PHD_MAX" ? spec.specValue = product.phd_max: null;
              spec.name == "PHD_MIN" ? spec.specValue = product.phd_min : null;
              spec.name == "PHD" ? spec.specValue = product.phd: null;
              spec.name == "Max Usable Length" ? spec.specValue = product.maximum_usefull_length : null;

            }
         };


       if(category.toLowerCase() == "Drills".toLowerCase()) {

         for(let spec of specifications) {

           spec.name == "Internal Coolant Supply" ? spec.specValue = product.internal_coolant_ic: null;
           spec.name == "Tool Material" ? spec.specValue = product.tool_material : null;
           spec.name == "Shank Diameter (DCON)" ? spec.specValue = product.shank_diameter : null;
           spec.name == "Total Length (OAL)" ? spec.specValue = product.total_length : null;
           spec.name == "Coating" ? spec.specValue = product.coating: null
           spec.name == "Cutting Diameter (DC)" ? spec.specValue = product.cutting_diameter : null;
           spec.name == "Tolerance Cutting Diameter" ? spec.specValue = product.tolerance_cutting_diameter : null;
           spec.name == "A-Brand" ? spec.specValue = product.a_brand : null;
           spec.name == "Groove Length (LCF)" ? spec.specValue = product.groove_length: null;
           spec.name == "Geometry" ? spec.specValue = product.geometry : null;
           spec.name == "Usable Length (LU)" ? spec.specValue = product.usable_length : null;
           spec.name == "Point Angle (SIG)" ? spec.specValue = product.point_angle: null;
           spec.name == "Shank Type" ? spec.specValue = product.shank_type : null;

         }
       };


       if(category.toLowerCase() == "EndMills".toLowerCase()) {

         for(let spec of specifications) {


           spec.name == "Internal Coolant Supply" ? spec.specValue = product.internal_coolant_ic: null;
           spec.name == "Corner Radius (RE)" ? spec.specValue = product.corner_radius: null;
           spec.name == "Cutting Diameter (DC)" ? spec.specValue = product.cutting_diameter : null;
           spec.name == "Groove Length (LCF)" ? spec.specValue = product.groove_length: null;
           spec.name == "Tool Material" ? spec.specValue = product.tool_material : null;
           spec.name == "Shank Diameter (DCON)" ? spec.specValue = product.shank_diameter : null;
           spec.name == "Functional Length (LF)" ? spec.specValue = product.functional_length : null;
           spec.name == "Peripheral Cutting Edge (ZEFP)" ? spec.specValue = product.peripheral_cutting_edge : null;
           spec.name == "Usable Length (LU)" ? spec.specValue = product.usable_length : null;
           spec.name == "Geometry" ? spec.specValue = product.geometry : null;
           spec.name == "Shank Type" ? spec.specValue = product.shank_type : null;
           spec.name == "A-Brand" ? spec.specValue = product.a_brand : null;
           spec.name == "Depth cut Maximum (APMX)" ? spec.specValue = product.depth_cut_maximum: null;
           spec.name == "Usable Length Diameter Rate (ULDR)" ? spec.specValue = product.usable_length_diameter_rate : null;

         }
       };



       if(category.toLowerCase() == "Reamers".toLowerCase()) {


         for(let spec of specifications) {

           spec.name == "Cutting Diameter (DC)" ? spec.specValue = product.cutting_diameter : null;
           spec.name == "Usable Length (LU)" ? spec.specValue = product.usable_length : null;
           spec.name == "Total Length (OAL)" ? spec.specValue = product.total_length : null;
           spec.name == "Tool Material" ? spec.specValue = product.tool_material : null;
           spec.name == "Connection Diameter (DCON)" ? spec.specValue = product.shank_diameter : null;
           spec.name == "Coating" ? spec.specValue = product.coating: null
           spec.name == "Thread Chamfer Length (THCHL)" ? spec.specValue = product.thread_chamfer_length : null;
           spec.name == "Depth cut Maximum (APMX)" ? spec.specValue = product.depth_cut_maximum: null;
           spec.name == "Peripheral Cutting Edge (ZEFP)" ? spec.specValue = product.peripheral_cutting_edge : null;

         }
       };



       if(category.toLowerCase() == "Indexables".toLowerCase()) {

         for(let spec of specifications) {

           spec.name == "Cutting Diameter (DC)" ? spec.specValue = product.cutting_diameter : null;
           spec.name == "Shank Diameter (DCON)" ? spec.specValue = product.shank_diameter : null;
           spec.name == "Usable Length (LU)" ? spec.specValue = product.usable_length : null;
           spec.name == "Functional Length (LF)" ? spec.specValue = product.functional_length : null;
           spec.name == "Peripheral Cutting Edge (ZEFP)" ? spec.specValue = product.peripheral_cutting_edge : null;
           spec.name == "Total Length (OAL)" ? spec.specValue = product.total_length : null;
           spec.name == "Depth cut Maximum (APMX)" ? spec.specValue = product.depth_cut_maximum: null;
           spec.name == "Internal Coolant Supply" ? spec.specValue = product.internal_coolant_ic: null;
           spec.name == "Head Length (HL)" ? spec.specValue = product.head_length : null;
           spec.name == "Groove Length" ? spec.specValue = product.groove_length: null;
           spec.name == "Tool Type" ? spec.specValue = product.tool_type : null;
           spec.name == "Full Cutting Length (LCF)" ? spec.specValue = product.full_cutting_length : null;

         }
       };


       if(category.toLowerCase() == "Gauges".toLowerCase()) {

         for(let spec of specifications) {

           spec.name == "Gauge Size" ? spec.specValue = product.gauge_size : null;
           spec.name == "Gauge Pitch" ? spec.specValue = product.gauge_pitch : null;
           spec.name == "Gauge Sleeve" ? spec.specValue = product.gauge_sleeve : null;
           spec.name == "Gauge Measurable Depth" ? spec.specValue = product.gauge_measurable_depth: null;
           spec.name == "Total Length (OAL)" ? spec.specValue = product.total_length : null;
           spec.name == "Shank Diameter (DCON)" ? spec.specValue = product.shank_diameter : null;
           spec.name == "Applicable Body" ? spec.specValue = product.applicable_body : null;
           spec.name == "Geometry" ? spec.specValue = product.geometry : null;
           spec.name == "Thread Length (THLGTH)" ? spec.specValue = product.thread_length: null;

         }
       };


     }
}


















































