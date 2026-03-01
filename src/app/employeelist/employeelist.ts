import { Component, inject } from '@angular/core';
import { EmployeeService } from '../services/employee-service';
import { EmployeeDtoModel, EmployeeModel } from '../models/EmployeeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeelist',
  imports: [],
  templateUrl: './employeelist.html',
  styleUrl: './employeelist.css',
})
export class Employeelist {

  employeeService = inject(EmployeeService);
  router  = inject(Router);

  employeeList : EmployeeDtoModel[] = [];

  ngOnInit(){
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.employeeService.getAllEmployee().subscribe({
      next  :(res) =>{
        this.employeeList = res;
      },error :(err) =>{
        alert(err.error?.message);
      }
    })
  }

  editEmployee(employee: EmployeeModel){
    this.router.navigate(['/edit-employee',employee.employeeId])
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe({
      next :(res) =>{
        alert(res?.message || 'Employee deleted !')
        this.getAllEmployee();
      },
      error :(err) =>{
        alert(err.error?.message  || 'Failed to delete employee.');
        this.getAllEmployee();
      }
    })

  }
}
