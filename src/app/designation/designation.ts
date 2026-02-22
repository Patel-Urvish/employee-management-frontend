import { Component, inject } from '@angular/core';
import { DesignationDto, DesignationModel } from '../models/DesignationModel';
import { DesignationService } from '../services/designation-service';
import { FormsModule } from '@angular/forms';
import { DepartmentModel } from '../models/DepartmentModel';
import { DepartmentService } from '../services/department-service';

@Component({
  selector: 'app-designation',
  imports: [FormsModule],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation {
  isEdit = false;
  showModal = false;
  designationObj = new DesignationModel();
  designations: DesignationModel[] = [];
  designationDto: DesignationDto[] = [];

  departmentService = inject(DepartmentService);
  departments: DepartmentModel[] = [];

  designationService = inject(DesignationService);

  ngOnInit() {
    this.getAllDesignation();
    this.loadDepartments();
  }

  loadDepartments() {
  this.departmentService.getAllDepartments().subscribe({
    next: res => this.departments = res,
    error: () => alert('Failed to load departments')
  });
}

  openModal() {
    this.isEdit = false;
    this.designationObj = new DesignationModel();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getAllDesignation() {
    this.designationService.getAllDesignation().subscribe({
      next: (res: DesignationDto[]) => {
        this.designationDto = res;
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to load designations!');
      },
    });
  }

  saveDesignation() {
    const designation = new DesignationModel();
    designation.departmentId = this.designationObj.departmentId;
    designation.designationName = this.designationObj.designationName;

    this.designationService.addDesignation(designation).subscribe({
      next: (res) => {
        alert(res.message || 'Designation saved successfully!');
        this.getAllDesignation();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to save designation!');
      },
    });
    this.closeModal();
  }

  onFilter(id:number,search:string){
    this.designationService.getFilteredData(id,search).subscribe({
      next: (res : DesignationDto[]) =>{
        this.designationDto = res;
      },
      error :(err) =>{
        alert(err.error?.message || 'Failed to get filtered data!');
      }
    })

  }

  onEdit(id:number){
     this.isEdit = true;
    debugger;
    this.designationService.getDesignationById(id).subscribe({
      next :(res) =>{
        this.designationObj = res.data;
        this.showModal = true; 
      },
      error :(err) =>{
        alert(err.error?.message || 'Failed to get designation data!');
      }
    })
  }

  updateDesignation() {
    debugger;
    const designation = new DesignationModel();
    designation.designationId = this.designationObj.designationId;
    designation.departmentId = this.designationObj.departmentId;
    designation.designationName = this.designationObj.designationName;

    this.designationService.updateDesignation(designation).subscribe({
      next: (res) => {
        alert(res.message || 'Designation updated successfully!');
        this.getAllDesignation();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to update designation!');
      },
    });
    this.closeModal();
  }

  deleteDesignation(id: number) {
    debugger;
    this.designationService.deleteDesignation(id).subscribe({
      next: (res: any) => {
        alert(res.message || 'Designation deleted successfully!');  
        this.getAllDesignation();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to delete designation!');
      },
    });
  }
}
