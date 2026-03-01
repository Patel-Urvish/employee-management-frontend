import { DesignationModel } from "./DesignationModel";

export class EmployeeModel {
  employeeId!: number;
  name!: string;
  contact!: string;
  email!: string;
  city!: string;
  state!: string;
  pinCode!: string;
  address?: string;
  role?: string;
  designationId!: number;
  createdDate?: Date;
  updatedDate?: Date;
  designation?: DesignationModel;
}

export class EmployeeDtoModel {
  employeeId!: number;
  name!: string;
  contact!: string;
  email!: string;
  city!: string;
  state!: string;
  pinCode!: string;
  address?: string;
  role?: string;
  designationId!: number;
  createdDate?: Date;
  updatedDate?: Date;
  designationName?: string;
  departmentId?:number;
  departmentName? : string;

  
}