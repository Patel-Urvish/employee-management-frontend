import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentModel } from '../models/DepartmentModel';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../services/department-service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department {
  showModal = false;
  isEdit = false;
  departmentService = inject(DepartmentService);

  departmentObj = new DepartmentModel();
  departments: DepartmentModel[] = [];

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe({
      next: (res: DepartmentModel[]) => {
        this.departments = res;
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to load departments!');
      },
    });
  }

  openModal() {
    this.isEdit = false;
    this.departmentObj = new DepartmentModel();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveDepartment() {
    const newDept = new DepartmentModel();
    newDept.departmentName = this.departmentObj.departmentName;
    newDept.isActive = this.departmentObj.isActive;

    this.departmentService.addDepartment(newDept).subscribe({
      next: (res: any) => {
        alert(res.message || 'Department saved successfully!');
        this.getAllDepartments();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to save department!');
      },
    });
    this.closeModal();
  }

  updateDepartment() {
    const newDept = new DepartmentModel();
    newDept.departmentId = this.departmentObj.departmentId;
    newDept.departmentName = this.departmentObj.departmentName;
    newDept.isActive = this.departmentObj.isActive;
  
    this.departmentService.updateDepartment(newDept).subscribe({
      next: (res: any) => {
        alert(res.message || 'Department updated successfully!');
        this.getAllDepartments();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to update department!');
      },
    });
    this.closeModal();
  }

  onEdit(id:number){
    this.isEdit = true;
    this.departmentService.getDepartmentById(id).subscribe({
      next :(res) =>{
        this.departmentObj = res.data;
        this.showModal = true; 
      },
      error :( err) =>{
        alert(err.error || 'Department not found!');
      }
    })
  }

  onDelete(id:number){
    this.departmentService.deleteDepartment(id).subscribe({
      next :(res:any) =>{
        alert(res.message || 'Department Deleted Successfully!')
        this.getAllDepartments();
      },
      error :( err) =>{
        alert(err.error || 'Department not found!');
      }
    })
  }
}
