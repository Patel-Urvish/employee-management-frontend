import { Component, inject } from '@angular/core';
import { EmployeeModel } from '../models/EmployeeModel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee-service';
import { DesignationService } from '../services/designation-service';
import { DesignationModel } from '../models/DesignationModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  employeeService = inject(EmployeeService);
  designationService = inject(DesignationService);
  route = inject(ActivatedRoute);

  designations: DesignationModel[] = [];
  employeeForm!: FormGroup;
  employeeObj: EmployeeModel = new EmployeeModel();

  isEditForm = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      employeeId: [''],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
      city: [''],
      state: [''],
      pinCode: [''],
      address: [''],
      designationId: [''],
    });

    this.loadDesignation();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEmpoyeeById(Number(id));
    }
  }


  resetForm() {
  this.employeeForm.reset({
    employeeId: '',
    name: '',
    contact: '',
    email: '',
    role: '',
    city: '',
    state: '',
    pinCode: '',
    address: '',
    designationId: ''
  });
}
  loadDesignation() {
    this.designationService.getAllDesignation().subscribe({
      next: (res) => (this.designations = res),
      error: () => alert('Failed to load designations'),
    });
  }

  getEmpoyeeById(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res) => {
        this.isEditForm = true;
        this.employeeForm.patchValue({
          employeeId: res.employeeId,
          name: res.name,
          contact: res.contact,
          email: res.email,
          role: res.role,
          city: res.city,
          state: res.state,
          pinCode: res.pinCode,
          address: res.address,
          designationId: res.designationId,
        });
      },
      error: (err) => {
        alert(err.error?.message || 'failed to get employee data !');
      },
    });
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      const payload = this.employeeForm.value;
      delete payload.employeeId;
      this.employeeService.saveEmployee(payload).subscribe({
        next: (res) => {
          alert(res.message || 'Employee saved successfully.!');
          this.employeeForm.reset();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to save employee!');
        },
      });
    } else {
      alert('something went wrong!!');
    }
  }

  updateEmployee() {
    if (this.employeeForm.valid) {

      const payload = this.employeeForm.value;
      console.log(payload);

      this.employeeService.updateEmployee(payload).subscribe({
        next: (res) => {
          alert(res.message || 'Employee updated successfully.!');
          this.employeeForm.reset();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to update employee!');
        },
      });
    } else {
      alert('something went wrong!!');
    }
  }
}
